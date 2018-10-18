'use strict';

var _ = require('underscore');
var config = require('../Config/config.js');
var s3Config = config.s3aws();
var d = require('domain').create();
var mongoose = require('mongoose');

module.exports = {
    uploadFile: function (request, response) {
        var requestedFileObj = request.file('file');
        var files = requestedFileObj._files;
        var settings = {
            allowedTypes: ['image/jpeg', 'image/png', 'image/jpg'],
            maxBytes: 10 * 1024 * 1024
        };

        if (!requestedFileObj || files.length === 0) {
            return response.status(400).send({ error: 'error.file.upload.empty' });
        }

        var upload = files[0].stream,
            headers = upload.headers,
            byteCount = upload.byteCount;

        d.on('error', function(error) {
            return response.status(500).send({ error: 'Internal Server Error!' });
        });

        d.run(function safelyUpload() {

            requestedFileObj.upload({
                adapter: require('skipper-s3'),
                key: s3Config.AWS_ACCESS_KEY,
                secret: s3Config.AWS_SECRET_KEY,
                bucket: s3Config.S3_BUCKET,
                headers: {
                    'x-amz-acl': 'public-read'
                }
            }, function(err, filesUploaded) {

                var resultArray = [];

                if (err) {
                    return response.status(500).send(err);
                }

                if(filesUploaded.length === 0){
                    return response.status(400).send({ error: 'error.file.upload.empty' });
                }


                _.each(filesUploaded, function(item, index) {


                    var filetype = item.type.split("/");
                    var data = {
                        filetype: filetype[0],
                        srctype: item.type,
                        org_filename: item.filename,
                        location: item.extra.Location,
                        filename: item.fd
                    };

                    response.status(200).send(data);
                });


            });
        });




    }
};

