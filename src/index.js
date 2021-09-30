const dotenv = require('dotenv');
const moment = require('moment');
const schedule = require('node-schedule');
const dumpDatabase = require('./db_dump');
const Logger = require('./logger');

dotenv.config();

Logger.writeDebugFile(`
  Starting Job execution at ${ moment().format('YYYY-MM-DD HH:mm:ss') }\n
  HOST: ${ process.env.DB_HOST }
  DATABASE: ${ process.env.DB_NAME }
`);

schedule.scheduleJob(
  process.env.CRON_PERIOD,
  async () => {
    await dumpDatabase();
  }
);
