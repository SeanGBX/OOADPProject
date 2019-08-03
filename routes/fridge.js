const express = require('express');
const router = express.Router();
const Fridge = require('../models/Fridge');
const FoodDatabase = require('../models/FoodDatabase');
const FoodCategory = require('../models/FoodCategory');
const alertMessage = require('../helpers/messenger'); // Bring in alert messenger
const ensureAuthenticated = require('../helpers/auth');
var sequelize = require("sequelize");
const Op = sequelize.Op;

router.get('/listfridge', ensureAuthenticated, (req, res) => {
    const title = 'Fridge';
    Fridge.findAll({
        where: {
            userId: req.user.id
            },
        order: [
            ['expirydate', 'ASC']
        ],
        raw: true
    }).then((fridges) => {
        Fridge.findAll({
            where: {
                userId: req.user.id
            },
            attributes: [   
                [sequelize.fn('DISTINCT', sequelize.col('category')), 'DISTINCT'],
                'userId'
            ],
            raw: true
            
        })
        .then((categories) => {
            res.render('fridge/listfridge', {
                fridges: fridges,
                categories:categories,
                title: title,
            })
        })
    })  .catch(err => console.log(err));
});

router.get('/search', (req, res) => {
    let { term } = req.query;

    // Make lowercase
    term = term.toLowerCase();
    if (term == ""){
        Fridge.findAll({
            where: {
                userId: req.user.id
                },
            order: [
                ['expirydate', 'ASC']
            ],
            raw: true
        }).then((fridges) => {
            Fridge.findAll({
                where: {
                    userId: req.user.id
                },
                attributes: [   
                    [sequelize.fn('DISTINCT', sequelize.col('category')), 'DISTINCT'],
                    'userId'
                ],
                raw: true
                
            })
            .then((categories) => {
                res.render('fridge/listfridge', {
                    fridges: fridges,
                    categories:categories,
                })
            })
        })  .catch(err => console.log(err));
    }
    else{
    Fridge.findAll({
        where: {
            userId: req.user.id,
            fooditem: {
                [Op.like]: '%' + term + '%'
            }},
            order: [
                ['expirydate', 'ASC']
            ],
            raw: true
        }).then((fridges) => {
            Fridge.findAll({
                where: {
                    userId: req.user.id,
                    fooditem: {
                        [Op.like]: '%' + term + '%'
                    }
                },
                attributes: [
                    [sequelize.fn('DISTINCT', sequelize.col('category')), 'DISTINCT'],
                    'userId'
                ],
                raw: true

            })
                .then((categories) => {
                    res.render('fridge/listfridge', {
                        fridges: fridges,
                        categories: categories,
                    })
                })
        }).catch(err => console.log(err));
    }
});

router.get('/editfridge', ensureAuthenticated, (req, res) => {
    const title = 'Fridge';
    Fridge.findAll({
        where: {
            userId: req.user.id
            },
        order: [
            ['expirydate', 'ASC']
        ],
        raw: true
    }).then((fridges) => {
        Fridge.findAll({
            where: {
                userId: req.user.id
            },
            attributes: [   
                [sequelize.fn('DISTINCT', sequelize.col('category')), 'DISTINCT'],
                'userId'
            ],
            raw: true
            
        })
        .then((categories) => {
            res.render('fridge/editfridge', {
                fridges: fridges,
                categories:categories,
                title: title,
            })
        })
    })  .catch(err => console.log(err));
});

router.get('/editfridge/delete/:id', ensureAuthenticated, (req, res) => {
    let id = req.params.id;
    Fridge.findOne({
        where: {
            id: id,
        }
        }).then((fridge) =>{
            if(fridge != null){
                Fridge.destroy({
                    where: {
                        id: id
                }
                }).then((fridge) =>{
                    alertMessage(res, 'success', 'Food entry successfully deleted', 'far fa-trash-alt', true);
                    res.redirect('/fridge/editfridge');
                }).catch(err => console.log(err));
            }
            else{
                alertMessage(res, 'danger', 'Unauthorised access', 'fas fa-exclamation-circle', true);
                req.logout();
                res.redirect('/');
            }
            
    }).catch(err => console.log(err));
});

