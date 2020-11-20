package dev.dres.run.filter

import dev.dres.data.model.basics.media.MediaItem
import dev.dres.data.model.run.Submission

class DuplicateSubmissionFilter : SubmissionFilter {
    override fun test(submission: Submission): Boolean = submission.taskRun!!.submissions.none {

        it.teamId == submission.teamId &&
        it.item == submission.item &&

         if(submission.item is MediaItem.VideoItem) {
             //contains a previous submission...
             /*(*/(submission.start!! <= it.start!! && submission.end!! >= it.end!!) /*|| */
         } else {
            true
         }

        //or is contained by a previous submission
        /*(it.start <= submission.start && it.end!! >= submission.end!!))*/
    }
}