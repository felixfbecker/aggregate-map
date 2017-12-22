/**
 * Provides a read-only Map interface that aggregates results from multiple results in O(n)
 */
export class AggregateMap<K, V> implements ReadonlyMap<K, V> {
    /**
     * @param maps An Iterable that when iterated provides the Maps to aggregate results from
     */
    constructor(private maps: Iterable<ReadonlyMap<K, V>>) {}

    /**
     * Returns the cumulative size of all Maps
     */
    public get size(): number {
        let size = 0
        for (const map of this.maps) {
            for (const _ of map) {
                size++
            }
        }
        return size
    }

    /**
     * Looks up a key in all Maps and returns the first result
     */
    public get(key: K): V | undefined {
        for (const map of this.maps) {
            if (map.has(key)) {
                return map.get(key)!
            }
        }
        return undefined
    }

    /**
     * Checks if a key exists in any Map
     */
    public has(key: K): boolean {
        return !!this.get(key)
    }

    /**
     * Iterates over all keys from all Maps
     */
    public *keys(): IterableIterator<K> {
        for (const map of this.maps) {
            for (const key of map.keys()) {
                yield key
            }
        }
    }

    /**
     * Iterates over all values from all Maps
     */
    public *values(): IterableIterator<V> {
        for (const map of this.maps) {
            for (const value of map.values()) {
                yield value
            }
        }
    }

    /**
     * Iterates over all entries from all Maps
     */
    public *entries(): IterableIterator<[K, V]> {
        for (const map of this.maps) {
            for (const pair of map.entries()) {
                yield pair
            }
        }
    }

    /**
     * Iterates over all entries from all Maps
     */
    public *[Symbol.iterator]() {
        for (const map of this.maps) {
            for (const pair of map) {
                yield pair
            }
        }
    }

    /**
     * Calls a callback function for all items in all Maps
     */
    public forEach(callbackfn: (value: V, key: K, map: ReadonlyMap<K, V>) => void, thisArg?: any): void {
        for (const [key, value] of this.entries()) {
            callbackfn.call(thisArg, value, key, this)
        }
    }
}

export default AggregateMap
