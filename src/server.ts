import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import { CategoryModel } from './models/category.model';
import { ProductModel } from './models/product.model';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGODB_URI || '';

app.use(cors());
app.use(express.json());

// ✅ Categories route
app.get('/categories', async (req, res) => {
  try {
    const categories = await CategoryModel.find({});
    res.json(categories);
  } catch (error) {
    console.error("❌ Error fetching categories:", error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// ✅ Products route with category + pagination + search + price filter
app.get('/products', async (req, res) => {
  try {
    const { category, search, maxPrice } = req.query;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 8;
    const skip = (page - 1) * limit;

    const query: any = {};
    if (category && category !== "all") query.category = category;
    if (search) query.name = { $regex: search, $options: 'i' };
    if (maxPrice) query.price = { $lte: Number(maxPrice) };

    const products = await ProductModel.find(query).skip(skip).limit(limit);
    const total = await ProductModel.countDocuments(query);

    res.json({
      products,
      hasMore: page * limit < total
    });
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// ✅ Single product by ID (safe check)
app.get('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Check if id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid product id' });
    }

    const product = await ProductModel.findById(id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    res.json(product);
  } catch (error) {
    console.error("❌ Error fetching product:", error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// ✅ Related products by category (safe check)
app.get('/products/related', async (req, res) => {
  try {
    const { productId, category, limit } = req.query;
    const query: any = {};

    if (category) query.category = category;

    if (productId && mongoose.Types.ObjectId.isValid(productId as string)) {
      query._id = { $ne: productId };
    }

    const products = await ProductModel.find(query).limit(parseInt(limit as string) || 4);
    res.json(products);
  } catch (error) {
    console.error("❌ Error fetching related products:", error);
    res.status(500).json({ error: 'Failed to fetch related products' });
  }
});

// ✅ Bestsellers route
app.get('/products/bestsellers', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit as string) || 4;
    const products = await ProductModel.find({ bestseller: true }).limit(limit);
    res.json(products);
  } catch (error) {
    console.error("❌ Error fetching bestsellers:", error);
    res.status(500).json({ error: 'Failed to fetch bestsellers' });
  }
});

// ✅ Reviews placeholder
app.get('/reviews', async (req, res) => {
  try {
    res.json([
      { id: 1, author: "Ravi Kumar", rating: 5, comment: "Bahut hi badhiya products aur fast delivery!", date: "2025-11-18", image: "https://picsum.photos/100?random=21" },
      { id: 2, author: "Neha Singh", rating: 4, comment: "Quality achhi hai, price bhi sahi hai.", date: "2025-11-17", image: "https://picsum.photos/100?random=22" },
      { id: 3, author: "Amit Verma", rating: 5, comment: "Patna mein aisa premium supermarket pehli baar dekha!", date: "2025-04-16", image: "https://picsum.photos/100?random=23" },
      { id: 4, author: "Priya Jha", rating: 4, comment: "Vegetables fresh aur organic milte hain.", date: "2025-11-15", image: "https://picsum.photos/100?random=24" },
      { id: 5, author: "Saurabh Mishra", rating: 5, comment: "Kadaknath chicken ekdum asli aur tasty tha!", date: "2025-10-14", image: "https://picsum.photos/100?random=25" },
      { id: 6, author: "Anjali Sharma", rating: 5, comment: "Delivery time par hui aur packaging bhi classy thi.", date: "2025-09-13", image: "https://picsum.photos/100?random=26" },
      { id: 7, author: "Rahul Yadav", rating: 4, comment: "Prices affordable hain aur quality bhi maintain hai.", date: "2025-11-12", image: "https://picsum.photos/100?random=27" },
      { id: 8, author: "Sneha Kumari", rating: 5, comment: "Customer support chatbot helpful hai checkout mein.", date: "2025-11-11", image: "https://picsum.photos/100?random=28" },
      { id: 9, author: "Vikash Gupta", rating: 4, comment: "Festival theme mode ekdum mast lagta hai shopping ke time.", date: "2025-05-10", image: "https://picsum.photos/100?random=29" },
      { id: 10, author: "Shalini Raj", rating: 5, comment: "DG_shop ka tagline ‘Patna se Patna ke liye’ dil ko chhoo gaya.", date: "2025-02-09", image: "https://picsum.photos/100?random=30" }
    ]);
  } catch (error) {
    console.error("❌ Error fetching reviews:", error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// ✅ Connect to MongoDB and start server
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error);
  });
