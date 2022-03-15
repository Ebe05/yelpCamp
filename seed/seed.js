const mongoose = require("mongoose")
const { cities } = require("./cities.js")
const { descriptors, places } = require("./descr.js")
const Campground = require("../models/campground.js");
const Review = require("../models/review.js");

async function main() {
    await mongoose.connect('mongodb://localhost:27017/yelpCamp');
}
main()
    .then(() => { console.log("connected") })
    .catch((e) => { console.log("error", e) })

let rand = (num) => {
    return Math.floor(Math.random() * num + 1)
}

const seedDb = async () => {
    await Campground.deleteMany({})
    await Review.deleteMany({})
    // for (let i = 0; i < 50; i++) {
    //     let { city, state } = cities[rand(999)]
    //     let title = descriptors[rand(descriptors.length - 1)].concat(' ', places[rand(places.length - 1)])
    //     let camp = new Campground({
    //         location: city.concat(', ', state),
    //         title: title,
    //         image: "https://source.unsplash.com/collection/483251",
    //         description: "lorem ipsum",
    //         price: rand(100),
    //         author: "6224a07acb880567a12c949f"
    //     })
    //     camp.save()
    // }
}

seedDb()