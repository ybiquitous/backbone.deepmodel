/* eslint-env node */
/* eslint no-console: 0 */
require('./perf')('get', (model) => {
  model.get('name')
})
