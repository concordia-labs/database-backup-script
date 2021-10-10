const dotenv = require('dotenv');
const awsUploader = require('./aws-uploader');

dotenv.config();

class Uploader {

  get uploaderClient () {
    return awsUploader; // TODO: implement code to receive another possible clients
  }

  uploadFile (filePath, blob) {
    return this.uploaderClient.uploadFile(filePath, blob);
  }

};

module.exports = Uploader;