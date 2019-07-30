const Sequelize = require('sequelize');
const db = require('../config/DBConfig');

const Shop = db.define('shop', {
    title: {
        type: Sequelize.STRING
    },
    story: {
        type: Sequelize.STRING(500)
    },
    link: {
        type: Sequelize.STRING
    },
    posterURL: {
        type: Sequelize.STRING(512),
    },
    posterURL2: {
        type: Sequelize.STRING(512),
    }
});

module.exports = Shop;
