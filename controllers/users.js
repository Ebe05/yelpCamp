const User = require('../models/user')
const passport = require("passport")
const catchAsync = require('../utilities/catchAsync')

module.exports.registration = catchAsync(async (req, res, next) => {
    let { email, username, password } = req.body
    let user = new User({ email, username })
    let registeredUser = await User.register(user, password)
    req.login(registeredUser, (err) => {
        if (err) {
            next(err)
        }
        else {
            res.redirect('/campgrounds')
        }
    })
})

module.exports.registrationForm = (req, res, next) => {
    res.render('user/registration')
}

module.exports.loginForm = (req, res, next) => {
    res.render('user/login')
}

module.exports.login = (req, res, next) => {
    res.redirect('/')
}

module.exports.logout = (req, res, next) => {
    req.logout()
    res.redirect('/')
}