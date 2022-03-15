//accepts async function as an argument

const catchAsync = (func) => {
    return async (req, res, next) => {
        func(req, res, next)
            .catch(e => next(e))
    }
}

module.exports = catchAsync