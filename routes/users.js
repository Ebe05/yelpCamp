const express = require("express")
const mongoose = require("mongoose")
const passport = require("passport")
const controls = require('../controllers/users')
const router = express.Router()

//get req to register form
router.get('/register', controls.registrationForm)

//submission of registration
router.post('/register', controls.registration)

//get req to login form
router.get('/login', controls.loginForm)

//logging in a user 
router.post('/login', passport
    .authenticate('local', { failureFlash: true, failureRedirect: '/login' }),
    controls.login)

//logging out a user
router.get('/logout', controls.logout)


module.exports = router
