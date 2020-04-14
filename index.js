var AWS = require("aws-sdk");

var fs = require('fs');



var s3 = new AWS.S3();


AWS.config.httpOptions.timeout = 0;

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

/***************       those variables should be changed every time you change the large file wanted  */
var firstname = "souvenir.rar";
var filePath = 'C:\\Souvenir-Split\\';

// how many files in the folder +1
var Max = 2837;
let numberMarker = 0;

var params = {
    Bucket: "boushaba-archives",
    Key: "souvenir.rar",
    PartNumberMarker: numberMarker,
    UploadId: "4pzE5UujzcvNPqmRf62RS01e2yZopI50tqXAqQrjD.Nuxbg6fAWEP70s0altHY6uBa4DF_0uP0AG7hWdfuDGQEg2aesFdaEWzzfkNwTlDf2K_H6jzSgSwgTwDniLacE2"
};



//---------------------------------------------------------------------------


console.log("hello mohamed Example");



AWS.config.getCredentials(function (err) {
    if (err) console.log(err.stack);
    // credentials not loaded
    else {
        console.log("Access key:", AWS.config.credentials.accessKeyId);
        console.log("Secret access key:", AWS.config.credentials.secretAccessKey);
        console.log("region: ", AWS.config.region);
    }
});







MpProcess(params)
    .then((resp) => {
        console.log(resp);
        if (resp == "END :)") {

            // code to complet multipart uplaod
            CompleteMultipartUpload()
                .then(resp => {
                    console.log(resp)
                })
                .catch(err => {
                    console.log(err)
                });


            //********************** */

        } else {
            console.log("resp in not END !!!!!!!!!!");
            console.log("it should be problem there you 'v to fix it");
        }

    })
    .catch((err) => {
        console.log(err);
    })






function MpProcess(params) {
    return new Promise((resolve, reject) => {
        s3.listParts(params, function (err, data) {
            if (err) {
                console.log(err, err.stack);
                reject("we cannot list parts uplaoded");
            } else {
                // console.log(data);
                index = data.Parts.length + 1 + numberMarker;


                console.log(index);
                if (index == Max) {
                    console.log("!!!!!!!!!!!!!!!! FiNiSh::::");
                    resolve("END :)");
                } else {

                    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

                    if (parseInt(index / 10) == 0) {
                        name = firstname + ".00" + index;
                    } else if (parseInt(index / 10) > 0 && parseInt(index / 10) < 10) {
                        name = firstname + ".0" + index;
                    } else {
                        name = firstname + "." + index;
                    }

                    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                    console.log(name);

                    UploadPart(name, index)
                        .then((resp) => {
                            console.log("###########  get response ###############");
                            console.log(resp);
                            console.log(name + " has been uplaoded succesfly");
                            MpProcess(params)
                                .then((resp) => {
                                    //console.log(resp);

                                    if (index == 1000) {
                                        numberMarker == index
                                    } else if (index == 2000) {
                                        numberMarker == index
                                    } else if (index == 3000) {
                                        numberMarker == index
                                    }

                                    resolve(resp);


                                })
                                .catch((err) => {
                                    console.log(err);
                                    reject("error on mp process : " + name)
                                })

                        })
                        .catch((err) => {
                            console.log("###########  get error ###############");
                            console.log(err);
                        })

                }

            }
        });


    });
}



function UploadPart(name, index) {

    return new Promise((resolve, reject) => {


        fs.readFile(filePath + name, function (err, contents) {
            if (err) {
                console.log("error");
                console.log(err);
                reject("error on reading file");
            } else {
                if (contents != null) {
                    console.log(name)
                    console.log(contents);

                    //code her ...... uplaod parts 
                    var paramsPart = {
                        Body: contents,
                        Bucket: params.Bucket,
                        Key: params.Key,
                        PartNumber: index,
                        UploadId: params.UploadId
                    };
                    s3.uploadPart(paramsPart, function (err, data) {
                        if (err) {
                            console.log(err, err.stack);
                            reject(false);
                        }
                        else {
                            console.log(data);
                            resolve(true)
                        }

                    });


                    //********************** */




                } else {
                    console.log("contents is null");
                    reject("content is null");

                }

            }

        });

    });

}

function CompleteMultipartUpload() {
    console.log("...... complet Part Uplaod ..............");
    return new Promise((resolve, reject) => {

        var paramsComplet = {
            Bucket: params.Bucket,
            Key: params.Key,
            MultipartUpload: {
                Parts: [

                ]
            },
            UploadId: params.UploadId
        };

        s3.listParts(params, function (err, data) {
            if (err) {
                console.log(err);
                reject("we cannot list parts");
            } else {
                data.Parts.forEach(element => {
                    paramsComplet.MultipartUpload
                        .Parts.push({
                            ETag: element.ETag,
                            PartNumber: element.PartNumber

                        });
                });

                console.log(paramsComplet);
                console.log(paramsComplet.MultipartUpload.Parts);

                s3.completeMultipartUpload(paramsComplet, function (err, data) {
                    if (err) {
                        console.log(err, err.stack);
                        reject("cannot complet MultipartUplaod");
                    }
                    else {
                        console.log(data);
                        resolve('nice work :)');
                    }

                });
            }
        });


    });

}


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





