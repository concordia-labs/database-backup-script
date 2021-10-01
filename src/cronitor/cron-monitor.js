const dotenv = require('dotenv');

dotenv.config();

class CronMonitor {
  static get monitor () {
    if (!process.env.CRONITOR_API_KEY || !process.env.CRONITOR_MONITOR_KEY) {
      const fakeMonitor = { ping: () => { } };
      return fakeMonitor;
    }
    const cronitor = require('cronitor')(process.env.CRONITOR_API_KEY);
    return new cronitor.Monitor(process.env.CRONITOR_MONITOR_KEY);
  }

  static ping (state, message) {
    this.monitor.ping({
      state, // 'run|complete|fail|ok'
      message, // up to 2000 chars
      env: process.env.ENVIRONMENT
    });
  }
};

module.exports = CronMonitor;
