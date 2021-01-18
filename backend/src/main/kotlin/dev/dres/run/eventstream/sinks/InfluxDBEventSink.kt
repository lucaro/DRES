package dev.dres.run.eventstream.sinks

import com.influxdb.client.InfluxDBClient
import com.influxdb.client.InfluxDBClientFactory
import com.influxdb.client.domain.WritePrecision
import com.influxdb.client.write.Point
import dev.dres.data.model.log.QueryEvent
import dev.dres.data.model.log.QueryResult
import dev.dres.run.eventstream.*


class InfluxDBEventSink(private val influxDBClient: InfluxDBClient) : EventSink {

    constructor(url: String, token: String, org: String = "DRES", bucket: String = "events") : this(InfluxDBClientFactory.create(url, token.toCharArray(), org, bucket))

    private val writeApi = influxDBClient.writeApi

    override fun write(event: StreamEvent) {
        writeApi.writePoint(point(event))

        if (event is QueryEventLogEvent) {
            writeApi.writePoints(
                event.queryEventLog.events.map { point(it, event.timeStamp) }
            )
        }

        if (event is QueryResultLogEvent) {
            writeApi.writePoints(
                event.queryResultLog.results.map { point(it, event.timeStamp) }
            )
        }
    }

    private fun point(event: StreamEvent) : Point {

        val p = Point(event::class.simpleName!!)
            .time(event.timeStamp, WritePrecision.MS)

        return when(event){
            is TaskStartEvent -> p.addTag("run", event.runId.string)
                .addTag("task", event.taskId.string)
                .addTag("name", event.taskDescription.name)
            is TaskEndEvent -> p.addTag("run", event.runId.string)
                .addTag("task", event.taskId.string)
            is RunStartEvent -> p.addTag("run", event.runId.string)
                .addTag("name", event.description.name)
            is RunEndEvent -> p.addTag("run", event.runId.string)
            is SubmissionEvent -> p.addTag("run", event.runId.string)
                .addTag("task", event.taskId?.string)
                .addField("item", event.submission.item.name)
            is QueryEventLogEvent -> p.addTag("run", event.runId.string)
                .addField("type", event.queryEventLog.type)
                .addField("clientTime", event.queryEventLog.timestamp)
            is QueryResultLogEvent -> p.addTag("run", event.runId.string)
                .addField("values", event.queryResultLog.values.joinToString())
                .addField("usedCategories", event.queryResultLog.usedCategories.joinToString())
                .addField("usedTypes", event.queryResultLog.usedTypes.joinToString())
                .addField("sortType", event.queryResultLog.sortType.joinToString())
                .addField("resultSetAvailability", event.queryResultLog.resultSetAvailability)
            is InvalidRequestEvent -> p.addTag("run", event.runId.string)
        }

    }

    private fun point(event: QueryEvent, timestamp: Long) : Point = Point("QueryEvent")
        .time(timestamp, WritePrecision.MS)
        .addTag("type", event.type.joinToString())
        .addTag("category", event.category)
        .addTag("value", event.value)
        .addField("clientTime", event.timestamp)

    private fun point(event: QueryResult, timestamp: Long): Point = Point("QueryResult")
        .time(timestamp, WritePrecision.MS)
        .addField("item", event.video)
        .addField("segment", event.shot)
        .addField("frame", event.frame)
        .addField("score", event.score)
        .addField("rank", event.rank)

    override fun flush() = writeApi.flush()

    override fun close() = influxDBClient.close()

}