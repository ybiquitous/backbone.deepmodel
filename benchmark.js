import Benchmark from 'benchmark'
import Backbone from 'backbone'
import DeepModel from './lib'

function log(msg) {
  process.stdout.write(`${msg}\n`)
}

function perf(name, callback) {
  const model = new Backbone.Model()
  const deepModel = new DeepModel()

  new Benchmark.Suite()
    .add(`Backbone.Model#${name}`, () => callback(model))
    .add(`Backbone.DeepModel#${name}`, () => callback(deepModel))
    .on('cycle', event => log(String(event.target)))
    .on('complete', event => log(`Fastest is ${event.currentTarget.filter('fastest').map('name')}`))
    .run({ async: true })
}

const argv = process.argv
if (argv.includes('get')) {
  perf('get', model => model.get('name'))
} else if (argv.includes('set')) {
  perf('set', model => model.set('name', 'foo'))
}
