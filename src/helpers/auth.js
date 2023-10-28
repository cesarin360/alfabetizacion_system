 const helpers = {};

 helpers.isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next();
    }
    req.flash('error_msg', 'Inicie sesión para acceder.')
    res.redirect('/users/signin')
 }

 module.exports = helpers;