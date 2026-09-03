import app from "./app/app.js"
import { connectToDB } from "./config/db.config.js";

const port = 3000;

connectToDB();

app.listen(port, () => {
    console.log("Server is running on port ", port)
})