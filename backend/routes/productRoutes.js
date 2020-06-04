import express from "express";
import Product from "../models/productModel"

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const products = await Product.find({});
        res.send(products)
    }
    catch (e) {
        res.status(404).send({msg: "Database error. "});
    }
})

router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findOne({_id: req.params.id});
        if(product){
            res.send(product)
        }
        else {
            res.status(401).send("Product not found. ")
        }
    }
    catch (e) {
        res.status(404).send({msg: "Database error. "});
    }
})

router.post("/", async (req, res) => {
    try {
        const product = new Product({
            name: req.body.name,
            image: req.body.image,
            price: req.body.price,
            brand: req.body.brand,
            category: req.body.category,
            stock: req.body.stock,
            description: req.body.description,
            rating: req.body.rating,
            numberOfReviews: req.body.numberOfReviews,
        });

        const newProduct = await product.save();

        if (newProduct){
            res.send(newProduct)
        }
        else {
            res.status(500).send({msg: "Error in creating new products. "});
        }
    }
    catch (e) {
        res.status(404).send({msg: "Database error. "});
    }
})

router.put("/:id/updateStock", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        let newStock = product.stock - Number(req.body.qty);
        product.stock = newStock;
        const updatedProduct = await product.save();
        if (updatedProduct){
            res.send(updatedProduct)
        }
        else {
            res.status(500).send({msg: "Error in updating product's stock. "});
        }
    }
    catch (e) {
        res.status(404).send({msg: e.message});
    }
})
export default router;
