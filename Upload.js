var AWS = require("aws-sdk");

var fs = require('fs');



console.log("uplaod a file");

var s3 = new AWS.S3();

name = "TestPdf.pdf.00" + index


fs.readFile('C:\\Users\\mohamed\\Desktop\\SEO\\' + name, function (err, contents) {
    if (err) {
        console.log("error")
        console.log(err)
    } else {
        if (contents != null) {
            console.log(contents)
            //console.log(contents.lenght)
            params = { Bucket: 'testboushabamohamed', Key: name, Body: contents };
            s3.upload(params, function (err, data) {
                if (err) {
                    console.log(err)
                    console.log('error');
                } else {
                    console.log(data)
                    console.log('ok')
                }

            });

        } else {
            console.log("contents is null")
        }

    }

});


