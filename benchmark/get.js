/* eslint-env node */
/* eslint no-console: 0 */
require('./perf')('get', function(model) {
  model.get('name');
});
