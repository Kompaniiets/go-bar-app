const controllers = require('../controllers');
const express = require('express');
const passport = require('../utils/passportWrapper');

const router = express.Router();

router.route('/:version/login')
    .get(controllers.callAction('users.test'))
    .post(controllers.callAction('users.login'));

router.route('/:version/signup')
    .post(controllers.callAction('users.signup'));

// Actions available for authorized user with non-confirmed account
router.use(passport.authenticate('bearer', { session: false }));

router.route('/:version/users/me')
    .get(controllers.callAction('users.getProfile'));

module.exports = router;
