const Sequelize = require('sequelize');
const db = require('../config/DBConfig');
const Cupboard = db.define('cupboard', {
    fooditem: {
        type: Sequelize.STRING
    },
    expirydate: {
        type: Sequelize.DATEONLY
    },
    category: {
        type: Sequelize.STRING
    },
    quantity: {
        type: Sequelize.DECIMAL
    }
});
module.exports = Cupboard;