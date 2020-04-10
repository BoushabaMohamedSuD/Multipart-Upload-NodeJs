
var AWS = require("aws-sdk");

var fs = require('fs');



var s3 = new AWS.S3();



var filePath = 'C:\\TestSplit\\';
var Max = 7;



var params = {
    Bucket: "boushaba-archives",
    Key: "souvenir.rar",
    UploadId: "QJ5_pr8yVmiE7OHz6rGi.VDMaBQEpXW0C6z1iic3XeHfu8.akrCvIbpdvAOIEKptXbcS1NEXj5pILNLIUt2slZOU4Z0vWytJBko33NGilQDcI4XAUMQZV3nGS5J3_Oi_"
};
console.log("hello mohamed Test");


s3.listParts(params, function (err, data) {
    if (err) {
        console.log(err);
        reject("we cannot list parts");
    } else {
        var paramsComplet = [];
        data.Parts.forEach(element => {
            console.log(element.PartNumber);
            paramsComplet.push({
                Bucket: params.Bucket,
                nbr: element.PartNumber,
            })
        });
        console.log(paramsComplet);
    }
});