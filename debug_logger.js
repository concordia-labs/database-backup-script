const moment = require('moment');
const fs = require('fs');

const logFile = fs.createWriteStream(
  `logs/debug_${ moment().format('YYYYMMDDHHmmss') }.log`, 
  { flags : 'w' }
);
const logStdout = process.stdout;

const writeLogFile = content => {
  logFile.write(`\n${ content }`);
  logStdout.write(`\n${ content }`);
};

module.exports = writeLogFile;
