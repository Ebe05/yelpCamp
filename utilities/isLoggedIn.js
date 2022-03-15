
const isLoggedIn = (req, res, next) => {
    req.session.requestedPath = req.originalUrl
    if (!req.isAuthenticated()) {
        res.redirect('/login')
    }
    else {

        next()
    }

}

module.exports = isLoggedIn