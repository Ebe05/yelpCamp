const Joi = require('joi')

const reviewSchema = Joi.object({
    rating: Joi.number().required(),
    review: Joi.string().allow('')
})

module.exports = reviewSchema