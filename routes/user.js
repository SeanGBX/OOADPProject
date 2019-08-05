const express = require('express');
const router = express.Router();
const User = require('../models/User');
const alertMessage = require('../helpers/messenger');
const passport = require('passport');
var bcrypt = require('bcryptjs');
// User register URL using HTTP post => /user/register

router.get('/login', (req, res) => {
    const title = 'Login';
    res.render("user/login", {
        title: title
    })
});
router.get('/register', (req, res) => {
    const title = 'Register';
    res.render("user/register", { title: title })
});

router.post('/register', (req, res) => {
    let errors = [];
    const title = 'Register';
    let { username, email, password, password2, classification } = req.body;
    if (password !== password2) {
        errors.push({
            text: 'Passwords do not match'
        });
    }

    // Checks that password length is more than 4
    if (password.length < 4) {
        errors.push({
            text: 'Password must be at least 4 characters'
        });
    }
    if (errors.length > 0) {
        res.render('user/register', {
            errors,
            username,
            email,
            password,
            password2,
            classification,
            title: title
        });
    } else {
        // If all is well, checks if user is already registered
        User.findOne({ where: { email: req.body.email } })
            .then(user => {
                if (user) {
                    // If user is found, that means email has already been
                    // registered
                    res.render('user/register', {
                        error: user.email + ' already registered',
                        username,
                        email,
                        password,
                        password2,
                        classification,
                        title: title
                    });
                } else {
                    // Create new user record
                    bcrypt.genSalt(10, function (err, salt) {
                        bcrypt.hash(password, salt, function (err, hash) {
                            password = bcrypt.hashSync(password, salt)
                            User.create({ username, email, password })
                                .then(user => {
                                    alertMessage(res, 'success', user.username + ' added.Please login ', 'fas fa - sign - in -alt ', true);
                                    res.redirect('/user/login');
                                })
                                .catch(err => console.log(err));
                        });
                    });
                }
            });
    }
});

router.post('/login', (req, res, next) => {
    const title = 'Login';
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/user/login', // Route to /login URL
        failureFlash: true
        /* Setting the failureFlash option to true instructs Passport to flash an error
        message using the message given by the strategy's verify callback, if any.
        When a failure occur passport passes the message object as error */
    })(req, res, next);
});



module.exports = router;