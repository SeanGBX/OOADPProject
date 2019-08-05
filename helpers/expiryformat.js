const moment = require('moment');
module.exports = {

    expiryformat: function (category,fooditem, date, id, location,quantity) {
      var currDate = new Date().toLocaleDateString('en-GB');
      var newCurrDate = moment(currDate).format("YYYY/MM/DD");
      var newDate = moment(date).format("YYYY/MM/DD");
      var days = moment(newDate).diff(newCurrDate, 'days');
      var expireDays = Math.abs(days)
      if (location == "fridge"){
        if (days >= 0){
          return 
        }
        else if (days >= -1) {
          return '<li><a id="'+ id +'">' + fooditem + ' x ' + quantity + ' from ' + category +' has expired ' + expireDays + ' day ago' + '<button onclick=\"window.location.href=\'/expiration/fridge/delete/' + id + '\'\" name="delfood" class="btn btn-danger btn-sm" style="float: right;"><strong>X</strong></button></a></li>';
         
        }
        else{
          return '<li><a id="'+ id +'">' + fooditem + ' x ' + quantity + ' from ' + category +' has expired ' + expireDays + ' days ago' + '<button onclick=\"window.location.href=\'/expiration/fridge/delete/' + id + '\'\" name="delfood" class="btn btn-danger btn-sm" style="float: right;"><strong>X</strong></button></a></li>';
        }
      }
      else{
        if (days >= 0){
          return 
        }
        else if (days >= -1) {
          return '<li><a id="'+ id +'">' + fooditem + ' x ' + quantity + ' from ' + category +' has expired ' + expireDays + ' day ago' + '<button onclick=\"window.location.href=\'/expiration/cupboard/delete/' + id + '\'\" name="delfood" class="btn btn-danger btn-sm" style="float: right;"><strong>X</strong></button></a></li>';
        }
        else{
          return '<li><a id="'+ id +'">' + fooditem + ' x ' + quantity + ' from ' + category +' has expired ' + expireDays + ' days ago' + '<button onclick=\"window.location.href=\'/expiration/cupboard/delete/' + id + '\'\" name="delfood" class="btn btn-danger btn-sm" style="float: right;"><strong>X</strong></button></a></li>';
        }
      }
    }
  
  }