package dres.data.model.competition

import dres.api.rest.types.query.ContentType
import dres.api.rest.types.query.QueryContentElement
import dres.api.rest.types.query.QueryTarget
import dres.data.model.Config
import dres.data.model.basics.media.MediaItem
import dres.data.model.basics.time.TemporalRange
import java.io.File
import java.io.FileInputStream
import java.io.FileNotFoundException
import java.io.IOException
import java.util.*


/**
 * Represents the target of a [TaskDescription], i.e., the media object or segment that is
 * considered correct.
 *
 * @author Luca Rossetto & Ralph Gasser
 * @version 1.0.1
 */
sealed class TaskDescriptionTarget {

    internal abstract fun textDescription(): String

    /**
     * Generates and returns a [QueryContentElement] object to be used by the RESTful interface.
     *
     * @param config The [Config] used of path resolution.
     * @return [QueryContentElement]
     *
     * @throws FileNotFoundException
     * @throws IOException
     */
    internal abstract fun toQueryContentElement(config: Config): QueryContentElement?

    /**
     * A [TaskDescriptionTarget] that is validated by human judges.
     */
    object JudgementTaskDescriptionTarget : TaskDescriptionTarget() {
        override fun textDescription() = "Judgement"
        override fun toQueryContentElement(config: Config): QueryContentElement? = null
    }

    /**
     * A [TaskDescriptionTarget], specified by a [MediaItem].
     */
    data class MediaItemTarget(val item: MediaItem) : TaskDescriptionTarget() {
        override fun textDescription() = "Media Item ${item.name}"
        override fun toQueryContentElement(config: Config): QueryContentElement? = TODO()
    }

    /**
     * A [TaskDescriptionTarget], specified by a [MediaItem.VideoItem] and a [TemporalRange].
     */
    data class VideoSegmentTarget(override val item: MediaItem.VideoItem, override val temporalRange: TemporalRange) : TaskDescriptionTarget(), CachedVideoItem {
        override fun textDescription() = "Media Item ${item.name} @ ${temporalRange.start.niceText()} - ${temporalRange.end.niceText()}"
        override fun toQueryContentElement(config: Config): QueryContentElement? {
            val file = File(File(config.cachePath + "/tasks"), this.cacheItemName())
            return FileInputStream(file).use { imageInFile ->
                val fileData = ByteArray(file.length().toInt())
                imageInFile.read(fileData)
                QueryContentElement(ContentType.VIDEO, Base64.getEncoder().encodeToString(fileData))
            }
        }
    }
}