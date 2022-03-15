const express = require("express");
const controls = require('../controllers/campgrounds')
const isLoggedIn = require('../utilities/isLoggedIn');
const isAuthorised = require('../utilities/authorization')
const campValidate = require('../utilities/campValidate')
const { id } = require("../validatorSchemas/campSchema");
const Campground = require("../models/campground");
const multer = require('multer')
const { storage } = require('../cloudinary/cloud');
const upload = multer({ storage })
const router = express.Router()

router.route('/')
    .get(controls.findAll)
    .post(isLoggedIn, upload.array('image', 4), campValidate, controls.create)

router.get('/new', isLoggedIn, controls.createForm)

router.route('/:id')
    .get(controls.read)
    .patch(isLoggedIn, isAuthorised, upload.array('image', 4), campValidate, controls.update)
    .delete(isLoggedIn, isAuthorised, controls.delete)

router.delete('/:id/yelpcamp/:filename', controls.deleteImg)

router.get('/:id/edit', isLoggedIn, isAuthorised, controls.updateForm)

module.exports = router