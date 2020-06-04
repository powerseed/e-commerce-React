import dotenv from "dotenv"
dotenv.config();

export default {
    MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost/e-commerce',
    JWT_SECRET: process.env.JWT_SECRET || "somethingsecret",
    PAPPAL_CLIENT_ID: process.env.PAPPAL_CLIENT_ID || "sb"
}
