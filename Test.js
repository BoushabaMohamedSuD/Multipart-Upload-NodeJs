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
    Bucket: "testboushabamohamed",
    Key: "TestPdf",
    UploadId: "atlQm853bifgbZxY8JeuY7xqbLz1DfHnvuOGHzIUFNzwSYvyfgVlNJvCdvM9pkes9yDhlJkv2kR9WNQovaFwq8jJMHWmOkjDEPGyRu5ukyQon0oSWx2jQ_1PIYlOIl.y"
};

console.log("hello mohamed Test");



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
    if (err) {
        console.log(err, err.stack);
    } else {
        // console.log(data);
        console.log(data.Parts.length)
    }
});

