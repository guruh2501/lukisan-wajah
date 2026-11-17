import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import orders from "./routes/orders.js";

const dir = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());
app.use("/uploads", express.static(path.join(dir, "uploads")));
app.use("/api/orders", orders);

app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(err.status || 400).json({ message: err.message || "Terjadi kesalahan" });
});

await mongoose.connect(process.env.MONGO_URI);
app.listen(process.env.PORT || 5000, () => console.log("Server berjalan di port", process.env.PORT || 5000));
