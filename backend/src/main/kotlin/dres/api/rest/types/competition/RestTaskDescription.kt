package dres.api.rest.types.competition

import dres.api.rest.types.competition.tasks.RestTaskDescriptionComponent
import dres.api.rest.types.competition.tasks.RestTaskDescriptionTarget
import dres.data.model.competition.interfaces.TaskDescription


class RestTaskDescription(
        val id: String,
        val name: String,
        val taskGroup: String,
        val taskType: String,
        val duration: Long,
        val defaultMediaCollectionId: String,
        val components: List<RestTaskDescriptionComponent>,
        val target: RestTaskDescriptionTarget) {

    constructor(description: TaskDescription) : this(
            description.id.string,
            description.name,
            description.taskGroup.name,
            description.taskType.name,
            description.duration,
            description.defaultMediaCollectionId.string,
            description.components.map { RestTaskDescriptionComponent(it) },
            RestTaskDescriptionTarget.fromTarget(description.target)
    )
}