import AWS from 'aws-sdk';

var albumBucketName = 'photo-record-bucket';
var bucketRegion = 'ap-northeast-2';
var IdentityPoolId = 'ap-northeast-2:9b38b403-da06-4a51-818b-9c844de3a508';

AWS.config.update({
  region: bucketRegion,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IdentityPoolId,
  }),
});

var s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: { Bucket: albumBucketName },
});

export function upload(file, progressCallback, resultCallback, basePath) {
  var params = {
    Key: `${
      basePath ? basePath : file.type?.indexOf('video') >= 0 ? 'video' : 'image'
    }/${new Date().getTime()}.${file.name.split('.').slice(-1)}`,
    ContentType: file.type,
    Body: file,
    ACL: 'public-read',
  };
  s3.upload(params)
    .on('httpUploadProgress', function (evt) {
      progressCallback((evt.loaded * 100) / evt.total);
    })
    .send(function (err, data) {
      if (err) {
        throw new Error(err);
      }
      resultCallback(data);
    });
}
