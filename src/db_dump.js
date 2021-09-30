const dotenv = require('dotenv');
const moment = require('moment');
const mysqldump = require('mysqldump');
const fs = require('fs');
const writeLogFile = require('./debug_logger');

dotenv.config();

if (!fs.existsSync('./dumps')){
  fs.mkdirSync('./dumps');
}

const dumpDatabase = async () => {
  const baseFileName = `${ process.env.DB_NAME}_${ moment().format('YYYYMMDDHHmmss') }`;
  const dumpFileName = `dump_${ baseFileName }.sql.gz`;
  const filePath = `./dumps/${ dumpFileName }`;

  writeLogFile(`Creating new dump file ${ dumpFileName }\n`)

  return await mysqldump({
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    dumpToFile: filePath,
    compressFile: true,
  })
    .then(() => writeLogFile(`New DB dump "${ dumpFileName }" was created successfuly!`))
    .catch(error => {
      const logFilePath = `./logs/${ baseFileName }.error.log`;

      writeLogFile(`Could not create dump "${ dumpFileName }"!`)
      writeLogFile(`The following error occurred:`)
      writeLogFile(`\n   ${ error }\n`)

      fs.unlink(filePath, () => writeLogFile(`Deleted ${ dumpFileName } as the operation was not successfuly completed.`));
      fs.writeFile(
        logFilePath,
        JSON.stringify(error),
        'UTF-8',
        () => writeLogFile(`Saved extended error log file at "${ logFilePath }"`)
      );
    })
};

module.exports = dumpDatabase;
