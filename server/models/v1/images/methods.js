const createdAtDate = require('../../../helpers/createdAtDate');
const s3upload = require('../../../utils/s3');
const config = require('../../../../config');
const fs = require('fs');

function getBucketFolder(image) {
    return config.s3.bucketFolder + image.url;
}

function unlinkSource(path) {
    let source = path.substr(0, path.lastIndexOf('.'));
    try {
        fs.unlinkSync(source);
        return Promise.resolve();
    } catch (e) {
        return Promise.resolve();
    }
}

module.exports = {
    timestamps: false,
    tableName: 'images',
    hooks: {
        beforeCreate: (image) => {
            image.createdAt = createdAtDate;
            image.updatedAt = createdAtDate;

            const originalSource = config.s3.uploadFolder + image.url;
            const originalDest = getBucketFolder(image);

            return s3upload.handleUpload(originalSource, originalDest)
                .then(() => unlinkSource(originalSource));
        },
        beforeDestroy: (image) => {
            const originalDest = getBucketFolder(image);

            return s3upload.handleDelete(originalDest);
        }
    },
    scopes: {
    },
    classMethods: {},
    defaultScope: {}
};
