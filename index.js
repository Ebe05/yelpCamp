if (process.env.NODE_ENV !== "production") {
    require('dotenv').config()
}

//importing modules express and mongoose
const express = require("express");
const app = express()
const mongoose = require("mongoose")
const methodOverride = require("method-override")
const path = require("path");
engine = require('ejs-mate')
app.engine('ejs', engine);

//routes
const campgrounds = require('./routes/campgrounds.js')
const reviews = require('./routes/reviews.js')
const users = require('./routes/users.js')

//user model
const User = require('./models/user')

//expresss session and flash messages
const session = require('express-session')
const MongoStore = require('connect-mongo');
const flash = require('connect-flash')

//passport modules for authentication
const passport = require('passport')
const LocalStrategy = require('passport-local');

//setting up method override
app.use(methodOverride('_method'))

//setting path
app.set('views', path.join(__dirname, 'views'))

//setting view engine to ejs
app.set('view engine', 'ejs')

//serving static files
app.use(express.static(path.join(__dirname, 'public')))

//parsing form data
app.use(express.urlencoded({ extended: true }))

//express session configuration 
const dbUrl = process.env.DB_URL
const secret = process.env.SECRET

const sessionConfig =
{
    secret,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: dbUrl,
        touchAfter: 24 * 3600
    })
}

app.use(session(sessionConfig))

//makes flash available for every requests
app.use(flash())

//connecting to mongoose
async function main() {
    await mongoose.connect(dbUrl);
}
main()
    .then(() => { console.log("connected") })
    .catch((e) => { console.log("error", e) })

//configuring passport
app.use(passport.initialize())

//makes sure user login is in session to prevent persistent login
app.use(passport.session())

//passport uses the localstrategy and the function to authenticate 
passport.use(new LocalStrategy(User.authenticate()))

//getting users in and out of session
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


//accessing flash messages in locals
app.use((req, res, next) => {
    res.locals.currentUser = req.user
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    next()
})


//home page
app.get('/', (req, res) => {
    res.render('campground/home')
})

//setting up routes
app.use('/', users)
app.use('/campgrounds', campgrounds)
app.use('/campgrounds/:id/reviews', reviews)

//setting up error handler
app.use((err, req, res, next) => {
    console.log(err)
    const { statusCode = 500, message = 'something went wrong' } = err
    res.status(statusCode).send(message)
})

//setting up server
app.listen(8080, () => {
    console.log("server listening on port 8080")
})
