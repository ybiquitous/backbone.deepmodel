/* eslint-env node */
'use strict';

const version = process.env.npm_package_version;

if (!version) {
  console.error('Not found version');
  process.exit(1);
}

const exec = require('child_process').exec;
exec('grep -Rq \'' + version + '\' ./lib', function(err, stdout, stderr) {
  if (stdout) {
    console.log(stdout);
  }
  if (stderr) {
    console.error(stderr);
  }
  if (err) {
    console.error('Expected version "%s" is not found in ./lib', version);
    process.exit(err.code);
  }
});
