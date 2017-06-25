const output = document.querySelector('.output')

/* eslint-disable no-console */
console.log = (arg) => {
  console.info(arg)
  output.innerHTML += `<pre><code>${JSON.stringify(arg)}</code></pre>`
}
/* eslint-enable no-console */
