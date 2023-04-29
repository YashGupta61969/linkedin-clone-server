const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public')
    },
    filename: (req, file, cb) => {
        const date = new Date().getTime()
        cb(null, `./${date}.jpg`)
    },
})

const upload = multer({ storage }).single('image');

module.exports = upload;