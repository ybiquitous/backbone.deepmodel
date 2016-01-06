/* eslint-env node */
/* eslint no-console: 0 */
require('./perf')('set', function(model) {
  model.set('name', 'foo');
});
