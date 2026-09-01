const ImageKit = require("@imagekit/nodejs")

const storageInstace = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
})

const sendFiles = async (file, fileName) => {
    const obj = {
        file,
        fileName,
        folder: "cohort-3"
    }

    return await storageInstace.upload(obj)
}

module.exports = sendFiles;