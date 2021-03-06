const mySQLDB = require('./DBConfig');
const user = require('../models/User');
const fridge = require('../models/Fridge')
const cupboard = require('../models/Cupboard');
const fooddatabase = require('../models/FoodDatabase')
const foodcategory = require('../models/FoodCategory')
const reminderlist = require('../models/ReminderList');
const allowance = require('../models/Allowance')
const shop = require('../models/Shop');
// If drop is true, all existing tables are dropped and recreated
const setUpDB = (drop) => {
    mySQLDB.authenticate()
        .then(() => {
            console.log('KitchenIuvo database connected');
        })
        .then(() => {
            user.hasMany(shop);
            user.hasMany(fridge);
            user.hasMany(reminderlist);
            user.hasMany(foodcategory);
            user.hasMany(cupboard);
            user.hasMany(allowance);
            fooddatabase;
            mySQLDB.sync({ // Creates table if none exists
                force: drop
            }).then(() => {
                console.log('Create tables if none exists')
            }).catch(err => console.log(err))
        })
        .catch(err => console.log('Error: ' + err));
};

module.exports = { setUpDB };