const Benchmark = require('benchmark')
const Backbone = require('backbone')
const DeepModel = require('../dist/backbone.deepmodel')

module.exports = function perf(name, callback) {
  const model = new Backbone.Model()
  const deepModel = new DeepModel()

  new Benchmark.Suite()
    .add(`Backbone.Model#${name}`, () => {
      callback(model)
    })
    .add(`Backbone.DeepModel#${name}`, () => {
      callback(deepModel)
    })
    .on('cycle', (event) => {
      // eslint-disable-next-line no-console
      console.log(String(event.target))
    })
    .on('complete', (event) => {
      const suite = event.currentTarget
      // eslint-disable-next-line no-console
      console.log(`Fastest is ${suite.filter('fastest').map('name')}`)
    })
    .run({ async: true })
}
