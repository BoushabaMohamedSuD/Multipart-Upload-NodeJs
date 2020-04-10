var AWS = require("aws-sdk");

var fs = require('fs');



console.log("uplaod a file")

var s3 = new AWS.S3();

var params = { Bucket: 'bucket', Key: 'key', Body: stream };
s3.upload(params, function (err, data) {
    console.log(err, data);
});