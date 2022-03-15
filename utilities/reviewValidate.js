const Joi = require('joi')
const reviewSchema = require('../validatorSchemas/reviewSchema.js')

//creating middleware for joi review validation
function reviewValidate(req, res, next) {
    let { error } = reviewSchema.validate(req.body)
    if (error) {
        errMsg = error.details.map(el => el.message).join(',')
        throw new AppError(errMsg, 400)
    }
    else {
        next()
    }
}

module.exports = reviewValidate