require("dotenv").config();
const express = require("express")
const connectToDB = require("./config/db.config")
const postRoutes = require("./routes/post.route")



const app = express();

app.use(express.json())

connectToDB();

app.use("/api/post", postRoutes)

module.exports = app;