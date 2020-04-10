var AWS = require("aws-sdk");

var fs = require('fs');



var s3 = new AWS.S3();

// File
//var fileName = '5.pdf';
//var filePath = './' + fileName;
//var fileKey = fileName;
//var buffer = fs.readFileSync('./' + filePath);
// S3 Upload options
//var bucket = 'loctest';


var params = {
    Bucket: "boushaba-archives",
    Key: "souvenir.rar",
    UploadId: "QJ5_pr8yVmiE7OHz6rGi.VDMaBQEpXW0C6z1iic3XeHfu8.akrCvIbpdvAOIEKptXbcS1NEXj5pILNLIUt2slZOU4Z0vWytJBko33NGilQDcI4XAUMQZV3nGS5J3_Oi_"
};

console.log("hello mohamed");



AWS.config.getCredentials(function (err) {
    if (err) console.log(err.stack);
    // credentials not loaded
    else {
        console.log("Access key:", AWS.config.credentials.accessKeyId);
        console.log("Secret access key:", AWS.config.credentials.secretAccessKey);
    }
});


console.log("Region: ", AWS.config.region);



s3.listParts(params)

s3.listParts(params, function (err, data) {
    if (err) console.log(err, err.stack);
    else console.log(data);
});
