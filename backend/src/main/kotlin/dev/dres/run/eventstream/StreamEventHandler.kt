package dev.dres.run.eventstream

interface StreamEventHandler {

    fun handle(event: StreamEvent) : List<StreamEvent>

}