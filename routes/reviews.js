const express = require("express");
const isLoggedIn = require('../utilities/isLoggedIn')
const reviewValidate = require('../utilities/reviewValidate')
const controls = require('../controllers/reviews')
const router = express.Router({ mergeParams: true })

router.post('/', isLoggedIn, reviewValidate, controls.create)

router.delete('/:revId', isLoggedIn, controls.delete)

module.exports = router