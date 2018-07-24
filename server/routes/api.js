const controllers = require('../controllers');
const express = require('express');

const router = express.Router();

router.route('/:version/login')
    .get(controllers.callAction('users.test'))
    .post(controllers.callAction('users.login'));

router.route('/:version/register')
    .post(controllers.callAction('users.register'));

module.exports = router;
