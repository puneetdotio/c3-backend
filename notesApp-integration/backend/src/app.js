require("dotenv").config();

const express = require("express")
const connectToDB = require("./config/db")
const notesRoutes = require("./routes/notes.routes")
const cors = require("cors")

const app = express();

app.use(cors({
    origin: "http://localhost:5173"
}))

connectToDB();

app.use(express.json())

app.use("/notes", notesRoutes)

module.exports = app;