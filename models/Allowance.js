const Sequelize = require('sequelize');
const db = require('../config/DBConfig');

const allowance = db.define('allowance',{
    allowance: {
        type: Sequelize.DECIMAL
    },
    warning_type:{
        type: Sequelize.STRING
    },
    warning_amt:{
        type: Sequelize.DECIMAL
    },
    warning_mtd:{
        type:Sequelize.STRING
    },
    spending:{
        type: Sequelize.DECIMAL
    }
});

module.exports = allowance;
