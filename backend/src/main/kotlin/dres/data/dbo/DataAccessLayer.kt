package dres.data.dbo

import dres.data.serializers.*
import java.nio.file.Path

/**
 * The data access layer used by DRES
 *
 * @author Ralph Gasser
 * @version 1.0
 */
class DataAccessLayer(private val basePath: Path) {
    /** List of [dres.data.model.admin.User]s managed by this DRES instance. */
    val users = DAO(this.basePath.resolve("users.db"), UserSerializer)

    /** List of [dres.data.model.competition.Competition]s managed by this DRES instance. */
    val competitions = DAO(this.basePath.resolve("competitions.db"), CompetitionSerializer)

    val collections = DAO(this.basePath.resolve("collections.db"), MediaCollectionSerializer)
    val mediaItems = DAO(this.basePath.resolve("mediaItems.db"), MediaItemSerializer)
    val mediaSegments = DAO(this.basePath.resolve("mediaSegments.db"), MediaItemSegmentSerializer)
}