import express from "express";
import path from 'path';
import config from "./config";
import mongoose from "mongoose"
import userRouters from "./routes/userRoutes";
import productRouters from "./routes/productRoutes"
import bodyParser from "body-parser";
import orderRouters from "./routes/orderRoutes"

const mongodb_URL = config.MONGODB_URL

mongoose.connect(mongodb_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).catch(error => console.log(error.reason))

const app = express();
app.use(bodyParser.json());

app.use("/api/users", userRouters);
app.use("/api/products", productRouters);
app.use("/api/orders", orderRouters)
app.get("/api/config/paypal", (req, res) => {
    res.send(config.PAPPAL_CLIENT_ID);
})

app.use(express.static(path.join(__dirname, "/../e-commerce/build")));
app.get("*", (req, res) => res.sendFile(path.join(`${__dirname}/../e-commerce/build/index.html`)));
app.listen(config.PORT)


