package dev.dres.run.eventstream.sinks

import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import dev.dres.run.eventstream.StreamEvent
import java.io.File
import java.io.PrintWriter

class JsonEventSink(targetFile: File = File("events/${System.currentTimeMillis()}.txt").also { it.parentFile.mkdirs() }) : EventSink {

    private val mapper = jacksonObjectMapper()
    private val writer = PrintWriter(targetFile)

    override fun write(event: StreamEvent) = writer.println( mapper.writeValueAsString(event) )

    override fun flush() = writer.flush()

    override fun close() = writer.close()
}