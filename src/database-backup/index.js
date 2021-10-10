const dotenv = require('dotenv');
const fs = require('fs');
const DatabaseDump = require('../database-dump');
const Uploader = require('../uploader');
const Logger = require('../logger');

dotenv.config();

const UploaderInstance = new Uploader();

exports.backupDatabase = ({ dbConfig, backupBasePath }) =>
  new DatabaseDump(dbConfig)
    .dumpDatabase()
    .then(({ dumpFileName: fileName, filePath, baseFileName }) => {
      const fileBuffer = fs.readFileSync(filePath);
      const bucketFilePath = `${ backupBasePath }/${ fileName }`;

      UploaderInstance
        .uploadFile(bucketFilePath, fileBuffer)
        .then(({ uploadedFileUrl }) => {
          Logger.complete(`Uploaded backup file to "${ uploadedFileUrl }"`);

          fs.unlink(
            filePath,
            () => Logger.writeDebugFile(`Deleted ${ fileName } as the file was already uploaded to the storage.`)
          );
        })
        .catch(({ error }) => {
          Logger.writeErrorLogFile(baseFileName, error);

          Logger.error(`
            \nCould not upload database dump "${ fileName }"!
            \nThe following error occurred:
            \n   ${ error }\n
          `);
        });
    });
