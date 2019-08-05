const moment = require('moment');

module.exports = {
  editcheckcategory: function (cat1, cat2, fooditem, date, id, quantity) {
    var currDate = new Date().toLocaleDateString('en-GB');
    var newCurrDate = moment(currDate).format("YYYY/MM/DD");
    var newDate = moment(date).format("YYYY/MM/DD");
    var days = moment(newDate).diff(newCurrDate, 'days');
    var expireDays = Math.abs(days)

    if (cat1 == cat2) {
      if (days >= 4) {
        return '<li><a><font data-editable class="editable" id="'+ id +'"style="text-decoration:underline">' + fooditem + '</font> x ' + quantity +' expires in ' + days + ' days' + '<button onclick=\"window.location.href=\'/fridge/editfridge/delete/' + id + '\'\" name="delfood" class="btn btn-danger btn-sm" style="float: right;"><strong>X</strong></button></a></li>';
      }
      else if (days >= 0) {
        return '<li><a><font data-editable class="editable" id="'+ id +'"style="text-decoration:underline">' + fooditem + '</font> x ' + quantity + ' expires in '+ '<font color="darkorange" >' + days + '</font> days' + '<button onclick=\"window.location.href=\'/fridge/editfridge/delete/' + id + '\'\" name="delfood" class="btn btn-danger btn-sm" style="float: right;"><strong>X</strong></button></a></li>';
       
      }
      else if (days >= -1) {
        return '<li><a style="color:red;"><font data-editable class="editable" id="'+ id +'"style="text-decoration:underline">' + fooditem + '</font> x ' + quantity + '</font> has expired ' + expireDays + '</font> day ago' + '<button onclick=\"window.location.href=\'/fridge/editfridge/delete/' + id + '\'\" name="delfood" class="btn btn-danger btn-sm" style="float: right;"><strong>X</strong></button></a></li>';
       
      }
      else {
        return '<li><a style="color:red;"><font data-editable class="editable" id="'+ id +'" style="text-decoration:underline">' + fooditem + '</font> x ' + quantity + ' has expired ' + expireDays + '</font> days ago' + '<button onclick=\"window.location.href=\'/fridge/editfridge/delete/' + id + '\'\" name="delfood" class="btn btn-danger btn-sm" style="float: right;"><strong>X</strong></button></a></li>';
      }
      
    }
    else {
      return
    }
  },
  cupeditcheckcategory: function (cat1, cat2, fooditem, date, id, quantity) {
    var currDate = new Date().toLocaleDateString('en-GB');
    var newCurrDate = moment(currDate).format("YYYY/MM/DD");
    var newDate = moment(date).format("YYYY/MM/DD");
    var days = moment(newDate).diff(newCurrDate, 'days');
    var expireDays = Math.abs(days)

    if (cat1 == cat2) {
      if (days >= 4) {
        return '<li><a><font data-editable class="editable" id="'+ id +'"style="text-decoration:underline">' + fooditem + '</font> x ' + quantity +' expires in ' + days + ' days' + '<button onclick=\"window.location.href=\'/cupboard/editcupboard/delete/' + id + '\'\" name="delfood" class="btn btn-danger btn-sm" style="float: right;"><strong>X</strong></button></a></li>';
      }
      else if (days >= 0) {
        return '<li><a><font data-editable class="editable" id="'+ id +'"style="text-decoration:underline">' + fooditem + '</font> x ' + quantity + ' expires in '+ '<font color="darkorange" >' + days + '</font> days' + '<button onclick=\"window.location.href=\'/cupboard/editcupboard/delete/' + id + '\'\" name="delfood" class="btn btn-danger btn-sm" style="float: right;"><strong>X</strong></button></a></li>';
       
      }
      else if (days >= -1) {
        return '<li><a style="color:red;"><font data-editable class="editable" id="'+ id +'"style="text-decoration:underline">' + fooditem + '</font> x ' + quantity + ' has expired ' + expireDays + '</font> day ago' + '<button onclick=\"window.location.href=\'/cupboard/editcupboard/delete/' + id + '\'\" name="delfood" class="btn btn-danger btn-sm" style="float: right;"><strong>X</strong></button></a></li>';
       
      }
      else {
        return '<li><a style="color:red;"><font data-editable class="editable" id="'+ id +'" style="text-decoration:underline">' +fooditem + '</font> x ' + quantity + ' has expired ' + expireDays + '</font> days ago' + '<button onclick=\"window.location.href=\'/cupboard/editcupboard/delete/' + id + '\'\" name="delfood" class="btn btn-danger btn-sm" style="float: right;"><strong>X</strong></button></a></li>';
      }
      
    }
    else {
      return
    }
  }
}