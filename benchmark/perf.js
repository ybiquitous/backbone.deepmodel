/* eslint-env node */
/* eslint no-console: 0 */
/* jscs:disable disallowVar */
var Benchmark = require('benchmark');
var Backbone  = require('backbone');
var DeepModel = require('../dist/backbone.deepmodel');

module.exports = function perf(name, callback) {
  var model = new Backbone.Model();
  var deepModel = new DeepModel();

  new Benchmark.Suite()
    .add('Backbone.Model#' + name, function() {
      callback(model);
    })
    .add('Backbone.DeepModel#' + name, function() {
      callback(deepModel);
    })
    .on('cycle', function(event) {
      console.log(String(event.target));
    })
    .on('complete', function(event) {
      var suite = event.currentTarget;
      console.log('Fastest is ' + suite.filter('fastest').map('name'));
    })
    .run({async: true});
};
