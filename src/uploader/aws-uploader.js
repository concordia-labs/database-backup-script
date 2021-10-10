const S3 = require('aws-sdk/clients/s3');
const { awsDefaultSetting } = require('../settings');

const awsClient = new S3(awsDefaultSetting);

exports.uploadFile = (filePath, blob) =>
  awsClient
    .upload({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: filePath,
      Body: blob
    })
    .promise()
    .then(({ Location }) => ({
      uploadedFileUrl: Location
    }))
    .catch(({ message, code }) => {
      throw {
        error: message || code
      };
    });
