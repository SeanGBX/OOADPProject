const express = require('express');
const router = express.Router();
const Shop = require('../models/Shop');
const alertMessage = require('../helpers/messenger');

router.get('/', (req, res) => {
	const title = 'KitchenIuvo';
	res.render('index2', {
		title: title,
	}) // renders views/index.handlebars
});


// Logout User
router.get('/logout', (req, res) => {
	req.logout();
	alertMessage(res, 'info', 'LOG OFF', 'fas fa-power-off', true);
	res.redirect('/');
});

router.get('/shop', (req, res) => {
	const title = 'KitchenNiuvo | Shop';
		Shop.findAll({
			
			raw: true
		})
			.then((shops) => {
				res.render('./shop/shop', {
					shops: shops,
				});
			})
			.catch(err => console.log(err));
});


module.exports = router;