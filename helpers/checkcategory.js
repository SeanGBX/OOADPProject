const moment = require('moment');
module.exports = {

  checkcategory: function (cat1, cat2, fooditem, date) {
    var currDate = new Date().toLocaleDateString('en-GB');
    var newCurrDate = moment(currDate).format("YYYY/MM/DD");
    var newDate = moment(date).format("YYYY/MM/DD");
    var days = moment(newDate).diff(newCurrDate, 'days');
    var expireDays = Math.abs(days)
  
    if (cat1 == cat2) {
      if (days >= 4) {
        return '<li><a>' + fooditem + ' expires in '+ days + ' days</a></li>';
      }
      else if (days >= 0) {
        return '<li><a>' + fooditem + ' expires in '+ '<font color="darkorange">' + days + '</font> days</a></li>';
      }
      else if (days >= -1) {
        return '<li><a>' + fooditem + ' has expired '+ '<font color="red">' + expireDays + '</font> day ago</a></li>';
      }
      else {
        return '<li><a>' + fooditem + ' has expired '+ '<font color="red">' + expireDays + '</font> days ago</a></li>';
      }


    }
    else {
      return
    }
  }

}