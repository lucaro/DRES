package dev.dres.api.rest.types.run

import dev.dres.api.rest.types.collection.RestMediaItem
import dev.dres.data.model.submissions.Submission
import dev.dres.data.model.submissions.SubmissionStatus
import dev.dres.data.model.submissions.aspects.TemporalSubmissionAspect

/**
 * Contains information about a [Submission].
 *
 * @author Luca Rossetto
 * @version 1.0.0
 */
data class SubmissionInfo(
    val id: String? = null,
    val team: String,
    val member: String,
    val status: SubmissionStatus,
    val timestamp: Long,
    val item: RestMediaItem? = null,
    val start: Long? = null,
    val end: Long? = null
) {
    constructor(submission: Submission) : this(
        submission.uid.string,
        submission.teamId.string,
        submission.memberId.string,
        submission.status,
        submission.timestamp,
        RestMediaItem.fromMediaItem(submission.item),
        if (submission is TemporalSubmissionAspect) submission.start else null,
        if (submission is TemporalSubmissionAspect) submission.end else null
    )


    companion object {
        fun blind(submission: Submission): SubmissionInfo = SubmissionInfo(
            null,
            submission.teamId.string,
            submission.memberId.string,
            submission.status,
            submission.timestamp
        )

        fun withId(submission: Submission): SubmissionInfo = SubmissionInfo(
            submission.uid.string,
            submission.teamId.string,
            submission.memberId.string,
            submission.status,
            submission.timestamp,
            RestMediaItem.fromMediaItem(submission.item),
            if (submission is TemporalSubmissionAspect) submission.start else null,
            if (submission is TemporalSubmissionAspect) submission.end else null
        )

    }
}