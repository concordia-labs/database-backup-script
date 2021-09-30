const dotenv = require('dotenv');
const moment = require('moment');
const schedule = require('node-schedule');
const dumpDatabase = require('./db_dump');
const writeLogFile = require('./debug_logger');

dotenv.config();

writeLogFile(`Starting Job execution at ${moment().format('YYYY-MM-DD HH:mm:ss')}`)
writeLogFile(`HOST: ${ process.env.DB_HOST }`)
writeLogFile(`DATABASE: ${ process.env.DB_NAME }`)
writeLogFile(`USERNAME: ${ process.env.DB_USER }`)
writeLogFile(`CRON_PERIOD: ${ process.env.CRON_PERIOD }`)

schedule.scheduleJob(
  process.env.CRON_PERIOD,
  async () => {
    console.clear()

    writeLogFile(`Running scheduled dump at ${moment().format('YYYY-MM-DD HH:mm:ss')}`)
    await dumpDatabase()
    writeLogFile(`Finished scheduled dump at ${moment().format('YYYY-MM-DD HH:mm:ss')}`)
    writeLogFile(`--------------------------------------------------------------------`)
  }
);
