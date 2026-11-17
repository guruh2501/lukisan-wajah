import mongoose from "mongoose";
import { PRICING } from "../pricing.js";

const pilihan = (g) => ({ type: String, enum: Object.keys(PRICING[g]), required: true });

const schema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    phone: { type: String, trim: true, maxlength: 20, default: "" },
    bahan: pilihan("bahan"),
    orang: pilihan("orang"),
    badan: pilihan("badan"),
    ukuran: pilihan("ukuran"),
    notes: { type: String, maxlength: 1000, default: "" },
    photos: [String],
    estimate: Number,
    status: { type: String, enum: ["baru", "diproses", "selesai"], default: "baru" },
  },
  { timestamps: true }
);

export default mongoose.model("Order", schema);
