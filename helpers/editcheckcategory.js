const moment = require('moment');

module.exports = {
    editcheckcategory: function (cat1, cat2, fooditem, date, id) {
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
          
          return '<li><a>' + fooditem + daysLeft(date) +'<button onclick=\"window.location.href=\'/fridge/editfridge/delete/' + id + '\'\" name="delfood" class="btn btn-danger btn-sm" style="float: right;"><strong>X</strong></button></a></li>';
        }
        else {
          return 
        }
      }
    
}