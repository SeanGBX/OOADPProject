const moment = require('moment');
module.exports = {

  checkcategory: function (cat1, cat2, fooditem, date) {
    function daysLeft(date) {
      var currDate = new Date().toLocaleDateString('en-GB');
      var newCurrDate = moment(currDate).format("YYYY/MM/DD");
      var newDate = moment(date).format("YYYY/MM/DD");
      var days = moment(newDate).diff(newCurrDate, 'days');
      var expireDays = Math.abs(days)
      if (days >= 0) {
        return " expires in " + days + " days";
      }
      else {
        return " has expired " + expireDays + " days ago"
      }

    }
    if (cat1 == cat2) {
      return '<li><a href="">' + fooditem + daysLeft(date) +'</a></li>';
    }
    else {
      return 
    }
  }

}