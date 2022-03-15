const Joi = require('joi')
const campSchema = require('../validatorSchemas/campSchema.js')
const AppError = require('../utilities/apperror')

//creating middleware for joi form validation
function campValidate(req, res, next) {
    let { error } = campSchema.validate(req.body)
    if (error) {
        errMsg = error.details.map(el => el.message).join(',')
        throw new AppError(errMsg, 400)
    }
    else {
        next()
    }
}

module.exports = campValidate