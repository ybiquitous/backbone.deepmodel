const path = require('path')
const fs = require('fs')

const encoding = 'utf8'
const rootDir = path.join(__dirname, '..')
const targetFile = path.join(rootDir, 'lib', 'index.js')

module.exports = {
  dummyVersion: '0.0.0',

  packageVersion() {
    const file = path.join(rootDir, 'package.json')
    return JSON.parse(fs.readFileSync(file, encoding)).version
  },

  updateVersion(oldVersion, newVersion) {
    const file = targetFile
    const content = fs.readFileSync(file, encoding)
    const changedContent = content.replace(oldVersion, newVersion)
    fs.writeFileSync(file, changedContent, encoding)
  },
}
