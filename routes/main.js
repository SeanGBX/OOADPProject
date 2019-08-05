const express = require('express');
const router = express.Router();
const Shop = require('../models/Shop');
const alertMessage = require('../helpers/messenger');
const Fridge = require('../models/Fridge');
const Cupboard = require('../models/Cupboard')
const moment = require('moment');
const ensureAuthenticated = require('../helpers/auth');

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


router.get('/expiration', ensureAuthenticated, (req, res) => {
	Fridge.findAll({
        where: {
            userId: req.user.id
            },
        order: [
            ['fooditem', 'ASC']
        ],
        raw: true
    }).then((fridges) => {
        Cupboard.findAll({
			where: {
				userId: req.user.id
				},
			order: [
				['fooditem', 'ASC']
			],
			raw: true
            
        })
        .then((cupboard) => {
            res.render('expiration', {
                fridges: fridges,
                cupboard:cupboard
            })
        })
    })  .catch(err => console.log(err));
});


router.get('/expiration/fridge/delete/:id', ensureAuthenticated, (req, res) => {
    let id = req.params.id;
    Fridge.findOne({
        where: {
            id: id,
        }
        }).then((fridges) =>{
            if(fridges != null){
                Fridge.destroy({
                    where: {
                        id: id
                }
                }).then((fridges) =>{
                    alertMessage(res, 'success', 'Food entry successfully deleted', 'far fa-trash-alt', true);
                    res.redirect('/expiration');
                }).catch(err => console.log(err));
            }
            else{
                alertMessage(res, 'danger', 'Unauthorised access', 'fas fa-exclamation-circle', true);
                res.redirect('/');
            }
            
    }).catch(err => console.log(err));
});

router.get('/expiration/cupboard/delete/:id', ensureAuthenticated, (req, res) => {
    let id = req.params.id;
    Cupboard.findOne({
        where: {
            id: id,
        }
        }).then((cupboards) =>{
            if(cupboards != null){
                Cupboard.destroy({
                    where: {
                        id: id
                }
                }).then((cupboards) =>{
                    alertMessage(res, 'success', 'Food entry successfully deleted', 'far fa-trash-alt', true);
                    res.redirect('/expiration'); 
                }).catch(err => console.log(err));
            }
            else{
                alertMessage(res, 'danger', 'Unauthorised access', 'fas fa-exclamation-circle', true);
                res.redirect('/');
            }
            
    }).catch(err => console.log(err));
});


router.get('/setExpiration', (req, res) => {
	Fridges.findAll({
		raw: true
	})
		.then(items => {
			//names.forEach((names) =>
			//console.log('All names',JSON.stringify(names,null,2)));
			var fdItems = JSON.stringify(items, null, 2);
			console.log('Fridges: ', fdItems);
			console.log('items: ', items);
			res.render('video/addVideo', { items: items })
		});




});
router.post('/setExpiration', (req, res) => {
	let errors = [];
	let itemName = req.body.newItem;
	let date = req.body.dateRelease;
	let categories = req.body.subtitles;
	let warning = req.body.classification;
	let quantity = req.body.newQuantity;
	console.log(itemName, date, categories, warning, quantity);
	Fridges.create({ name: itemName, expireDate: date, expireDate_string: date, category: categories, warning: warning, quantity: quantity, }).then(name => {
		console.log("auto-generated ID:", name.id);
	});
	res.redirect('/setExpiration');
	/*
	Fridges.create({itemName, date, categories, warning})
	.catch(err => console.log(err));
	res.redirect('/setExpiration');*/


});



module.exports = router;
