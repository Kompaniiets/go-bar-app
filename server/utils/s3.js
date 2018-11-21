const config = require('./../../config');
const AWS = require('aws-sdk');
const fs = require('fs');
let s3;

AWS.config.update(config.s3);
s3 = new AWS.S3();

class S3Upload {

    static handleUpload(source, dest) {
        let resource;
        source = source.substr(0, source.lastIndexOf('.'));
        resource = source;

        if (!source.pipe)
            resource = fs.createReadStream(source);


        return s3.putObject({
            Bucket: config.s3.bucket,
            Key: dest,
            Body: resource,
            ACL: 'public-read'
        }).promise();
    }

    static handleDelete(dest) {

        const params = {
            Bucket: config.s3.bucket, /* required */
            Key: dest /* required */
        };

        return s3.deleteObject(params).promise();
    }
}

module.exports = S3Upload;
