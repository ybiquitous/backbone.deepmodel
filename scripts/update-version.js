const {
  packageVersion, dummyVersion, updateVersion,
} = require('./utils')

let oldVersion = dummyVersion
let newVersion = packageVersion()

if (process.argv.includes('--revert')) {
  [oldVersion, newVersion] = [newVersion, oldVersion]
}
updateVersion(oldVersion, newVersion)
