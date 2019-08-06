const express = require('express');
const router = express.Router();
const allowance = require('../models/Allowance');
const Fridge = require('../models/Fridge');

router.get('/listexpenditure',(req, res) =>{
	//res.render('expenditure/expenditure');
	allowance.findAll({
		where:{id:1}
	}).then(amount =>{
		var money = parseInt(amount[0].allowance);
		var mtd = amount[0].warning_type;
		var warning_amount = parseInt(amount[0].warning_amt);
		console.log(mtd);
		console.log('allowance:',warning_amount);
		console.log('amount:',money);
		if (mtd === 'FixAmt'){
			res.render('expenditure/expenditure',{money:money,warning_amount:warning_amount})
		}
		if (mtd === 'Percentage'){
			warning_amount = (money / 100) * warning_amount;
			res.render('expenditure/expenditure',{money:money,warning_amount:warning_amount})
		}
		//res.render('expenditure/expenditure',{money:money,warning_amount:warning_amount})
	})
	//res.render('expenditure/expenditure')
});
router.get('/allowance',(req,res) =>{
	allowance.findAll({
		where:{id:1}
	}).then(amount =>{
		var money = parseInt(amount[0].allowance);
		var warning_amount = parseInt(amount[0].warning_amt);
		console.log('allowance:',warning_amount);
		console.log('amount:',money);
		res.render('expenditure/allowance',{money:money,warning_amount:warning_amount})
	});
	//res.render(('expenditure/allowance'))
});

router.post('/allowance',(req,res) =>{
	let errors = [];
	let newAllowance = req.body.newAllowance;
	let allowanceType = req.body.warningType;
	let allowanceMethod = req.body.warningMethod;
	let warningAmt = req.body.warningAmt;
	allowance.findAll({
		raw:true
	})
		.then(money => {
			//names.forEach((names) =>
			//console.log('All names',JSON.stringify(names,null,2)));
			var allowances = JSON.stringify(money, null, 2);
			console.log('money: ', allowances );
			//if (allowances = ){
			allowance.create({allowance:newAllowance, warning_type:allowanceType,warning_mtd:allowanceMethod ,warning_amt:warningAmt,}).then(name => {console.log("auto-generated ID:",name.id);
			});
			//}
			//if (allowances.length > 0){
			allowance.update({allowance:newAllowance, warning_type:allowanceType,warning_mtd:allowanceMethod ,warning_amt:warningAmt,},{where:{id:1}}).then(() => {
				console.log('done');
				//allowance.destroy({where:{id:1}});
			});
			//}
		});
	//allowance.create({allowance:newAllowance, warning_type:allowanceType,warning_mtd:allowanceMethod ,warning_amt:warningAmt,}).then(name => {console.log("auto-generated ID:",name.id);
	//});

});


module.exports = router;