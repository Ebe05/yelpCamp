const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');


//connecting tp our cloudinary api
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})

//setting up our storage
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'yelpcamp',
        allowedFormats: ['jpeg', 'png', 'jpg']
    }

})

module.exports = {
    cloudinary,
    storage
}