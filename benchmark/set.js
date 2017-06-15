/* eslint-env node */
/* eslint no-console: 0 */
require('./perf')('set', (model) => {
  model.set('name', 'foo')
})
