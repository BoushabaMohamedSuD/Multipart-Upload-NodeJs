var AWS = require("aws-sdk");

var fs = require('fs');



var s3 = new AWS.S3();


AWS.config.httpOptions.timeout = 0;



let numberMarker = 0;

var params = {
    Bucket: "boushaba-archives",
    Key: "souvenir.rar",
    PartNumberMarker: numberMarker,
    UploadId: "4pzE5UujzcvNPqmRf62RS01e2yZopI50tqXAqQrjD.Nuxbg6fAWEP70s0altHY6uBa4DF_0uP0AG7hWdfuDGQEg2aesFdaEWzzfkNwTlDf2K_H6jzSgSwgTwDniLacE2"
};


/*console.log(params.Bucket);
change(params, "TEST");
console.log(params.Bucket);*/


var paramsComplet = {
    Bucket: params.Bucket,
    Key: params.Key,
    MultipartUpload: {
        Parts: [

        ]
    },
    UploadId: params.UploadId
};

function change(params, Bucket) {
    params.Bucket = Bucket
}


fillParamsComplet(paramsComplet, 0)
    .then((resp) => {
        console.log(resp);
        console.log(paramsComplet.MultipartUpload.Parts.length);
        console.log(paramsComplet.MultipartUpload.Parts[1023]);

    })
    .catch((err) => console.log(err));

function fillParamsComplet(paramsComplet, nbrMarker) {
    return new Promise((resolve, reject) => {
        var paramsLocale = {
            Bucket: params.Bucket,
            Key: params.Key,
            PartNumberMarker: nbrMarker,
            UploadId: params.UploadId
        }
        s3.listParts(paramsLocale, (err, data) => {
            if (err) {
                console.log(err);
                reject(false)
            } else {
                data.Parts.forEach(element => {
                    paramsComplet.MultipartUpload
                        .Parts.push({
                            ETag: element.ETag,
                            PartNumber: element.PartNumber

                        });
                });

                if (data.Parts.length % 1000 == 0) {
                    nbrMarker = nbrMarker + 1000;
                    fillParamsComplet(paramsComplet, nbrMarker)
                        .then(resp => {
                            resolve(resp);
                        })
                        .catch(err => reject(err))

                } else {

                    resolve('end');

                }


                //console.log(paramsComplet.MultipartUpload.Parts[1000]);
            }
        })

    })

    // console.log(params)
    //console.log(paramsComplet);
}
//console.log(params)

