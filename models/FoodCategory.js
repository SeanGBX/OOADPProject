const Sequelize = require('sequelize');
const db = require('../config/DBConfig');
const FoodCategory= db.define('foodcategory', {
    foodcategory: {
        type: Sequelize.STRING
    },
});
module.exports = FoodCategory;