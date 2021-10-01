const dotenv = require('dotenv');
const moment = require('moment');
const fs = require('fs');
const CronMonitor = require('./cronitor/cron-monitor');

dotenv.config();

let logFile = null;

if (process.env.KEEP_LOG_FILE) {
  if (!fs.existsSync('./logs')) {
    fs.mkdirSync('./logs');
  };

  logFile = fs.createWriteStream(
    `logs/debug_${ moment().format('YYYYMMDDHHmmss') }.log`,
    { flags: 'w' }
  );
};

class Logger {
  static writeDebugFile (content) {
    if (process.env.KEEP_LOG_FILE && logFile) {
      logFile.write(`\n${ content }`);
    };
    process.stdout.write(`\n${ content }`);
  };

  static writeErrorLogFile (fileName, content) {
    if (process.env.KEEP_LOG_FILE) {
      const logFilePath = `./logs/${ fileName }.error.log`;
      fs.writeFile(
        logFilePath,
        JSON.stringify(content),
        'UTF-8',
        () => Logger.writeDebugFile(`Saved extended error log file at "${ logFilePath }"`)
      );
    };
    process.stdout.write(`\n${ content }`);
  };

  static error (message) {
    this.writeDebugFile(message);
    CronMonitor.ping('fail', message);
  };

  static success (message) {
    this.writeDebugFile(message);
    CronMonitor.ping('ok', message);
  };

  static complete (message) {
    this.writeDebugFile(message);
    CronMonitor.ping('complete', message);
  };

  static running (message) {
    this.writeDebugFile(message);
    CronMonitor.ping('run', message);
  };
};

module.exports = Logger;
