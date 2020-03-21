package dres.data.dbo

import dres.data.model.Entity
import org.mapdb.DB
import org.mapdb.DBMaker
import org.mapdb.Serializer
import java.nio.file.Path

/**
 * A simple data access object [DAO] implementation for the [Entity] objects used by DRES.
 *
 * @author Ralph Gasser
 * @version 1.0
 */
class DAO<T: Entity>(path: Path, private val serializer: Serializer<T>) : Iterable<T>, AutoCloseable {

    /** The [DB] object used to store */
    private val db = DBMaker.fileDB(path.toFile()).transactionEnable().make()

    /** Internal counter used to keep track of the next autoincrement ID.  */
    private val autoincrement = this.db.atomicLong("counter", 0L).createOrOpen()

    /** Internal data structure used to keep track of the data held by this [DAO]. */
    protected val data = this.db.hashMap("data", Serializer.LONG, this.serializer).counterEnable().createOrOpen()

    /**
     * Returns the value [T] for the given ID.
     *
     * @param id The ID of the entry.
     * @return Entry [T]
     */
    operator fun get(id: Long): T? = this.data[id]

    /**
     * Deletes the value [T] for the given ID.
     *
     * @param id The ID of the entry that should be deleted
     * @return Deleted entry [T]
     */
    fun delete(id: Long): T? {
        val deleted = this.data.remove(id)
        this.db.commit()
        return deleted
    }

    /**
     * Deletes the value [T]
     *
     * @param value The value that should be deleted.
     * @return Deleted entry [T]
     */
    fun delete(value: T) = this.delete(value.id)

    /**
     * Updates the value for the given ID with the new value [T]
     *
     * @param id The ID of the value that should be updated
     * @param value The new value [T]
     */
    fun update(id: Long, value: T?) {
        this.data[id] = value
        this.db.commit()
    }

    /**
     * Appends the given value using this [DAO]
     *
     * @param value The value [T] that should be appended
     * @return ID of the new value.
     */
    fun append(value: T?): Long {
        val next = this.autoincrement.incrementAndGet()
        value?.id = next
        this.data[next] = value
        this.db.commit()
        return next
    }

    /**
     * Closes this [DAO]
     */
    override fun close() {
        if (!this.db.isClosed()) {
            this.data.close()
            this.db.close()
        }
    }

    /**
     * Returns an iterator over the elements of this object.
     */
    override fun iterator(): Iterator<T> = object : Iterator<T> {
        private var id: Long = 1L

        override fun hasNext(): Boolean {
            for (id in this.id .. this@DAO.autoincrement.get()) {
                if (this@DAO.data.containsKey(id)) {
                    this.id = id
                    return true
                }
            }
            return false
        }

        override fun next(): T {
            while(true) {
                if (this@DAO.data.containsKey(this.id)) {
                    return this@DAO.data[id++]!!
                }
                this.id++
            }
        }
    }

}