router.put('/editfridge/update/:id', ensureAuthenticated, (req, res) => {
    let fooditem = req.body.fooditem
    if (fooditem == ""){{
        fooditem = "Null";
    }}
    Fridge.update({
        fooditem
	}, {
		where: {
			id: req.params.id
		}
	}).then(() => {
        alertMessage(res, 'success','Entry successfully changed to ' + fooditem , 'fa fa-plus', true);
		res.redirect('/fridge/editfridge'); 

	}).catch(err => console.log(err));
});

router.get('/addfood/:category', ensureAuthenticated, (req, res) => {
    const title = 'Fridge';
    let category = req.params.category;
    FoodDatabase.findAll({
        order: [
            ['fooditem', 'ASC']
        ],
        raw: true
    })
        .then((fooddatabase) => {
            // pass object to listVideos.handlebar
            res.render('fridge/addfood', {
                fooddatabase: fooddatabase,
                title: title,
                category:category
            });
        })
        .catch(err => console.log(err));
});

router.post('/addfood/:category', ensureAuthenticated, (req, res) =>{
    let fooditem = req.body.food;
    let expirydate= new Date().toLocaleDateString('en-GB');
    let category = req.params.category;
    let userId = req.user.id;
    Fridge.create({
        fooditem,
        expirydate,
        category,
        userId
    }).then((fridges) => {
        alertMessage(res, 'success', fooditem + ' entry successfully added to ' + category, 'fa fa-plus', true);
        res.redirect('/fridge/listfridge');
    })
        .catch(err => console.log(err))
})

router.get('/addcategory', ensureAuthenticated, (req, res) => {
    const title = 'Fridge';
    FoodCategory.findAll({
        where:{
            userId: req.user.id
        },
        order: [
            ['foodcategory', 'ASC']
        ],
        raw: true
    })
        .then((foodcategory) => {
            // pass object to listVideos.handlebar
            res.render('fridge/addcategory', {
                foodcategory: foodcategory,
                title: title
            });
        })
        .catch(err => console.log(err));
});

router.get('/editcategory', ensureAuthenticated, (req, res) => {
    const title = 'Fridge';
    FoodCategory.findAll({
        where:{
            userId: req.user.id
        },
        order: [
            ['foodcategory', 'ASC']
        ],
        raw: true
    })
        .then((foodcategory) => {
            // pass object to listVideos.handlebar
            res.render('fridge/editcategory', {
                foodcategory: foodcategory,
                title: title
            });
        })
        .catch(err => console.log(err));
});

router.put('/editcategory/update/:id', ensureAuthenticated, (req, res) => {
    let foodcategory = req.body.foodcategory
    if (foodcategory == ""){{
        foodcategory = "Null";
    }}
    FoodCategory.update({
        foodcategory
	}, {
		where: {
			id: req.params.id
		}
	}).then(() => {
        alertMessage(res, 'success','Entry successfully changed to ' + foodcategory , 'fa fa-plus', true);
		res.redirect('/fridge/editcategory'); 

	}).catch(err => console.log(err));
});

router.post('/editcategory', ensureAuthenticated, (req, res) =>{
    let foodcategory = req.body.addcategory;
    let userId = req.user.id;
    FoodCategory.create({
        foodcategory,
        userId
    }).then((fridges) => {
        res.redirect('/fridge/addcategory');
    })
        .catch(err => console.log(err))
})

router.get('/editcategory/delete/:id', ensureAuthenticated, (req, res) => {
    let id = req.params.id;
    FoodCategory.findOne({
        where: {
            id: id,
        }
        }).then((fridge) =>{
            if(fridge != null){
                FoodCategory.destroy({
                    where: {
                        id: id
                }
                }).then((fridge) =>{
                    alertMessage(res, 'success', 'Food entry successfully deleted', 'far fa-trash-alt', true);
                    res.redirect('/fridge/editcategory');
                }).catch(err => console.log(err));
            }
            else{
                alertMessage(res, 'danger', 'Unauthorised access', 'fas fa-exclamation-circle', true);
                req.logout();
                res.redirect('/');
            }
            
    }).catch(err => console.log(err));
});
module.exports = router;

