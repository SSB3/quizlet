module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        //store the URL they are requesting.
        req.session.returnTo = req.originalUrl;
        console.log(req.session.returnTo);
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
    next();
}