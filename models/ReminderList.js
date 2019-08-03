const Sequelize = require('sequelize');
const db = require('../config/DBConfig');
const ReminderList = db.define('reminderlist', {
    date: {
        type: Sequelize.DATE
    },
    category: {
        type: Sequelize.STRING
    },
    food: {
        type: Sequelize.STRING
    },
    quantity: {
        type: Sequelize.FLOAT
    }
});


module.exports = ReminderList;

