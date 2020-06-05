package dres.run.updatables

import dres.run.RunManager
import dres.data.model.run.CompetitionRun
import dres.run.RunManagerStatus
import dres.run.score.scoreboard.Scoreboard

/**
 * This is a holder for all the [Scoreboard]s maintained by a [RunManager].
 * Implements the [Updatable] interface.
 *
 * @author Ralph Gasser
 * @version 1.0
 */
class ScoreboardsUpdatable(val scoreboards: List<Scoreboard>, private val run: CompetitionRun): StatefulUpdatable {

    companion object {
       val ELIGIBLE_STATUS = arrayOf(RunManagerStatus.ACTIVE, RunManagerStatus.RUNNING_TASK, RunManagerStatus.TASK_ENDED, RunManagerStatus.PREPARING_TASK)
    }

    /** The [Phase] this [ScoreboardsUpdatable] belongs to. */
    override val phase: Phase = Phase.MAIN

    @Volatile
    override var dirty: Boolean = false

    override fun update(status: RunManagerStatus) {
        if (this.dirty) {
            this.dirty = false
            this.scoreboards.forEach { it.update(this.run.runs) }
        }
    }

    override fun shouldBeUpdated(status: RunManagerStatus): Boolean = ELIGIBLE_STATUS.contains(status)
}