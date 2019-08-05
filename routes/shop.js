const express = require('express');
const router = express.Router();
const ensureAuthenticated = require('../helpers/auth.js')
const User = require('../models/User');
const fs = require('fs');
const upload = require('../helpers/imageUpload');
const upload2 = require('../helpers/imageUpload');
const mySQLDB = require('../config/DBConfig');
const alertMessage = require('../helpers/messenger')
const moment = require('moment');
const Shop = require('../models/Shop');

// Upload poster
router.post('/upload', ensureAuthenticated, (req, res) => {
    // Creates user id directory for upload if not exist
    // console.log('imhere')
	if (!fs.existsSync('./public/uploads/' )) {
		fs.mkdirSync('./public/uploads/' );
	}

	upload(req, res, (err) => {
		if (err) {
			res.json({
				file: '/images/no-image.jpg',
				err: err
			});
		} else {
			if (req.file === undefined) {
				res.json({
					file: '/images/no-image.jpg',
					err: err
				});
			} else {
				res.json({
					file: `/uploads/${req.file.filename}`
				});
			}
		}
	});
})

// Upload second poster
router.post('/upload2', ensureAuthenticated, (req, res) => {
    // Creates user id directory for upload if not exist
    // console.log('imhere')
	if (!fs.existsSync('./public/uploads2/' )) {
		fs.mkdirSync('./public/uploads2/' );
    }
    // add + req.user.id if fs wants to be exclusive to uploads

	upload2(req, res, (err) => {
		if (err) {
			res.json({
				file: '/images/no-image.jpg',
				err: err
			});
		} else {
			if (req.file === undefined) {
				res.json({
					file: '/images/no-image.jpg',
					err: err
				});
			} else {
				res.json({
					file: `/uploads2/${req.file.filename}`
				});
			}
		}
	});
})

router.get('/addItems', ensureAuthenticated, (req, res) => {
    res.render('./shop/addItems');
})

router.get('/adminShop', ensureAuthenticated, (req, res) => {

    User.findOne({ where: { id: req.user.id } })
        .then(user => {
            Shop.findAll({
                where: {
                    userId: req.user.id
                },
                order: [
                    ['title', 'ASC']
                ],
                raw: true
            })
                .then((shops) => {
                    res.render('shop/adminShop', {
                        shops: shops,
                        user: user
                    });
                })
                .catch(err => console.log(err));
        })


});



router.get('/delete/:id', ensureAuthenticated, (req, res) => {

    let userId = req.user.id;
    let shopId = req.params.id;

    Shop.findOne({
        where: {
            id: shopId,
            userId: userId
        }
    }).then((shop) => {
        if (shop != null) {
            Shop.destroy({
                where: {
                    id: shopId
                }
            }).then((shop) => {
                alertMessage(res, 'info', 'Shop item deleted', 'fas fa-trash-alt', true);
                res.redirect('/shop/adminShop');
            }).catch(err => console.log(err)); // To catch no video ID
        }

        else {
            alertMessage(res, 'danger', 'Unauthorised access to video', 'fas fa-exclamation-circle', true);
            alertMessage(res, 'info', 'AUTO-LOGOUT confirmed', 'fas fa-power-off', true);
            res.redirect('/logout');
        }
    });
});

router.get('/editItems/:id', ensureAuthenticated, (req, res) => {
    Shop.findOne({
        where: {
            id: req.params.id
        }
    }).then((shop) => {
        // checkOptions(shop);
        // call views/shop/editItems.handlebar to render the edit video page
        res.render('shop/editItems', {
            shop // passes video object to handlebar
        });
    }).catch(err => console.log(err)); // To catch no video ID
});




// adds new items
router.post('/addItems', (req, res) => {
    let title = req.body.title;
    let story = req.body.story;
    let link = req.body.link;
    // let logo = req.body.logo;
    // let display = req.user.display;
    let userId = req.user.id;
    let posterURL = req.body.posterURL;
    console.log('====>: posterURL', posterURL)
    let posterURL2 = req.body.posterURL2;
    console.log('====>: posterURL2', posterURL2)
    let likes = 0;
    // Multi-value components return array of strings or undefined
    Shop.create({
        title,
        story,
        link,
        // logo,
        // display,
        userId,
        posterURL,
        posterURL2,
        likes
    }).then((shop) => {
        res.redirect('/shop/adminShop');
    })
        .catch(err => console.log(err))
});

// Save edited item
router.put('/saveEditedItem/:id', (req, res) => {
    let title = req.body.title;
    let story = req.body.story.slice(0, 500);
    let link = req.body.link;
    // let logo = req.body.logo;
    // let display = req.user.display;
    let userId = req.user.id;
    let posterURL = req.body.posterURL;
    let posterURL2 = req.body.posterURL2;
    // Retrieves edited values from req.body
    let likes = req.body.likes;

    console.log(`URL: ${posterURL}`);
    console.log(`URL: ${posterURL2}`);


    Shop.update({
        title,
        story,
        link,
        // logo,
        // display,
        userId,
        posterURL,
        posterURL2,
        likes
        // Set variables here to save to the videos table
    }, {
            where: {
                id: req.params.id
            }
        }).then(() => {
            // After saving, redirect to router.get(/listVideos...) to retrieve all updated
            // videos
            res.redirect('/shop/adminShop');
        }).catch(err => console.log(err));
});



module.exports = router;