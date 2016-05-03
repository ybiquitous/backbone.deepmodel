/* eslint-env node */
/* eslint no-console: 0 */
const Benchmark = require('benchmark')
const Backbone = require('backbone')
const DeepModel = require('../dist/backbone.deepmodel')

module.exports = function perf (name, callback) {
  const model = new Backbone.Model()
  const deepModel = new DeepModel()

  new Benchmark.Suite()
    .add('Backbone.Model#' + name, function () {
      callback(model)
    })
    .add('Backbone.DeepModel#' + name, function () {
      callback(deepModel)
    })
    .on('cycle', function (event) {
      console.log(String(event.target))
    })
    .on('complete', function (event) {
      const suite = event.currentTarget
      console.log('Fastest is ' + suite.filter('fastest').map('name'))
    })
    .run({async: true})
}
