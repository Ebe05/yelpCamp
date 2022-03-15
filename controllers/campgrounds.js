const mongoose = require("mongoose")
const Campground = require("../models/campground.js")
const Review = require('../models/review')
const flash = require("connect-flash/lib/flash");
const catchAsync = require('../utilities/catchAsync');
const { cloudinary } = require('../cloudinary/cloud')
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocoder = mbxGeocoding({ accessToken: process.env.MAPBOX_TOKEN });
// stylesService exposes listStyles(), createStyle(), getStyle(), etc.


module.exports.findAll = catchAsync(async (req, res, next) => {
    let allCamps = await Campground.find({})
    res.render('campground/allCamps', { allCamps })
})

module.exports.createForm = (req, res, next) => {
    res.render('campground/createCamp')
}

module.exports.create = catchAsync(async (req, res, next) => {
    let { title, price, location, description } = req.body
    let author = req.user._id


    let geoData = await geocoder.forwardGeocode({
        query: location,
        limit: 1
    })
        .send()

    let geometry = geoData.body.features[0].geometry

    //images is an array containing details about image files
    let images = req.files.map((file) => {
        return {
            url: file.path,
            filename: file.filename
        }
    })

    let newCamp = await Campground.create({ title, price, location, description, author, images, geometry })

    //req.flash adds a key value pair in the session
    req.flash('success', 'Campground created!')
    res.redirect('/campgrounds')
})

module.exports.read = catchAsync(async (req, res, next) => {
    let id = req.params.id
    let camp = await Campground.findById(id).populate({
        path: 'reviews',
        populate: { path: 'author' }
    }).populate('author')
    res.render('campground/readCamp', { camp })
})

module.exports.updateForm = catchAsync(async (req, res, next) => {
    let id = req.params.id
    let camp = await Campground.findById(id).populate('reviews')
    res.render('campground/updateCamp', { camp })
})

module.exports.update = catchAsync(async (req, res, next) => {
    let id = req.params.id
    let { title, price, location, description } = req.body
    let camp = await Campground.findByIdAndUpdate(id, { title, price, location, description })

    if (req.files.length !== 0) {
        let images = req.files.map((file) => {
            return {
                url: file.path,
                filename: file.filename
            }
        })
        for (img of images) {
            camp.images.push(img)
        }
        camp.save()
    }
    req.flash('success', 'Edit successful!')
    res.redirect(`/campgrounds/${id}`)
})

module.exports.delete = catchAsync(async (req, res, next) => {
    let id = req.params.id
    await Campground.findByIdAndDelete(id)
    req.flash('success', 'Delete successful')
    res.redirect('/campgrounds')
})

module.exports.deleteImg = catchAsync(async (req, res, next) => {
    let { id, filename } = req.params
    filename = "yelpcamp/".concat(filename)
    await cloudinary.uploader.destroy(filename)
    let camp = await Campground.findByIdAndUpdate(id, { $pull: { images: { filename } } })
    res.redirect(`/campgrounds/${id}/edit`)
})