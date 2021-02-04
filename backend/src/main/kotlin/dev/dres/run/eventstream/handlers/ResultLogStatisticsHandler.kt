package dev.dres.run.eventstream.handlers

import dev.dres.data.dbo.DaoIndexer
import dev.dres.data.model.UID
import dev.dres.data.model.basics.media.MediaItem
import dev.dres.data.model.basics.media.MediaItemSegmentList
import dev.dres.data.model.basics.time.TemporalRange
import dev.dres.data.model.competition.TaskDescription
import dev.dres.data.model.competition.TaskDescriptionTarget
import dev.dres.data.model.run.CompetitionRunId
import dev.dres.data.model.run.TaskRunId
import dev.dres.run.eventstream.*
import dev.dres.utilities.TimeUtil
import java.io.File
import java.io.PrintWriter

class ResultLogStatisticsHandler(private val segmentIndex: DaoIndexer<MediaItemSegmentList, UID>) : StreamEventHandler {

    private val writer = PrintWriter(File("statistics/result_log_statistics_${System.currentTimeMillis()}.csv").also { it.parentFile.mkdirs() })

    private val lastActiveTask = mutableMapOf<CompetitionRunId, TaskDescription>()
    private val lastActiveTaskId = mutableMapOf<CompetitionRunId, TaskRunId>()
    private val lastActiveTargets = mutableMapOf<UID, List<Pair<MediaItem, TemporalRange?>>>()


    init {
        writer.println("timestamp,task,session,item,segment,frame,reportedRank,listRank,inTime")
    }

    override fun handle(event: StreamEvent): List<StreamEvent> {

        when (event) {
            is TaskStartEvent -> {
                lastActiveTask[event.runId] = event.taskDescription
                lastActiveTaskId[event.runId] = event.taskId
                lastActiveTargets[event.runId] = when(event.taskDescription.target) {
                    is TaskDescriptionTarget.JudgementTaskDescriptionTarget -> return emptyList()//no analysis possible
                    is TaskDescriptionTarget.MediaItemTarget -> listOf(event.taskDescription.target.item to null)
                    is TaskDescriptionTarget.VideoSegmentTarget ->  listOf(event.taskDescription.target.item to event.taskDescription.target.temporalRange)
                    is TaskDescriptionTarget.MultipleMediaItemTarget -> event.taskDescription.target.items.map { it to null }
                }
            }
            is QueryResultLogEvent -> {

                val relevantTask = lastActiveTask[event.runId] ?: return emptyList()
                val relevantTargets = lastActiveTargets[event.runId] ?: return emptyList()
                
                val correctItems = event.queryResultLog.results.mapIndexed {
                    index, queryResult ->
                    if ( relevantTargets.any { it.first.name == queryResult.item } )
                        index to queryResult else null }.filterNotNull()

                if (correctItems.isEmpty()) {
                    return emptyList()
                }

                val temporalTargets = relevantTargets.filter { it.second != null }

                val taskId = lastActiveTaskId[event.runId] ?: return emptyList()

                val results = if (temporalTargets.isEmpty()) { //consider only items
                    correctItems.map {
                        writer.println("${System.currentTimeMillis()},${relevantTask.name},${event.session},${it.second.item},${it.second.segment},${it.second.frame},${it.second.rank},${it.first},n/a")
                        ResultLogStatisticEvent(event.runId, taskId, "${event.session}", it.second.item, it.second.segment, it.second.frame, it.second.rank, it.first, null)
                    }
                } else { // consider also temporal range
                    val relevantTemporalTargets = temporalTargets.filter { it.first.name == relevantTask.name }

                    correctItems.map {
                        val correctTime = (it.second.segment != null || it.second.frame != null) && relevantTemporalTargets.any { target ->
                            val segments = this.segmentIndex[target.first.id].firstOrNull() ?: return@any false
                            val segment = TemporalRange(if (it.second.segment != null) {
                                TimeUtil.shotToTime(it.second.segment.toString(), target.first as MediaItem.VideoItem, segments)
                            } else {
                                TimeUtil.timeToSegment(TimeUtil.frameToTime(it.second.frame!!, target.first as MediaItem.VideoItem), target.first as MediaItem.VideoItem, segments)
                            } ?: return@any false )

                            segment.overlaps(target.second!!)
                        }
                        writer.println("${System.currentTimeMillis()},${relevantTask.name},${event.session},${it.second.item},${it.second.segment},${it.second.frame},${it.second.rank},${it.first},$correctTime")
                        ResultLogStatisticEvent(event.runId, taskId, "${event.session}", it.second.item, it.second.segment, it.second.frame, it.second.rank, it.first, correctTime)
                    }
                }

                writer.flush()

                return results
                
            }
            else -> { /* ignore */ }
        }

        return emptyList()

    }
}