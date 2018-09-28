const controllers = require('../controllers');
const express = require('express');
const passport = require('../utils/passportWrapper');

const router = express.Router();

router.route('/:version/login')
    .get(controllers.callAction('users.test'))
    .post(controllers.callAction('users.login'));

router.route('/:version/fb/login')
    .post(controllers.callAction('socials.fbLogin'));

router.route('/:version/signup')
    .post(controllers.callAction('users.signup'));

// Actions available for authorized user with non-confirmed account
router.use(passport.authenticate('bearer', { session: false }));

router.route('/:version/logout')
    .post(controllers.callAction('users.logout'));

router.route('/:version/users/role')
    .patch(controllers.callAction('users.role'));

router.route('/:version/users/me')
    .get(controllers.callAction('users.getProfile'))
    .patch(controllers.callAction('users.updateProfile'));

router.route('/:version/users/locations')
    .get(controllers.callAction('location.getLocation'))
    .post(controllers.callAction('location.addLocation'));

module.exports = router;
