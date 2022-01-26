// Requiring express
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Job = require('./models/job');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const passportLocalMongoose = require('passport-local-mongoose');
const flash = require('connect-flash');
const ExpressError = require('./utils/ExpressError');

// Run express.
const app = express();

const sessionOptions = { secret: 'thisisnotagoodsecret', resave: false, saveUninitialized: false }
app.use(session(sessionOptions));
app.use(flash());





mongoose.connect('mongodb://localhost:27017/job-portel',
    {
        useNewUrlParser: true,
        // useCreateIndex: true,
        useUnifiedTopology: true,
        // useFindAndModify: false
    }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Database Connected successfully");
});

// To render ejs files.

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use(passport.initialize());
app.use(session({ secret: 'anything', resave: false, saveUninitialized: false }));
app.use(passport.session());


passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    // console.log(req.session);
    res.locals.currentUser = req.user;
    // console.log(res.locals.currentUser)
    res.locals.messages = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

const userRoutes = require('./routes/users');
const pathRoutes = require('./routes/paths');

app.use('/', userRoutes);
app.use('/', pathRoutes);


app.listen(8080, () => {
    console.log("Serving on port 8080");
})