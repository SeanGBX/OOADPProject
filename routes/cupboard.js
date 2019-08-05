const express = require('express');
const router = express.Router();
const Cupboard = require('../models/Cupboard');
const FoodDatabase = require('../models/FoodDatabase');
const FoodCategory = require('../models/FoodCategory');
const alertMessage = require('../helpers/messenger'); // Bring in alert messenger
const ensureAuthenticated = require('../helpers/auth');
var sequelize = require("sequelize");
const moment = require('moment');
const Op = sequelize.Op;

router.get('/listcupboard', ensureAuthenticated,(req, res) =>{
	const title = 'Cupboard';
    Cupboard.findAll({
        where: {
            userId: req.user.id
            },
        order: [
            ['expirydate', 'ASC']
        ],
        raw: true
    }).then((cupboards) => {
        Cupboard.findAll({
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
            res.render('cupboard/listcupboard', {
                cupboards: cupboards,
                categories:categories,
                title: title,
            })
        })
    })  .catch(err => console.log(err));
});

router.get('/listcupboard/search', ensureAuthenticated, (req, res) => {
    let { term } = req.query;

    // Make lowercase
    term = term.toLowerCase();
    if (term == ""){
        Cupboard.findAll({
            where: {
                userId: req.user.id
                },
            order: [
                ['expirydate', 'ASC']
            ],
            raw: true
        }).then((cupboards) => {
            Cupboard.findAll({
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
                res.render('cupboard/listcupboard', {
                    cupboards: cupboards,
                    categories:categories,
                })
            })
        })  .catch(err => console.log(err));
    }
    else{
    Cupboard.findAll({
        where: {
            userId: req.user.id,
            fooditem: {
                [Op.like]: '%' + term + '%'
            }},
            order: [
                ['expirydate', 'ASC']
            ],
            raw: true
        }).then((cupboards) => {
            Cupboard.findAll({
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
                    res.render('cupboard/listcupboard', {
                        cupboards: cupboards,
                        categories: categories,
                    })
                })
        }).catch(err => console.log(err));
    }
});

router.get('/listcupboard/sort', ensureAuthenticated, (req, res) => {
    let { term } = req.query;

    if (term == "exp"){
        Cupboard.findAll({
            where: {
                userId: req.user.id
                },
            order: [
                ['expirydate', 'ASC']
            ],
            raw: true
        }).then((cupboards) => {
            Cupboard.findAll({
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
                res.render('cupboard/listcupboard', {
                    cupboards: cupboards,
                    categories:categories,
                })
            })
        })  .catch(err => console.log(err));
    }
    else if(term == "asc"){
        Cupboard.findAll({
            where: {
                userId: req.user.id
                },
            order: [
                ['fooditem', 'ASC']
            ],
            raw: true
        }).then((cupboards) => {
            Cupboard.findAll({
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
                res.render('cupboard/listcupboard', {
                    cupboards: cupboards,
                    categories:categories,
                })
            })
        })  .catch(err => console.log(err));
    }
    else if(term == "desc"){
        Cupboard.findAll({
            where: {
                userId: req.user.id
                },
            order: [
                ['fooditem', 'DESC']
            ],
            raw: true
        }).then((cupboards) => {
            Cupboard.findAll({
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
                res.render('cupboard/listcupboard', {
                    cupboards: cupboards,
                    categories:categories,
                })
            })
        })  .catch(err => console.log(err));
    }
});

router.get('/editcupboard', ensureAuthenticated, (req, res) => {
    const title = 'Cupboard';
    Cupboard.findAll({
        where: {
            userId: req.user.id
            },
        order: [
            ['expirydate', 'ASC']
        ],
        raw: true
    }).then((cupboards) => {
        Cupboard.findAll({
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
            res.render('cupboard/editcupboard', {
                cupboards: cupboards,
                categories:categories,
                title: title,
            })
        })
    })  .catch(err => console.log(err));
});

router.get('/editcupboard/search', ensureAuthenticated, (req, res) => {
    let { term } = req.query;

    // Make lowercase
    term = term.toLowerCase();
    if (term == ""){
        Cupboard.findAll({
            where: {
                userId: req.user.id
                },
            order: [
                ['expirydate', 'ASC']
            ],
            raw: true
        }).then((cupboards) => {
            Cupboard.findAll({
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
                res.render('cupboard/editcupboard', {
                    cupboards: cupboards,
                    categories:categories,
                })
            })
        })  .catch(err => console.log(err));
    }
    else{
    Cupboard.findAll({
        where: {
            userId: req.user.id,
            fooditem: {
                [Op.like]: '%' + term + '%'
            }},
            order: [
                ['expirydate', 'ASC']
            ],
            raw: true
        }).then((cupboards) => {
            Cupboard.findAll({
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
                    res.render('cupboard/editcupboard', {
                        cupboards: cupboards,
                        categories: categories,
                    })
                })
        }).catch(err => console.log(err));
    }
});

