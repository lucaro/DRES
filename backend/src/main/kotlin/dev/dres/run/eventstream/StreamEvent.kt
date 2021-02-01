package dev.dres.run.eventstream

import dev.dres.data.model.UID
import dev.dres.data.model.competition.CompetitionDescription
import dev.dres.data.model.competition.TaskDescription
import dev.dres.data.model.log.QueryEventLog
import dev.dres.data.model.log.QueryResultLog
import dev.dres.data.model.run.CompetitionRunId
import dev.dres.data.model.run.Submission

sealed class StreamEvent(var timeStamp : Long = System.currentTimeMillis(), var session: String? = null)


class TaskStartEvent(val runId: CompetitionRunId, val taskId: UID, val taskDescription: TaskDescription) : StreamEvent()
class TaskEndEvent(val runId: CompetitionRunId, val taskId: UID) : StreamEvent()
class RunStartEvent(val runId: CompetitionRunId, val description: CompetitionDescription) : StreamEvent()
class RunEndEvent(val runId: CompetitionRunId) : StreamEvent()

class ScoreEvent(val runId: CompetitionRunId, val teamId: String, val name: String, val score: Double) : StreamEvent()

class SubmissionEvent(session: String, val runId: CompetitionRunId, val taskId: UID?, val submission : Submission) : StreamEvent(session = session)
class QueryEventLogEvent(session: String, val runId: CompetitionRunId, val queryEventLog: QueryEventLog) : StreamEvent(session = session)
class QueryResultLogEvent(session: String, val runId: CompetitionRunId, val queryResultLog: QueryResultLog) : StreamEvent(session = session)
class InvalidRequestEvent(session: String, val runId: CompetitionRunId, val requestData: String) : StreamEvent(session = session)