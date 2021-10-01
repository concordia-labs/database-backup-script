const dotenv = require('dotenv');
const moment = require('moment');
const schedule = require('node-schedule');
const async = require('async');
const fs = require('fs');
const DatabaseDump = require('./database-dump/database-dump');

dotenv.config();

const databaseConfigurations = JSON.parse(fs.readFileSync('database-config.json'));

async.map(
  databaseConfigurations,
  dbConfig => {
    const CRON_PERIOD = dbConfig.CRON_PERIOD || process.env.CRON_PERIOD;
    schedule.scheduleJob(
      CRON_PERIOD,
      () => new DatabaseDump(dbConfig).dumpDatabase()
    );
  }
);
