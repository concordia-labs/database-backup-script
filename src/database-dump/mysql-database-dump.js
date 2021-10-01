const moment = require('moment');
const mysqldump = require('mysqldump');
const Logger = require('../logger');

class MySQLDatabaseDump {

  static dump ({ host, user, password, database, compressFile }) {
    const baseFileName = `${ database }_${ moment().format('YYYYMMDDHHmmss') }`;
    const dumpFileName = `dump_${ baseFileName }.sql${ compressFile ? '.gz' : '' }`;
    const filePath = `./dumps/${ dumpFileName }`;

    Logger.running(`Creating new MYSQL dump file ${ dumpFileName }\n`);

    return Promise.resolve(
      mysqldump({
        connection: {
          host,
          user,
          password,
          database
        },
        compressFile,
        dumpToFile: filePath
      })
        .then(response => ({
          response,
          baseFileName,
          dumpFileName,
          filePath
        }))
        .catch(error => {
          throw {
            error,
            baseFileName,
            dumpFileName,
            filePath
          };
        })
    );
  }
}

module.exports = MySQLDatabaseDump;
