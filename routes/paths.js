const express = require('express');
const router = express.Router();
const Job = require('../models/job');
const passport = require('passport');
const User = require('../models/user');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const { isLoggedIn } = require('../middleware');


const app = express();

const sessionOptions = {
    secret: 'thisisnotagoodsecret', resave: false, saveUninitialized: false,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
    }
}
app.use(session(sessionOptions));
app.use(flash());

router.get('/home', (req, res) => {
    res.render('home');
})

router.get('/givetest', (req, res) => {
    // const { id } = req.params;
    // console.log(id);
    res.render('jobs/givetest');
})

router.get('/abc', (req, res) => {
    res.render('jobs/givetest');
})

// router.get('/givetest/:id', isLoggedIn, (req, res) => {
//     const { id } = req.params;
//     // console.log(id);
//     res.render('jobs/givetest', { id });
// })



router.get('/jobs', async (req, res) => {
    const jobList = await Job.find({});
    res.render('jobs/index', { jobList });
})

router.get('/apply', (req, res) => {
    res.render('jobs/apply');
})

router.post('/apply', (req, res) => {
    req.flash('success', 'Applied successfully!');

    res.redirect('home');

})

router.get('/jobs/:id', async (req, res) => {
    const { id } = req.params;
    const job = await Job.findById(id);
    const count = req.query.name;
    console.log(count);
    res.render('jobs/details', { job, id, count });
})

module.exports = router;


