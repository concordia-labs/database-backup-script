const dotenv = require('dotenv');

dotenv.config();

const cronitor = require('cronitor')(process.env.CRONITOR_API_KEY);

const monitor = new cronitor.Monitor(process.env.CRONITOR_MONITOR_KEY);

class CronMonitor {
  static ping (state, message) {
    monitor.ping({
      state, // 'run|complete|fail|ok'
      message, // up to 2000 chars
      env: process.env.ENVIRONMENT
    });
  }
};

module.exports = CronMonitor;
