const { execSync } = require('child_process')

const version = process.env.npm_package_version

if (!version) {
  // eslint-disable-next-line no-console
  console.error('Not found version')
  process.exit(1)
}

try {
  execSync(`grep -Rq '${version}' ./lib`)
} catch (err) {
  // eslint-disable-next-line no-console
  console.error(`Expected version "${version}" is not found in ./lib`)
  process.exit(err.code)
}
