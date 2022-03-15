const Campground = require("../models/campground.js")

const isAuthorised = async (req, res, next) => {
    let { id } = req.params
    let camp = await Campground.findById(id)
    if (camp.author.equals(req.user._id)) {
        next()
    }
    else {
        req.flash('error', 'No permission')
        res.redirect('/')
    }
}

module.exports = isAuthorised