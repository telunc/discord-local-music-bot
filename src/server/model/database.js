const Sequelize = require('sequelize');
const electron = require('electron');
const path = require('path');

let app_path;

if (electron.app) {
    app_path = electron.app.getAppPath();
} else if (electron.remote) {
    app_path = electron.remote.app.getAppPath();
} else {
    app_path = process.cwd();
}

const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    storage: path.join(app_path, 'database.sqlite'),
    operatorsAliases: false
});

const Setting = sequelize.define('setting', {
    prefix: Sequelize.STRING,
    volume: Sequelize.FLOAT,
    embedColor: Sequelize.STRING,
    ytApiKey: Sequelize.STRING,
});

sequelize.sync().then(() => {
    Setting.findOne({where :{id: 1}}).then((result) =>{
        if (!result) {
            Setting.create({ prefix: '?', volume: 100, embedColor: '2989F1', ytApiKey: ''});
        }
    });
});

export { Setting };