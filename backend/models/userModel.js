import mongoose from "mongoose"

const shippingSchema = {
    address: {type: String},
    city: {type: String},
    postal: {type: String},
    country: {type: String}
};

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    isAdmin: {type: Boolean, required:true, default: false},
    shipping: shippingSchema,
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
