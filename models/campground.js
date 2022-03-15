const Review = require('./review.js')
const mongoose = require("mongoose")
const { Schema } = mongoose
const { cloudinary } = require('../cloudinary/cloud')

//creating campgrounds model
const campgroundSchema = new Schema({
    title: String,
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    images: [{
        url: String,
        filename: String
    }],
    price: Number,
    location: String,
    description: String,
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }
    ],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

campgroundSchema.post('findOneAndDelete', async (camp) => {
    if (camp.reviews.length) {
        await Review.deleteMany({ _id: { $in: camp.reviews } })
    }
    if (camp.images.length) {
        for (image of camp.images) {
            await cloudinary.uploader.destroy(image.filename)
        }

    }
})

const Campground = mongoose.model('Campground', campgroundSchema)

module.exports = Campground

