const mongoose = require("mongoose")

const userAuth = new mongoose.Schema({

    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    token: { type: String }

}, {
    collection: "userAuth",
    versionKey: false
})

const Users = mongoose.model("userAuth", userAuth);

module.exports = Users