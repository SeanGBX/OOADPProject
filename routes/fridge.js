const express = require('express');
const router = express.Router();
const Fridge = require('../models/Fridge');
const FoodDatabase = require('../models/FoodDatabase');
const FoodCategory = require('../models/FoodCategory');
const moment = require('moment');
const alertMessage = require('../helpers/messenger'); // Bring in alert messenger


router.get('/listfridge', (req, res) => {
    const title = 'Fridge';
    Fridge.findAll({
        order: [
            ['id', 'DESC']
        ],
        raw: true
    }).then((fridges) => {
        Fridge.aggregate(
            'category',
            'DISTINCT',
            {plain: false },
            {
            order: [
                ['category', 'ASC']
            ],
            raw: true,
            
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

router.get('/editfridge', (req, res) => {
    const title = 'Fridge';
    Fridge.findAll({
        order: [
            ['id', 'DESC']
        ],
        raw: true
    }).then((fridges) => {
        Fridge.aggregate(
            'category',
            'DISTINCT',
            {plain: false },
            {
            order: [
                ['category', 'ASC']
            ],
            raw: true,
            
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

router.get('/editfridge/delete/:id', (req, res) => {
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

router.get('/addfood/:category', (req, res) => {
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

router.post('/addfood/:category', (req, res) =>{
    let fooditem = req.body.food;
    let expirydate= new Date().toLocaleDateString('en-GB');
    let category = req.params.category;
    Fridge.create({
        fooditem,
        expirydate,
        category
    }).then((fridges) => {
        res.redirect('/fridge/listfridge');
    })
        .catch(err => console.log(err))
})

router.get('/addcategory', (req, res) => {
    const title = 'Fridge';
    FoodCategory.findAll({
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

router.get('/editcategory', (req, res) => {
    const title = 'Fridge';
    FoodCategory.findAll({
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

router.post('/editcategory', (req, res) =>{
    let foodcategory = req.body.addcategory;
    FoodCategory.create({
        foodcategory
    }).then((fridges) => {
        res.redirect('/fridge/addcategory');
    })
        .catch(err => console.log(err))
})

router.get('/editcategory/delete/:id', (req, res) => {
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
