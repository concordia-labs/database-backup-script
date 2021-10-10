const dotenv = require('dotenv');
const schedule = require('node-schedule');
const async = require('async');
const fs = require('fs');
const { backupDatabase } = require('./database-backup');

dotenv.config();

const dbConfigurations = JSON.parse(fs.readFileSync('database-config.json'));

async.map(
  dbConfigurations,
  dbConfig => {
    const CRON_PERIOD = dbConfig.CRON_PERIOD || process.env.CRON_PERIOD;
    const AWS_S3_BACKUP_PATH = dbConfig.AWS_S3_BACKUP_PATH || process.env.AWS_S3_BACKUP_PATH;
    schedule.scheduleJob(
      CRON_PERIOD,
      async () => {
        backupDatabase({
          dbConfig,
          backupBasePath: AWS_S3_BACKUP_PATH
        });
      }
    );
  }
);
