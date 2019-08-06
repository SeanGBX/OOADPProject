const moment = require('moment')
module.exports = {

    timeformat: function (date) {
      var newDate = moment(date).format("LL");
    
      
        return newDate
      
    }
  
  }