var AWS = require("aws-sdk");

var fs = require('fs');



var s3 = new AWS.S3();


AWS.config.httpOptions.timeout = 0;



let numberMarker = 0;

var params = {
    Bucket: "boushaba-archives",
    Key: "souvenir.rar",
    PartNumberMarker: 0,
    UploadId: "4pzE5UujzcvNPqmRf62RS01e2yZopI50tqXAqQrjD.Nuxbg6fAWEP70s0altHY6uBa4DF_0uP0AG7hWdfuDGQEg2aesFdaEWzzfkNwTlDf2K_H6jzSgSwgTwDniLacE2"
};

Test = []

s3.listParts(params, (err, data) => {
    //console.log(data);
    console.log(data.Parts.length);
    data.Parts.forEach(element => {

        Test.push({
            ETag: element.ETag,
            PartNumber: element.PartNumber

        });
    });
    console.log(Test)

})