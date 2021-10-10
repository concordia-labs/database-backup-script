module.exports.awsDefaultSetting = {
  endpoint: process.env.AWS_ALT_ENDPOINT,
  credentials: {
    accessKeyId: process.env.AWS_ALT_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_ALT_SECRET_ACCESS_KEY
  }
};
