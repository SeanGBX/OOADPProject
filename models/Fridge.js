const Sequelize = require('sequelize');
const db = require('../config/DBConfig');
const Fridge = db.define('fridge', {
    fooditem: {
        type: Sequelize.STRING
    },
    expirydate: {
        type: Sequelize.DATEONLY
    },
    category: {
        type: Sequelize.STRING
    }
});
module.exports = Fridge;