router.get('/editcupboard/sort', (req, res) => {
    let { term } = req.query;

    if (term == "exp"){
        Cupboard.findAll({
            where: {
                userId: req.user.id
                },
            order: [
                ['expirydate', 'ASC']
            ],
            raw: true
        }).then((cupboards) => {
            Cupboard.findAll({
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
                res.render('cupboard/editcupboard', {
                    cupboards: cupboards,
                    categories:categories,
                })
            })
        })  .catch(err => console.log(err));
    }
    else if(term == "asc"){
        Cupboard.findAll({
            where: {
                userId: req.user.id
                },
            order: [
                ['fooditem', 'ASC']
            ],
            raw: true
        }).then((cupboards) => {
            Cupboard.findAll({
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
                res.render('cupboard/editcupboard', {
                    cupboards: cupboards,
                    categories:categories,
                })
            })
        })  .catch(err => console.log(err));
    }
    else if(term == "desc"){
        Cupboard.findAll({
            where: {
                userId: req.user.id
                },
            order: [
                ['fooditem', 'DESC']
            ],
            raw: true
        }).then((cupboards) => {
            Cupboard.findAll({
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
                res.render('cupboard/editcupboard', {
                    cupboards: cupboards,
                    categories:categories,
                })
            })
        })  .catch(err => console.log(err));
    }
});

router.get('/editcupboard/delete/:id', ensureAuthenticated, (req, res) => {
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
                    res.redirect('/cupboard/editcupboard'); 
                }).catch(err => console.log(err));
            }
            else{
                alertMessage(res, 'danger', 'Unauthorised access', 'fas fa-exclamation-circle', true);
                req.logout();
                res.redirect('/');
            }
            
    }).catch(err => console.log(err));
});

router.put('/editcupboard/update/:id', ensureAuthenticated, (req, res) => {
    let fooditem = req.body.fooditem
    if (fooditem == ""){{
        fooditem = "Null";
    }}
    Cupboard.update({
        fooditem
	}, {
		where: {
			id: req.params.id
		}
	}).then(() => {
        alertMessage(res, 'success','Entry successfully changed to ' + fooditem , 'fa fa-plus', true);
		res.redirect('/cupboard/editcupboard'); 

	}).catch(err => console.log(err));
});

router.get('/addfood/:category', ensureAuthenticated, (req, res) => {
    const title = 'Cupboard';
    let category = req.params.category;
    FoodDatabase.findAll({
        order: [
            ['fooditem', 'ASC']
        ],
        raw: true
    })
        .then((fooddatabase) => {
            // pass object to listVideos.handlebar
            res.render('cupboard/addfood', {
                fooddatabase: fooddatabase,
                title: title,
                category:category
            });
        })
        .catch(err => console.log(err));
});

router.post('/addfood/:category', ensureAuthenticated, (req, res) =>{
    let fooditem = req.body.food;
    let expirydate = moment(req.body.expirydate, 'DD/MM/YYYY');
    let quantity = req.body.quantity;
    let category = req.params.category;
    let userId = req.user.id;
    if (quantity == ""){
        quantity = 1
    }
    Cupboard.create({
        fooditem,
        expirydate,
        quantity,
        category,
        userId
    }).then((cupboards) => {
        alertMessage(res, 'success', fooditem + ' entry successfully added to ' + category, 'fa fa-plus', true);
        res.redirect('/cupboard/listcupboard');
    })
        .catch(err => console.log(err))
})


router.post('/addfood', ensureAuthenticated, (req, res) =>{
    let fooditem = req.body.fooditem;
    FoodDatabase.create({
        fooditem
    },
    ).then(() => {
        alertMessage(res, 'success', ' Entry successfully added ', 'fa fa-plus', true);
        res.redirect('/cupboard/addcategory' );
    })
        .catch(err => console.log(err))
})

router.get('/addcategory', ensureAuthenticated, (req, res) => {
    const title = 'cupboard';
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
            res.render('cupboard/addcategory', {
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
		res.redirect('/cupboard/editcategory'); 

	}).catch(err => console.log(err));
});


router.get('/editcategory', ensureAuthenticated, (req, res) => {
    const title = 'Cupboard';
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
            res.render('cupboard/editcategory', {
                foodcategory: foodcategory,
                title: title
            });
        })
        .catch(err => console.log(err));
});

router.post('/editcategory', ensureAuthenticated, (req, res) =>{
    let foodcategory = req.body.addcategory;
    let userId = req.user.id;
    FoodCategory.create({
        foodcategory,
        userId
    }).then((cupboards) => {
        res.redirect('/cupboard/editcategory');
    })
        .catch(err => console.log(err))
})


router.get('/editcategory/delete/:id', ensureAuthenticated, (req, res) => {
    let id = req.params.id;
    FoodCategory.findOne({
        where: {
            id: id,
        }
        }).then((cupboards) =>{
            if(cupboards != null){
                FoodCategory.destroy({
                    where: {
                        id: id
                }
                }).then((cupboards) =>{
                    alertMessage(res, 'success', 'Food entry successfully deleted', 'far fa-trash-alt', true);
                    res.redirect('/cupboard/editcategory');
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