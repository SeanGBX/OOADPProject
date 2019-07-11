const mySQLDB = require('./DBConfig');
const user = require('../models/User');
const fridge = require('../models/Fridge')
const fooddatabase = require('../models/FoodDatabase')
const foodcategory = require('../models/FoodCategory')
// If drop is true, all existing tables are dropped and recreated
const setUpDB = (drop) => {
    mySQLDB.authenticate()
    .then(() => {
    console.log('KitchenIuvo database connected');
    })
    .then(() => {
    user.hasMany(fridge);
    fooddatabase;
    foodcategory;
    mySQLDB.sync({ // Creates table if none exists
    force: drop
    }).then(() => {
    console.log('Create tables if none exists')
    }).catch(err => console.log(err))
    })
    .catch(err => console.log('Error: ' + err));
    };


module.exports = { setUpDB };