
var AWS = require("aws-sdk");

var fs = require('fs');



var s3 = new AWS.S3();



var filePath = 'C:\\TestSplit\\';
var Max = 7;


var numner = new Number(2000)

var params = {
    Bucket: "boushaba-archives",
    Key: "souvenir.rar",
    UploadId: "4pzE5UujzcvNPqmRf62RS01e2yZopI50tqXAqQrjD.Nuxbg6fAWEP70s0altHY6uBa4DF_0uP0AG7hWdfuDGQEg2aesFdaEWzzfkNwTlDf2K_H6jzSgSwgTwDniLacE2",
    PartNumberMarker: 1000,
    MaxParts: 5,
};



s3.listParts(params, (err, data) => {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
        console.log(data.Parts.length);
    }

})


console.log("hello mohamed Test");

var firstname = "souvenir.rar";
index = 99
console.log(parseInt(index / 100));
if (parseInt(index / 10) == 0) {
    name = firstname + ".00" + index;

} else if (parseInt(index / 10) > 0 && parseInt(index / 10) < 10) {
    name = firstname + ".0" + index;
} else {
    name = firstname + "." + index;
}

console.log(name);


/*
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
});*/