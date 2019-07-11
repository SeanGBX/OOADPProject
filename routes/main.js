const express = require('express');
const router = express.Router();
const alertMessage = require('../helpers/messenger');

router.get('/', (req, res) => {
	const title = 'KitchenIuvo';
	res.render('index', {
		title: title,
	}) // renders views/index.handlebars
});


// Logout User
router.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/');
});

module.exports = router;
