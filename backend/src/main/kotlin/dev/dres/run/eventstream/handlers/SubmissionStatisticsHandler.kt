package dev.dres.run.eventstream.handlers

import dev.dres.data.model.UID
import dev.dres.data.model.run.CompetitionRunId
import dev.dres.data.model.run.Submission
import dev.dres.data.model.run.SubmissionStatus
import dev.dres.data.model.run.TaskRunId
import dev.dres.run.eventstream.*
import java.io.File
import java.io.PrintWriter

class SubmissionStatisticsHandler : StreamEventHandler {

    private val writer = PrintWriter(File("statistics/submission_statistics_${System.currentTimeMillis()}.csv").also { it.parentFile.mkdirs() })

    private val submissionTaskMap = mutableMapOf<UID, MutableList<Submission>>()
    private val taskStartMap = mutableMapOf<TaskRunId, Long>()
    private val taskNameMap = mutableMapOf<TaskRunId, String>()
    private val taskRunMap = mutableMapOf<TaskRunId, CompetitionRunId>()

    init {
        writer.println("run,task,team,type,value")
    }

    override fun handle(event: StreamEvent): List<StreamEvent> {
        when (event) {
            is TaskStartEvent -> {
                submissionTaskMap[event.taskId] = mutableListOf()
                taskStartMap[event.taskId] = event.timeStamp
                taskNameMap[event.taskId] = event.taskDescription.name
                taskRunMap[event.taskId] = event.runId
            }
            is SubmissionEvent -> if (event.taskId != null && taskStartMap.containsKey(event.taskId)){
                submissionTaskMap[event.taskId]!!.add(event.submission)
            }
            is TaskEndEvent -> {
                val results = computeStatistics(submissionTaskMap[event.taskId]!!, taskStartMap[event.taskId]!!, event.taskId)
                submissionTaskMap.remove(event.taskId)
                taskStartMap.remove(event.taskId)
                taskNameMap.remove(event.taskId)
                taskRunMap.remove(event.taskId)
                return results
            }
            else -> {/* ignore */
            }
        }
        return emptyList()
    }

    private fun computeStatistics(submissions: List<Submission>, taskStart: Long, taskRunId: TaskRunId) : List<NamedTaskValueEvent> {

        val taskName = taskNameMap[taskRunId]!!
        val competitionRunId = taskRunMap[taskRunId]!!

        val submissionsByTeam = submissions.groupBy { it.teamId }

        val results = submissionsByTeam.mapValues { it.value.size }.map{
            (teamId, count) -> writer.println("${competitionRunId.string},$taskName,${teamId.string},\"totalSubmissionsPerTeam\",$count")
            NamedTaskValueEvent(competitionRunId, taskRunId, teamId.string, "totalSubmissionsPerTeam", count.toDouble())
        } +
                submissionsByTeam.mapValues {
            it.value.firstOrNull { s -> s.status == SubmissionStatus.CORRECT }?.timestamp?.minus(taskStart) }
                .filter { it.value != null }.map{
                    (teamId, time) -> writer.println("${competitionRunId.string},$taskName,${teamId.string},\"timeUntilCorrectSubmission\",$time")
                    NamedTaskValueEvent(competitionRunId, taskRunId, teamId.string, "timeUntilCorrectSubmission", time?.toDouble() ?: -1.0)
                } +
        submissionsByTeam.mapValues {
            it.value.indexOfFirst { s -> s.status == SubmissionStatus.CORRECT } }.map{
            (teamId, count) -> writer.println("${competitionRunId.string},$taskName,${teamId.string},\"incorrectBeforeCorrectSubmissions\",$count")
            NamedTaskValueEvent(competitionRunId, taskRunId, teamId.string, "incorrectBeforeCorrectSubmissions", count.toDouble())
        }
        writer.flush()

        return results

    }


}