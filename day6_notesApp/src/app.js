const express = require("express")
const connectToDB = require("./config/db")
const notesRoute = require("./routes/notes.route")

const app = express();

connectToDB();

app.use(express.json())

app.get("/", (req, res) => {
    res.send("ok got it")
})

app.use("/notes", notesRoute)


module.exports = app;