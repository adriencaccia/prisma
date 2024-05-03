import { withCodSpeed } from '@codspeed/benchmark.js-plugin'
import Benchmark from 'benchmark'

import { getBinaryTargetForCurrentPlatformInternal, getos } from '../src/getPlatform'

console.log('process.execPath', process.execPath)
console.log('process.execArgv', process.execArgv)
console.log('process.argv', process.argv)
console.log('process.env', JSON.stringify(process.env, null, 2))

void withCodSpeed(new Benchmark.Suite('get-platform'))
  .add('getBinaryTargetForCurrentPlatform', {
    defer: true,
    fn: async (deferred: Benchmark.Deferred) => {
      const os = await getos()
      getBinaryTargetForCurrentPlatformInternal(os)
      deferred.resolve()
    },
  })
  .on('cycle', (event: Benchmark.Event) => {
    console.log(String(event.target))
  })
  .run()
