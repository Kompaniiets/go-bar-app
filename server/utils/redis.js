const redis = require('redis');
const config = require('./../../config');

let _instance = null;

class Redis {
    constructor() {
        if (!_instance) {
            _instance = redis.createClient({
                host: config.redis.host,
                port: config.redis.port,
                prefix: config.redis.options.prefix,
                retry_strategy(options) {
                    if (options.total_retry_time > 1000 * 60 * 60) {
                        // End reconnecting after a specific timeout and flush all commands with a individual error
                        return new Error('Retry time exhausted');
                    }
                    if (options.times_connected > config.redis.options.max_attempts) {
                        // End reconnecting with built in error
                        return undefined;
                    }
                    // reconnect after
                    return config.redis.options.retry_max_delay;
                },
            });
            _instance.on('reconnecting', (param) => {
                console.warn('Redis connection has not been established. Reconnecting... Attempt: %s ', param.attempt);
                if (param.attempt >= config.redis.options.max_attempts) {
                    console.error('Web server is going to shut down. Disconnecting...');
                    process.exit(1);
                }
            });
            _instance.on('error', (err) => {
                console.error(err);
            });

            _instance.on('connect', () => {});
        }

        return _instance;
    }
}

module.exports = new Redis();
