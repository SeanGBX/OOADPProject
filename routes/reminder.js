const express = require('express');
const router = express.Router();
const FoodDatabase = require('../models/FoodDatabase');
const FoodCategory = require('../models/FoodCategory')
const ReminderList = require('../models/ReminderList')

router.get('/listreminder', (req, res) => {
	const title = 'reminder';
	ReminderList.findAll({
		order: [
			['id']
		],
		raw: true
	})
		.then((reminderlists) => {
			console.log(reminderlists);

			res.render('reminder/reminder', {

				reminderlists: reminderlists,
				title: title

			});
		})
});
router.get('/newreminder', (req, res) => {
	const title = 'New Reminder';
	FoodDatabase.findAll({
		order: [
			['fooditem', 'ASC']
		],
		raw: true
	})
		.then((fooditem) => {
			FoodCategory.findAll({
				order: [
					['foodcategory', 'ASC']
				],
				raw: true
			})
				.then((foodcategory) => {
					res.render('reminder/NewReminder', {
						FoodDatabase: FoodDatabase,
						title: title,
						foodcategory: foodcategory,
						fooditem: fooditem
					})
				}).catch(err => console.log(err));
		}).catch(err => console.log(err));


});
router.get('/expire', (req, res) => {
	const title = 'expire';
	res.render('reminder/expire', { title: title })
});

router.post('/NewReminder', (req, res) => {
	let date = new Date().toLocaleDateString('en-GB');
	let category = req.body.foodcategory;
	let food = req.body.fooditem;
	let quantity = req.body.measurements;
	ReminderList.create({
		date,
		category,
		food,
		quantity
	}).then((fridges) => {
		res.redirect('/reminder/listreminder');
	})
		.catch(err => console.log(err))
})

router.get('/delete/:id', (req,res)=>{
    let foodID = req.params.id;
    ReminderList.findOne ({
        where:{
            id: foodID
        },
        attributes:['id']
    }).then((ReminderList) => {
        if (ReminderList != null){
            ReminderList.destroy({
                where:{
                    id:foodID
                }
            }).then(()=>
            res.redirect('/reminder/listreminder')
            )
        }
    });
});

router.get('/edit/:id', (req, res) => {
	ReminderList.findOne({
		where: {
			id: req.params.id
		}
	}).then((ReminderList) => {
		FoodDatabase.findAll({
			order: [
				['fooditem', 'ASC']
			],
			raw: true
		}).then((fooddatabases) => {
				FoodCategory.findAll({
					order: [
						['foodcategory', 'ASC']
					],
					raw: true
				})
					.then((foodcategory) => {
						res.render('reminder/edit', {
							ReminderList,
							fooddatabases,
							foodcategory
						});

					})
			});
		});
	});

// Save edited video
router.put('/saveEditedFood/:id', (req, res) => {
	let category = req.body.category
	let food = req.body.food
	let quantity = req.body.quantity
	let date = new Date().toLocaleDateString('en-GB');
	// Retrieves edited values from req.body
	ReminderList.update({
		date,
		category,
		food,
		quantity
		// Set variables here to save to the videos table
	}, {
			where: {
				id: req.params.id
			}
		}).then(() => {
			// After saving, redirect to router.get(/listVideos...) to retrieve all updated
			// videos
			res.redirect('/reminder/listreminder');
			console.log(quantity)
		}).catch(err => console.log(err));
})
module.exports = router; 