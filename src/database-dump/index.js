const dotenv = require('dotenv');
const fs = require('fs');
const Logger = require('../logger');
const PostgreSQLDatabaseDump = require('./postgresql-database-dump');
const MySQLDatabaseDump = require('./mysql-database-dump');

dotenv.config();

class DatabaseDump {
  constructor (dbConnectionConf) {
    this.conf = dbConnectionConf;
  }

  get dumpClass () {
    switch (this.conf.DB_TYPE) {
      case 'mysql':
        return MySQLDatabaseDump;

      case 'postgresql':
        return PostgreSQLDatabaseDump;

      default:
        return null;
    }
  }

  get dbConfiguration () {
    return {
      host: this.conf.DB_HOST || process.env.DB_HOST,
      user: this.conf.DB_USER || process.env.DB_USER,
      password: this.conf.DB_PASSWORD || process.env.DB_PASSWORD,
      database: this.conf.DB_NAME || process.env.DB_NAME,
      compressFile: this.conf.COMPRESS_FILE || process.env.COMPRESS_FILE
    };
  }

  async dumpDatabase () {
    const databaseDumper = this.dumpClass;

    if (databaseDumper === null) {
      throw new Error('Invalid database type configuration. Should be "mysql" or "postgresql"');
    }

    return databaseDumper.dump(this.dbConfiguration)
      .then(({ dumpFileName, filePath }) => {
        Logger.success(`New DB dump "${ dumpFileName }" was created successfuly!`);

        return {
          dumpFileName,
          filePath
        };
      })
      .catch(({ error, baseFileName, dumpFileName, filePath }) => {
        Logger.writeErrorLogFile(baseFileName, error);

        Logger.error(`
          \nCould not create dump "${ dumpFileName }"!
          \nThe following error occurred:
          \n   ${ error }\n
        `);

        fs.unlink(
          filePath,
          () => Logger.writeDebugFile(`Deleted ${ dumpFileName } as the operation was not successfuly completed.`)
        );
        return {
          error,
          baseFileName,
          filePath: null,
          dumpFileName: null
        };
      });
  }

};

module.exports = DatabaseDump;