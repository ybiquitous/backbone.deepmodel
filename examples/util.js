/* eslint-disable no-console */
const output = document.querySelector('.output')
console.log = (arg) => {
  console.info(arg)
  output.innerHTML += `<pre><code>${JSON.stringify(arg)}</code></pre>`
}
