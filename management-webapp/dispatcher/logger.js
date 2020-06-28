const { Console } = require('console');

const logger = new Console({
  stdout: process.stdout,
  stderr: process.stderr,
});

module.exports = logger;
