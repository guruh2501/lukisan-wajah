import { Router } from "express";
import multer from "multer";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Order from "../models/Order.js";
import { estimate } from "../pricing.js";

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "uploads");
fs.mkdirSync(dir, { recursive: true });

const EXT = { "image/jpeg": ".jpg", "image/png": ".png", "image/webp": ".webp" };
const upload = multer({
  storage: multer.diskStorage({
    destination: dir,
    filename: (req, f, cb) => cb(null, crypto.randomUUID() + EXT[f.mimetype]),
  }),
  limits: { fileSize: 8 * 1024 * 1024, files: 5 },
  fileFilter: (req, f, cb) => (EXT[f.mimetype] ? cb(null, true) : cb(new Error("Foto harus JPG, PNG, atau WebP"))),
});

const admin = (req, res, next) =>
  process.env.ADMIN_TOKEN && req.get("x-admin-token") === process.env.ADMIN_TOKEN
    ? next()
    : res.status(401).json({ message: "Tidak diizinkan" });

const router = Router();

// Pelanggan membuat pesanan (multipart: field teks + file "photos")
router.post("/", upload.array("photos", 5), async (req, res, next) => {
  try {
    if (!req.files?.length) throw new Error("Tambahkan minimal 1 foto");
    const { name, phone, bahan, orang, badan, ukuran, notes } = req.body;
    const order = new Order({
      name, phone, bahan, orang, badan, ukuran, notes,
      photos: req.files.map((f) => "/uploads/" + f.filename),
    });
    order.estimate = estimate(order);
    await order.save();
    res.status(201).json({ id: order._id, estimate: order.estimate });
  } catch (e) {
    req.files?.forEach((f) => fs.unlink(f.path, () => {}));
    next(e);
  }
});

// Khusus pelukis (header x-admin-token)
router.get("/", admin, async (req, res) => {
  res.json(await Order.find().sort({ createdAt: -1 }).limit(200));
});

router.patch("/:id/status", admin, async (req, res, next) => {
  try {
    const o = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true, runValidators: true });
    res.json(o);
  } catch (e) {
    next(e);
  }
});

export default router;
