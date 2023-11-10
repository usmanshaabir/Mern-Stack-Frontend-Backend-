const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

// Create App
const app = express()

// Cors
app.use(cors())
app.use(express.json());

// Routes
const usersRoutes = require("./Routes/userRoutes")
app.use("/", usersRoutes)
// mongoose Conection

mongoose.connect(process.env.CONECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection;

// scenarios when mongoose not conected

db.on("conection", (error) => {
    console.error("message Error :", error)
})

// scenario when mongoose conected
db.once("open", () => {
    console.log("Mongoose conected successfully!")
    const port = process.env.PORT
    app.listen(port, () => {
        console.log(`server is running on ${port} port`)
    })
})