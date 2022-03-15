const mongoose = require("mongoose")
const { Schema } = mongoose

//creating reviews model
const reviewSchema = new Schema({
    rating: Number,
    review: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Review = mongoose.model('Review', reviewSchema)

module.exports = Review