const express = require("express");
const router = express.Router();
const User = require("../Model/userAuthModel");
const becrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register

router.post("/userRegister", async (req, res) => {
    const hashedPassword = await becrypt.hash(req.body.password, 8)

    const userData = new User({
        email: req.body.email,
        password: hashedPassword
    })
    try {
        const user = await userData.save();
        res.status(201).json({ message: "user registered Successfully!", user })

    } catch (error) {
        res.status(404).json({ message: error.message })
    }

});

// Login

router.post("/userLogin", async (req, res) => {

    const user = await User.findOne({ email: req.body.email });
    console.log("user Finded", user)

    if (!user) {
        return res.status(404).json({ message: "Authentication failed!" })
    }

    const passwordMatch = await becrypt.compare(
        req.body.password,
        user.password
    )

    console.log("password Matced", passwordMatch);

    if (!passwordMatch) {
        return res.status(404).json({ message: "Authentication failed" })
    }
    let token = jwt.sign({ id: user._id, admin: false }, process.env.SECRET_KEY);

    return res.status(200).json({ message: "User Login Successfully!", token })
})

module.exports = router;


