import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";

import UserProfile from "./Models/userProfileSchema.js";

//connect to express app
const app = express()
const PORT = 5002

//connect to MongoDB
const dbURI = "mongodb+srv://serviceUser:ServiceUser1@cluster0.ptduzzq.mongodb.net/?retryWrites=true&w=majority";
//"mongodb://localhost:27017/user-profile"
mongoose
    .connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port: http://localhost:${PORT} and connected to MongoDb`)
        })
    })
    .catch(error => {
        console.log(`Unable to connect to server or mongodb ${error}`)
    })

//middleware
app.use(bodyParser.json())
app.use(cors())


//routes
app.post("/profile", async (req, res) => {
    try {
        const { userId, firstname, lastname, username, email, bio, } = req.body
        const newUserProfile = new UserProfile({ userId, firstname, lastname, username, email, bio, })

        await newUserProfile.save()
        res.status(201).json({
            message: "User profile created"
        })
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
})



        app.get("/profile", async (req, res) => {
            try {
                const userProfiles = await UserProfile.find()

                res.status(201).json(userProfiles)
            } catch (error) {
                res.status(500).json({ error: "Unable to get user's profiles" })
            }
        })

        app.get("/getOne/:id", async (req, res) => {
            try {
                const user = await UserProfile.findOne({ userId: req.params.id });
                const userResponse = {
                    firstname: user.firstname,
                    lastname: user.lastname,
                    username: user.username,
                    email: user.email,
                    userId: user.userId,
                }
                res.status(201).json(userResponse)
            } catch (error) {
                res.status(500).json({ error: `Unable to get user profile` })
            }
        })

        app.delete("/delete/:id", async (req, res) => {
            try {
                const id = req.params.id;
                const user = await UserProfile.findByIdAndDelete(id)
                res.send(`User with id ${user.id} has been deleted`)
            } catch (error) {
                res.status(500).json({ message: error.message })
            }
        })

        app.patch("/update/:id", async (req, res) => {
            try {
                const id = req.params.id;
                const updatedData = req.body;
                const options = { new: true }

                const result = await UserProfile.findByIdAndUpdate(id, updatedData, options)

                res.send(result)
            } catch (error) {
                res.status(500).json({ message: error.message })
            }
        })
