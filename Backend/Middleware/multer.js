const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/')
    },
    filename: (req, file, cb) => {
        const filName = `${Date.now()}-${file.originalname}`
        cb(null, filName)
    },
})

const upload = multer({ storage: storage })

module.exports = {upload, storage}