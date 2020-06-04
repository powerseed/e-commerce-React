import express from "express";
import {isAuth} from "../util"
import Order from "../models/orderModel";

const router = express.Router();

router.post("/", isAuth, async (req, res) => {
    try {
        const order = new Order({
            user: req.user._id,
            orderItems: req.body.orderItems,
            shipping: req.body.shipping,
            payment: req.body.payment,
            total: req.body.total
        })

        const newOrder = await order.save();

        res.send(newOrder);
    }
    catch (e) {
        res.send(e.message);
    }
});

router.get("/:id", isAuth, async (req, res) => {
    const order = await Order.findOne({_id: req.params.id});
    if(order){
        res.send(order);
    }
    else{
        res.status(404).send({msg: "Order not found. "});
    }
});

router.put("/:id/pay", isAuth, async (req, res) => {
    const order = await Order.findById(req.params.id);
    if(order){
        order.isPaid = true;
        order.paidAt = Date.now()
        order.payment = {
            paymentMethod: "paypal",
            paymentResult:{
                payerID: req.body.payerID,
                orderID: req.body.orderID,
                paymentID: req.body.paymentID
            }
        }
        const updatedOrder = await order.save();
        res.send(updatedOrder);
    }
    else{
        res.status(404).send({msg: "Order not found. "});
    }
});

export default router;
