const http = require('http');
const config = require('./config');
const logger = require('./server/utils/logger');
const app = require('./server');

const serverStartCallback = () => {
    logger.log('info', `Web server successfully started at port ${config.server.port}`);
};

http.createServer(app)
    .listen(config.server.port, serverStartCallback);
