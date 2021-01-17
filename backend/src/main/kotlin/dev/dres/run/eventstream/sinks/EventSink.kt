package dev.dres.run.eventstream.sinks

import dev.dres.run.eventstream.StreamEvent

interface EventSink {

    fun write(event: StreamEvent)

    fun flush()

    fun close()

}