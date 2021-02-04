package dev.dres.run.eventstream

import dev.dres.run.eventstream.sinks.EventSink
import dev.dres.run.eventstream.sinks.JsonEventSink
import dev.dres.utilities.extensions.read
import dev.dres.utilities.extensions.write
import org.slf4j.LoggerFactory
import java.util.concurrent.ConcurrentLinkedQueue
import java.util.concurrent.locks.StampedLock

object EventStreamProcessor {

    private const val flushInterval = 30_000

    private var active = false
    private var flushTimer = 0L

    private lateinit var processorThread: Thread
    private val LOGGER = LoggerFactory.getLogger(this.javaClass)

    private val eventQueue = ConcurrentLinkedQueue<StreamEvent>()
    private val eventHandlers = mutableListOf<StreamEventHandler>()
    private val handlerLock = StampedLock()
    private val eventSinks = mutableListOf<EventSink>()
    private val internalEventBuffer = ArrayList<StreamEvent>()


    fun event(event: StreamEvent) = eventQueue.add(event)
    fun register(vararg handler: StreamEventHandler) = handlerLock.write { eventHandlers.addAll(handler) }

    fun init() {
        if (active) {
            return
        }

        eventSinks.add(JsonEventSink())

        active = true

        processorThread = Thread( {

            while (active) {
                try {

                    while (eventQueue.isNotEmpty()) {
                        val event = eventQueue.poll() ?: break

                        handlerLock.read {
                            for (handler in eventHandlers) {
                                try {
                                    internalEventBuffer += handler.handle(event)
                                } catch (t: Throwable) {
                                    LOGGER.error("Uncaught exception while handling event $event in ${handler.javaClass.simpleName}", t)
                                }
                            }
                        }

                        for (eventSink in eventSinks) {
                            try {
                                eventSink.write(event)
                            } catch (t: Throwable) {
                                LOGGER.error("Error while storing event $event in sink $eventSink", t)
                            }
                        }

                        eventQueue += internalEventBuffer
                        internalEventBuffer.clear()

                    }



                } catch (t : Throwable) {
                    LOGGER.error("Uncaught exception in EventStreamProcessor", t)
                } finally {
                    Thread.sleep(10)
                }

                if (flushTimer < System.currentTimeMillis()) {
                    for (eventSink in eventSinks) {
                        eventSink.flush()
                    }
                    flushTimer = System.currentTimeMillis() + flushInterval
                }

            }

            for (eventSink in eventSinks) {
                eventSink.flush()
                eventSink.close()
            }

        }, "EventStreamProcessorThread")

        processorThread.isDaemon = true
        processorThread.start()

    }

    fun stop(){
        active = false
    }

}