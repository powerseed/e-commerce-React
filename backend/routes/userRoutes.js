import express from "express";
import User from "../models/userModel"
import {getToken} from "../util";
import Order from "../models/orderModel"

const router = express.Router();

router.get("/createAdmin", async (req, res) => {
    try {
        const user = new User({
            name: "powerseed",
            email: "powerseed5044@gmail.com",
            password: "11111111",
            isAdmin: true
        })

        const newUser = await user.save();
        res.send(newUser);
    }
    catch (e) {
        res.send({msg: e.message})
    }
});

router.post("/signin", async (req, res) => {
    try {
        const user = await User.findOne({
            email: req.body.email,
            password: req.body.password
        });

        if (user){
            res.send({
                _id: user.id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: getToken(user)
            })
        }
        else {
            res.status(401).send({msg: "Invalid email or password"});
        }
    }
    catch (e) {
        res.status(404).send("Database error. ");
    }
})

router.post("/register", async (req, res) => {
    try {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        const newUser = await user.save();
        if (newUser){
            res.send({
                _id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                isAdmin: newUser.isAdmin,
                token: getToken(newUser)
            })
        }
        else {
            res.status(401).send({msg: "Invalid user data. "});
        }
    }
    catch (e) {
        res.status(404).send({msg: "Database error. "});
    }
})

router.put("/:id/addShipping", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        user.shipping = {
            address: req.body.address,
            city: req.body.city,
            postal: req.body.postal,
            country: req.body.country
        }

        const updatedUser = await user.save();

        res.send(updatedUser)
    }
    catch (e) {
        res.status(404).send({msg: "Error occurred when adding shipping to user. "})
    }
})

router.put("/:id/updateProfile", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        console.log(user)
        user.name = req.body.name;
        user.email = req.body.email;
        user.password = req.body.password;

        const updatedUser = await user.save();

        res.send(updatedUser)
    }
    catch (e) {
        res.status(404).send({msg: "Error occurred when updating user profile. "})
    }
})

router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.send(user);
    }
    catch (e) {
        res.status(404).send({msg: "Error occurred when get a user. "})
    }
})

router.get("/:id/getOrders", async (req, res) => {
    try {
        const orders = await Order.find({
            user: req.params.id
        });
        res.send(orders);
    }
    catch (e) {
        res.status(404).send({msg: "Error occurred when get a user. "})
    }
})

export default router;
