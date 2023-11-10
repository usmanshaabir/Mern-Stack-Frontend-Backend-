const express = require("express");
const router = express.Router();
const Users = require("../Model/userModel");

// send Data API
router.post("/usersData", async (req, res) => {
    try {
        const userData = new Users({
            name: req.body.name,
            age: req.body.age,
            email: req.body.email,
            password: req.body.password
        });

        // Save the user data to the database
        const datas = await userData.save();

        res.json(datas); // Send a JSON response with the saved user data
    } catch (error) {
        console.error("Message Error:", error);
        res.status(500).send("Internal Server Error"); // Handle the error and send an error response
    }
});

// get data from data base

router.get("/getUserData", async (req, res) => {
    try {
        const getData = await Users.find();
        res.status(200).json(getData)
    }
    catch (error) {
        console.error("Message Error :", error);
        res.status(404).json()
    }
})

// Delete data 
router.delete("/deleteData/:id", async (req, res) => {
    try {
        const userid = req.params.id
        const removeUser = await Users.findByIdAndDelete(userid)

        if (!removeUser) {
            res.status(404).json({ message: "User Not Found" })
        }

        res.status(200).json({ message: "user deleted successfully!" })
    }
    catch (error) {
        console.error("Message Error : ", error)
    }
})

// update user
router.post("/updateuser/:id", async (req, res) => {
    try {
        const userId = req.params.id;
        const updateUser = await Users.findByIdAndUpdate(userId)

        if (!updateUser) {
            res.status(404).json({ message: "User Not found " })
        }

        res.status(200).json({ message: "User update successfully!" })
    }
    catch (error) {
        res.status(500).json({ message: error.message })

    }
})

module.exports = router;
