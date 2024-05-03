// @ts-nocheck

import { withCodSpeed } from '@codspeed/benchmark.js-plugin'
import Benchmark from 'benchmark'

import { generateTestClient } from '../../../utils/getTestClient'

console.log('process.execPath', process.execPath)
console.log('process.execArgv', process.execArgv)
console.log('process.argv', process.argv)
console.log('process.env', JSON.stringify(process.env, null, 2))

const suite = withCodSpeed(new Benchmark.Suite('typescript'))
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-floating-promises
suite
  .add('client generation 100 models with relations', {
    defer: true,
    fn: function (deferred) {
      generateTestClient({ projectDir: __dirname })
        .then(() => {
          deferred.resolve()
        })
        .catch((err) => {
          console.error(err)
          process.exit(1)
        })
    },
  })
  .on('cycle', (event) => {
    // Output benchmark result by converting benchmark result to string
    console.log(String(event.target))
  })
  .run()
