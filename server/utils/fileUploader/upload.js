const multer = require('multer');
const config = require('../../../config');
const Errors = require('./../../utils/errors');

const upload = multer({
    dest: config.s3.uploadFolder,

    limits: {
        fileSize: 1024*1024*10
    },
    fileFilter: function (req, file, cb) {
        const validExtensions = ['png', 'jpeg', 'jpg', 'PNG', 'JPEG', 'JPG'];
        const extension = file.originalname.split('.').pop();

        if (validExtensions.indexOf(extension) < 0)
            return cb(Errors.validationError('Invalid file type!'));

        cb(null, true);
    }
});

module.exports = upload.single('image');
