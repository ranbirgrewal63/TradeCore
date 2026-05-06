import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

// ✅ NOW env is loaded
console.log("Stripe Key:", process.env.STRIPE_SECRET_KEY);

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/payment", paymentRoutes);
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("TradeCore API is running");
});

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});