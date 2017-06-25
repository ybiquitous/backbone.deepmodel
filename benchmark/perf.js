const Benchmark = require('benchmark')
const Backbone = require('backbone')
const DeepModel = require('../dist/backbone.deepmodel')

module.exports = function perf(name, callback) {
  const model = new Backbone.Model()
  const deepModel = new DeepModel()

  /* eslint-disable no-console */
  new Benchmark.Suite()
    .add(`Backbone.Model#${name}`, () => callback(model))
    .add(`Backbone.DeepModel#${name}`, () => callback(deepModel))
    .on('cycle', event => console.log(String(event.target)))
    .on('complete', event => (
      console.log(`Fastest is ${event.currentTarget.filter('fastest').map('name')}`)
    ))
    .run({ async: true })
  /* eslint-enable no-console */
}
