const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');


const app = express();

const sessionOptions = { secret: 'thisisnotagoodsecret', resave: false, saveUninitialized: false }
app.use(session(sessionOptions));
app.use(flash());
// const sessionOptions = {
//     secret: 'thisisnotagoodsecret', resave: false, saveUninitialized: false,
//     cookie: {
//         httpOnly: true,
//         expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
//         maxAge: 1000 * 60 * 60 * 24 * 7,
//     }
// }
// app.use(session(sessionOptions));
// app.use(flash());

router.get('/register', (req, res) => {
    res.render('jobs/register');
    req.flash('success', 'Take bhikari!');
})

// router.post('/register', async (req, res) => {
//     const { email, username, password } = req.body;
//     const user = new User({ email, username });
//     const registeredUser = await User.register(user, password);
//     console.log(registeredUser);
//     req.flash('success', 'Welcome to JobInQ');
//     res.redirect('/home');
// })

router.post('/register', catchAsync(async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to JobInQ!');
            res.redirect('/home');
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('register');
    }
}));

router.get('/login', (req, res) => {
    res.render('jobs/login')
})

// router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
//     // req.flash('success', 'welcome back!');
//     // const redirectUrl = req.session.returnTo || '/campgrounds';
//     // delete req.session.returnTo;
//     req.flash('success', 'Successful LogIn');
//     res.redirect('/home');
// })

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
    req.flash('success', 'welcome back!');
    const redirectUrl = req.session.returnTo || '/home';
    delete req.session.returnTo;
    res.redirect(redirectUrl);

})

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', "Goodbye!");
    res.redirect('/home');
})

module.exports = router;

