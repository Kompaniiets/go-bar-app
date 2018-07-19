const SequelizeBase = require('sequelize');
const config = require('./../../config');

const Op = SequelizeBase.Op;
let _instance = null;

class Sequelize {
    constructor() {
        if (!_instance) {
            _instance = new SequelizeBase(config.db.dbname, config.db.user, config.db.password, {
                host: config.db.host,
                dialect: 'mysql',
                pool: {
                    max: config.db.maxConnections,
                    min: 5,
                    idle: config.db.delayBeforeReconnect,
                },
                dialectOptions: {
                    charset: config.db.charset,
                    decimalNumbers: true,
                },
                logging: console.log,
                operatorsAliases: {
                    $eq: Op.eq,
                    $ne: Op.ne,
                    $gte: Op.gte,
                    $gt: Op.gt,
                    $lte: Op.lte,
                    $lt: Op.lt,
                    $not: Op.not,
                    $in: Op.in,
                    $notIn: Op.notIn,
                    $is: Op.is,
                    $like: Op.like,
                    $notLike: Op.notLike,
                    $iLike: Op.iLike,
                    $notILike: Op.notILike,
                    $regexp: Op.regexp,
                    $notRegexp: Op.notRegexp,
                    $between: Op.between,
                    $notBetween: Op.notBetween,
                    $and: Op.and,
                    $or: Op.or,
                    $any: Op.any,
                    $all: Op.all,
                    $values: Op.values,
                    $col: Op.col,
                },
            });

            _instance.Sequelize = SequelizeBase;
        }

        return _instance;
    }
}

module.exports = new Sequelize();
