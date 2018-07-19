const controllers = require('../controllers');
const express = require('express');

const router = express.Router();

router.route('/:version/login')
    .get(controllers.callAction('users.test'))
    .post(controllers.callAction('users.login'));

module.exports = router;
