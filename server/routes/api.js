const controllers = require('../controllers');
const express = require('express');

const router = express.Router();

router.route('/:version/login')
    .get(controllers.callAction('users.test'))
    .post(controllers.callAction('users.login'));

router.route('/:version/signup')
    .post(controllers.callAction('users.signup'));

module.exports = router;
