const multer = require("multer")

// disk storage for local
const storageForLocal = multer.diskStorage({
    destination: (req, body, cb) => {
        cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
        console.log("diskstorage main file", file)
        cb(null, Date.now() + "-" + file.originalname)
    }
})

// for server
const storageForServer = multer.memoryStorage();

const upload = multer({storage: storageForServer})

module.exports = upload