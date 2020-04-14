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



getNumberMarker(params)
    .then(nbr => console.log("number : " + nbr))
    .catch(err => console.log(err))


function getNumberMarker(param) {
    return new Promise((res, rej) => {
        fetchDataListParts(param)
            .then((data) => {
                if (data.Parts.length % 1000 == 0) {
                    numberMarker = numberMarker + data.Parts.length;
                    param.PartNumberMarker = numberMarker;
                    getNumberMarker(param)
                        .then((numberMarker) => {
                            res(numberMarker);
                        }).catch((err) => {
                            console.log(err);
                            rej(err);
                        });
                } else {
                    //console.log("NumberMarker : " + numberMarker);
                    res(numberMarker);
                }
            }).catch(err => {
                console.log(err);
                rej(err);
            })
    });
}

function fetchDataListParts(Lparam, ParamComplet) {

    return new Promise((res, rej) => {
        s3.listParts(Lparam, (err, data) => {
            if (err) {
                console.log('we cannot fetch lsit parts');
                rej('we cannot fetch list parts');
            } else {
                console.log('fetch data for numberMarker :' + Lparam.PartNumberMarker);
                res(data)
            }
        })
    });


}