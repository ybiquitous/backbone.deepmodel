const { packageVersion, dummyVersion, updateVersion, stageFile } = require('./utils')

let oldVersion = dummyVersion
let newVersion = packageVersion()

if (process.argv.includes('--revert')) {
  [oldVersion, newVersion] = [newVersion, oldVersion]
}
updateVersion(oldVersion, newVersion)

stageFile()
