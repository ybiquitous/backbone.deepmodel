/* eslint no-console: 0 */
/* jscs:disable disallowVar */
var output = document.querySelector('.output');
console.log = function(arg) {
  console.info(arg);
  output.innerHTML += '<pre><code>' + JSON.stringify(arg) + '</code></pre>';
};
