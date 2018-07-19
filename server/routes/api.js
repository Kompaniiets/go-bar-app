const controllers = require('../controllers');
const express = require('express');

const router = express.Router();

router.route('/:version/test')
    .get(controllers.callAction('users.test'));

module.exports = router;
