const express = require('express');
const bodyParser = require('body-parser');
const errorHandler = require('./utils/errorHandler');
const errorFormatter = require('./utils/errorFormatter');
const disallowMethods = require('./utils/methodsHandler');
const requestHandler = require('./utils/requestHandler');
const router = require('./routes');
const cors = require('cors');

// initialize the app
const app = module.exports = express();
app.use(cors());

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.raw({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(requestHandler);
app.use('/api', router.api);

// set up http error handler
app.use(errorFormatter);
app.use(errorHandler);

disallowMethods(router);
