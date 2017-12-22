import * as assert from 'assert'
import * as sinon from 'sinon'
import AggregateMap from './index'

describe('AggregateMap', () => {
    let aggregate: AggregateMap<string, string>
    let iterable: { [Symbol.iterator]: sinon.SinonSpy & (() => Iterator<ReadonlyMap<string, string>>) }
    beforeEach(() => {
        iterable = {
            [Symbol.iterator]: sinon.spy(function*() {
                yield new Map([['foo', 'bar']])
                yield new Map([['baz', 'qux']])
            }),
        }
        aggregate = new AggregateMap(iterable)
    })
    describe('size', () => {
        it('should return the aggregated size', () => {
            assert.strictEqual(aggregate.size, 2)
            sinon.assert.calledOnce(iterable[Symbol.iterator])
        })
    })
    describe('get()', () => {
        it('should return undefined for non-existing elements', () => {
            assert.strictEqual(aggregate.get('whatever'), undefined)
            sinon.assert.calledOnce(iterable[Symbol.iterator])
        })
        it('should return existing elements', () => {
            assert.strictEqual(aggregate.get('baz'), 'qux')
            sinon.assert.calledOnce(iterable[Symbol.iterator])
        })
    })
    describe('has()', () => {
        it('should return true for existing elements', () => {
            assert.strictEqual(aggregate.has('baz'), true)
            sinon.assert.calledOnce(iterable[Symbol.iterator])
        })
        it('should return false for non-existing elements', () => {
            assert.strictEqual(aggregate.has('whatever'), false)
            sinon.assert.calledOnce(iterable[Symbol.iterator])
        })
    })
    describe('[Symbol.iterator]()', () => {
        it('should yield all aggregated entries', () => {
            assert.deepStrictEqual(Array.from(aggregate), [['foo', 'bar'], ['baz', 'qux']])
            sinon.assert.calledOnce(iterable[Symbol.iterator])
        })
    })
    describe('entries()', () => {
        it('should yield all aggregated entries', () => {
            assert.deepStrictEqual(Array.from(aggregate.entries()), [['foo', 'bar'], ['baz', 'qux']])
            sinon.assert.calledOnce(iterable[Symbol.iterator])
        })
    })
    describe('values()', () => {
        it('should yield all aggregated values', () => {
            assert.deepStrictEqual(Array.from(aggregate.values()), ['bar', 'qux'])
            sinon.assert.calledOnce(iterable[Symbol.iterator])
        })
    })
    describe('keys()', () => {
        it('it should yield all aggregated keys', () => {
            assert.deepStrictEqual(Array.from(aggregate.keys()), ['foo', 'baz'])
            sinon.assert.calledOnce(iterable[Symbol.iterator])
        })
    })
    describe('forEach()', () => {
        it('should call the callback for all aggregated entries', () => {
            const callback = sinon.spy()
            const thisArg = Symbol('thisArg')
            aggregate.forEach(callback, thisArg)
            assert.deepStrictEqual(callback.args, [['bar', 'foo', aggregate], ['qux', 'baz', aggregate]])
            for (const thisValue of callback.thisValues) {
                assert.strictEqual(thisValue, thisArg)
            }
            sinon.assert.calledOnce(iterable[Symbol.iterator])
        })
    })
})
