const dotenv = require('dotenv');
const moment = require('moment');
const mysqldump = require('mysqldump');
const fs = require('fs');
const Logger = require('./logger');

dotenv.config();

const dumpDatabase = async () => {
  const baseFileName = `${ process.env.DB_NAME }_${ moment().format('YYYYMMDDHHmmss') }`;
  const dumpFileName = `dump_${ baseFileName }.sql.gz`;
  const filePath = `./dumps/${ dumpFileName }`;

  Logger.running(`
    Creating new MYSQL dump file ${ dumpFileName }\n
  `);

  return await mysqldump({
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    },
    dumpToFile: filePath,
    compressFile: true
  })
    .then(() => {
      Logger.complete(`New DB dump "${ dumpFileName }" was created successfuly!`);
    })
    .catch(error => {
      Logger.writeErrorLogFile(baseFileName, error);

      Logger.error(`
        \nCould not create dump "${ dumpFileName }"!
        \nThe following error occurred:
        \n   ${ error }\n
      `);

      fs.unlink(filePath, () => Logger.writeDebugFile(`Deleted ${ dumpFileName } as the operation was not successfuly completed.`));
    });
};

module.exports = dumpDatabase;
