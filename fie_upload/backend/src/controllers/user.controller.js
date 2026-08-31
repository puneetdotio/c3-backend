
const createController = (req, res) => {
    console.log(req.files)
    console.log(req.body)
}

module.exports = { createController }