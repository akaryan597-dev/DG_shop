import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import { categories, products, reviews, directors } from "./data/seedData";
import fetch from "node-fetch"; // ✅ Explicit import for fetch in Node

dotenv.config();

const app = express();
const PORT: number = Number(process.env.PORT) || 5000;
const ALLOWED_ORIGINS: string[] =
  process.env.ALLOWED_ORIGINS?.split(",") || ["*"];
const MONGO_URI: string = process.env.MONGODB_URI || "";

// =======================
// 1. MongoDB Connection
// =======================
(async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
})();

// =======================
// 2. Middlewares
// =======================
app.use(
  cors({
    origin: ALLOWED_ORIGINS,
    credentials: true,
  })
);
app.use(express.json());

// =======================
// 3. Health Check
// =======================
app.get("/", (req: Request, res: Response): void => {
  res.json({ status: "ok", message: "DG_shop backend running 🚀" });
});

// =======================
// 4. Categories
// =======================
app.get("/api/categories", (req: Request, res: Response): void => {
  res.json(categories);
});

// =======================
// 5. Products
// =======================
app.get("/api/products", (req: Request, res: Response): void => {
  const { category, search, maxPrice } = req.query;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 8;
  const skip = (page - 1) * limit;

  let filtered = [...products];
  if (category && category !== "all") {
    filtered = filtered.filter((p) => p.category === category);
  }
  if (search) {
    filtered = filtered.filter((p) =>
      p.name.toLowerCase().includes((search as string).toLowerCase())
    );
  }
  if (maxPrice) {
    filtered = filtered.filter((p) => p.price <= Number(maxPrice));
  }

  const paginated = filtered.slice(skip, skip + limit);
  res.json({
    products: paginated,
    hasMore: page * limit < filtered.length,
  });
});

app.get("/api/products/:id", (req: Request, res: Response): void => {
  const product = products.find((p) => p.id === Number(req.params.id));
  if (!product) {
    res.status(404).json({ error: "Product not found" });
    return;
  }
  res.json(product);
});

app.get("/api/products/related", (req: Request, res: Response): void => {
  const { productId, category, limit } = req.query;
  let related = products.filter((p) => p.category === category);
  if (productId) {
    related = related.filter((p) => p.id !== Number(productId));
  }
  res.json(related.slice(0, Number(limit) || 4));
});

app.get("/api/products/bestsellers", (req: Request, res: Response): void => {
  const limit = parseInt(req.query.limit as string) || 4;
  const bestsellers = products.filter((p) =>
    (p.tags as string[])?.includes("bestseller")
  );
  res.json(bestsellers.slice(0, limit));
});

app.get("/api/products/by-ids", (req: Request, res: Response): void => {
  try {
    const ids =
      req.query.ids?.toString().split(",").map((id) => Number(id)) || [];
    if (!ids.length) {
      res.json([]);
      return;
    }
    const matched = products.filter((p) => ids.includes(p.id));
    res.json(matched);
  } catch (err) {
    console.error("❌ Error fetching products by IDs:", err);
    res.status(500).json({ error: "Failed to fetch products by IDs" });
  }
});

// =======================
// 6. Reviews
// =======================
app.get("/api/reviews", (req: Request, res: Response): void => {
  const limit = parseInt(req.query.limit as string) || reviews.length;
  res.json(reviews.slice(0, limit));
});

// =======================
// 7. Directors
// =======================
app.get("/api/directors", (req: Request, res: Response): void => {
  res.json(directors);
});

// =======================
// 8. Orders
// =======================
app.post("/api/orders", async (req: Request, res: Response): Promise<void> => {
  try {
    const order = req.body;
    console.log("🛒 New Order Received:", order);

    const message = `
📦 *New Order Received!*
👤 *Customer:* ${order.customer.name}
📧 *Email:* ${order.customer.email}
📍 *Address:* ${order.customer.address}
🛒 *Items:* ${order.products.length}
💰 *Total:* ₹${order.total}
🕒 *Time:* ${new Date().toLocaleString()}
`;

    await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: "Markdown",
        }),
      }
    );

    res.json({ success: true, message: "Order received successfully!", order });
  } catch (err) {
    console.error("❌ Error saving order:", err);
    res.status(500).json({ error: "Failed to save order" });
  }
});

// =======================
// 9. Start Server
// =======================
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
