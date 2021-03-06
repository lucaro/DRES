package dev.dres.data.serializers

import dev.dres.data.model.competition.Team
import dev.dres.utilities.extensions.readUID
import dev.dres.utilities.extensions.writeUID
import org.mapdb.DataInput2
import org.mapdb.DataOutput2
import org.mapdb.Serializer

object TeamSerializer : Serializer<Team> {
    override fun serialize(out: DataOutput2, value: Team) {
        out.writeUID(value.uid)
        out.writeUTF(value.name)
        out.writeUTF(value.color)
        out.writeUID(value.logoId)
        out.packInt(value.users.size)
        value.users.forEach { out.writeUID(it) }
    }

    override fun deserialize(input: DataInput2, available: Int): Team = Team(
        input.readUID(),
        input.readUTF(),
        input.readUTF(),
        input.readUID(),
        (0 until input.unpackInt()).map { input.readUID() }.toMutableList()
    )
}