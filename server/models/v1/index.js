const fs = require('fs');
const path = require('path');
const sequelize = require('./../../utils/sequelize');

let _instance = null;

class Models {
    constructor() {
        if (!_instance) {
            // collect all models from sibling directories
            fs
                .readdirSync(__dirname)
                .filter((file) => {
                    return fs.statSync(path.join(__dirname, file)).isDirectory();
                })
                .forEach((file) => {
                    const pathToModel = path.join(__dirname, file);
                    const methods = require(pathToModel + '/methods');
                    const format = require(pathToModel + '/format');
                    const schema = require(pathToModel + '/schema');

                    const model = sequelize.importCache[path] =
                        sequelize.define(file, schema(sequelize, sequelize.Sequelize), methods);
                    model['format'] = format;

                    this[file] = model;
                });

            this.associateModels();
            this.sequelize = sequelize;
            _instance = this;
        }

        return _instance;
    }

    /**
     * define models associations
     */
    associateModels() {
        this.users.hasOne(this.socials);
        this.locations.hasOne(this.schedules);
        this.locations.belongsTo(this.users, {foreignKey: 'userId', as: 'bar'});
    }
}

module.exports = new Models();
