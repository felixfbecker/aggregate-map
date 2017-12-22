# Aggregate Map

[![npm](https://img.shields.io/npm/v/aggregate-map.svg)](https://www.npmjs.com/package/aggregate-map)
[![downloads](https://img.shields.io/npm/dm/aggregate-map.svg)](https://www.npmjs.com/package/aggregate-map)
[![build](https://travis-ci.org/felixfbecker/aggregate-map.svg?branch=master)](https://travis-ci.org/felixfbecker/aggregate-map)
[![codecov](https://codecov.io/gh/felixfbecker/aggregate-map/branch/master/graph/badge.svg)](https://codecov.io/gh/felixfbecker/aggregate-map)
[![dependencies](https://david-dm.org/felixfbecker/aggregate-map.svg)](https://david-dm.org/felixfbecker/aggregate-map)
![node](http://img.shields.io/node/v/aggregate-map.svg)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![license](https://img.shields.io/npm/l/aggregate-map.svg)](https://github.com/felixfbecker/aggregate-map/blob/master/LICENSE.txt)

A read-only ES6 Map implementation that aggregates results from multiple Maps in O(n)

📖 [API Documentation](https://aggregate-map.surge.sh)

Simple Example:

```ts
const maps = [new Map([['foo', 'bar']]), new Map([['baz', 'qux']])]

const aggregate = new AggregateMap(maps)

aggregate.get('baz') // 'qux'
aggregate.has('foo') // true

for (const [key, value] of aggregate) {
  console.log(key, value) // ['foo', 'bar'] ['baz', 'qux']
}
```

Advanced Example:

```ts
import iterate from 'iterare'

class Repository {
  public pullRequests: ReadonlyMap<string, PullRequest> = new AggregateMap({
    [Symbol.iterator]: () => iterate(this.remotes).map(remote => remote.pullRequests),
  })
  private remotes = new Map<string, RepositoryRemote>()
}

class RepositoryRemote {
  public pullRequests = new Map<string, PullRequest>()
}
```
