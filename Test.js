var AWS = require("aws-sdk");

var fs = require('fs');



var s3 = new AWS.S3();

// File
//var fileName = '5.pdf';
var filePath = 'C:\\TestSplit\\';
var Max = 7;
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




MpProcess(params)
    .then((resp) => {
        console.log(resp);

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
                index = data.Parts.length + 1;
                console.log(index);
                if (index == Max) {
                    console.log("!!!!!!!!!!!!!!!! FiNiSh::::");
                    resolve("END :)");
                } else {
                    name = "TestPdf.pdf.00" + index;
                    console.log(name);
                    UploadPart(name)
                        .then((resp) => {
                            console.log("###########  get response ###############");
                            console.log(resp);
                            console.log(name + " has been uplaoded succesfly");
                            MpProcess(params)
                                .then((resp) => {
                                    //console.log(resp);


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



function UploadPart(name) {

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
                    resolve(true);

                } else {
                    console.log("contents is null");
                    reject("content is null");

                }

            }

        });

    });

}


