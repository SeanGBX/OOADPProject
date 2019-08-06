const moment = require('moment');

module.exports = {
    replaceCommas: function(str){
		//console.log('====== Replace ' + str + ' ' + str.length);
		if (str != null || str.length !== 0){
			if (str.trim().length !== 0) {
				// uses pattern-matching string /,/g for ','
				return str.replace(/,/g, ' | ');
			}
		}
		return 'None';
	},
	
	formatDate: function(date, format){
		return moment(date).format(format);
	},

    radioCheck: function(value, radioValue) {
        if (value === radioValue) {
            return "checked";
        }
        return '';
	},
	
	isadmin:function(classification) {
		if (classification == "Admin"){
			return '<li class="nav-item"><a href="/shop/adminShop" class="nav-link">Admin Shop</a></li>'
		}
		else {
			return
		}

	}
};