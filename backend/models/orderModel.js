import mongoose from "mongoose"

const shippingSchema = new mongoose.Schema({
    address: {type: String, required: true},
    city: {type: String, required: true},
    postal: {type: String, required: true},
    country: {type: String, required: true},
});

const orderItemSchema = new mongoose.Schema({
    qty: {type: Number, required: true},
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }
})

const paymentSchema = {
    paymentMethod: { type: String, required: true }
};

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    orderItems: [orderItemSchema],
    shipping: shippingSchema,
    payment: paymentSchema,
    total: {type: Number, required: true},
    isPaid: {type: Boolean, required: true, default: false},
    paidAt: {type: Date},
    isDelivered: {type: Boolean, required: true, default: false},
    deliveredAt: {type: Date}
}, {
    timestamps: true
});

const orderModel = mongoose.model("Order", orderSchema);

export default orderModel;
