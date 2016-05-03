/* eslint no-console: 0 */
var output = document.querySelector('.output')
console.log = function (arg) {
  console.info(arg)
  output.innerHTML += '<pre><code>' + JSON.stringify(arg) + '</code></pre>'
}
