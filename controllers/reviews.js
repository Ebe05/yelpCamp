const catchAsync = require('../utilities/catchAsync')
const mongoose = require("mongoose")
const Campground = require("../models/campground.js")
const Review = require('../models/review.js')


module.exports.create = catchAsync(async (req, res, next) => {
    let { id } = req.params
    let camp = await Campground.findById(id).populate()
    let { rating, review } = req.body
    let author = req.user
    let newReview = await Review.create({ rating, review, author })
    camp.reviews.push(newReview)
    camp.save()
    req.flash('success', 'Review successful')
    res.redirect(`/campgrounds/${id}`)
})

module.exports.delete = catchAsync(async (req, res, next) => {
    let { revId, id } = req.params
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: revId } })
    await Review.findByIdAndDelete(revId)
    req.flash('success', 'Review deleted')
    res.redirect(`/campgrounds/${id}`)

})