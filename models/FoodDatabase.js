const Sequelize = require('sequelize');
const db = require('../config/DBConfig');
const FoodDatabase = db.define('fooddatabase', {
    fooditem: {
        type: Sequelize.STRING
    },
});
module.exports = FoodDatabase;