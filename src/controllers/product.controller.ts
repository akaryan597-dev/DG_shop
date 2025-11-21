import { Request, Response } from "express";
import ProductModel from "../models/product.model"; // ✅ default import

// Get Products
export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { searchQuery, brands, tags, maxPrice, page = 1, limit = 8 } = req.query;
    const query: any = {};

    if (searchQuery) {
      const searchRegex = new RegExp(searchQuery as string, "i");
      query.$or = [{ name: searchRegex }, { category: searchRegex }, { brand: searchRegex }];
    }
    if (brands) {
      query.brand = { $in: Array.isArray(brands) ? brands : [brands] };
    }
    if (tags) {
      query.tags = { $all: Array.isArray(tags) ? tags : [tags] };
    }
    if (maxPrice) {
      query.price = { $lte: Number(maxPrice) };
    }

    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    const products = await ProductModel.find(query).skip(skip).limit(limitNum);
    const total = await ProductModel.countDocuments(query);

    res.json({
      products,
      hasMore: skip + products.length < total,
      total,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

// Get Product By ID
export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await ProductModel.findOne({ id: Number(req.params.id) });
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
};

// Get Products By IDs
export const getProductsByIds = async (req: Request, res: Response): Promise<void> => {
  try {
    const { ids } = req.body as { ids: number[] };
    if (!ids || !Array.isArray(ids)) {
      res.status(400).json({ message: "Invalid product IDs provided" });
      return;
    }
    const products = await ProductModel.find({ id: { $in: ids } });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

// Get Bestsellers
export const getBestsellers = async (req: Request, res: Response): Promise<void> => {
  try {
    const limit = Number(req.query.limit) || 4;
    const products = await ProductModel.find({ tags: "bestseller" }).limit(limit);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bestsellers", error });
  }
};

// Get Related Products
export const getRelatedProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId, category, limit = 4 } = req.query;
    const products = await ProductModel.find({
      category: category as string,
      id: { $ne: Number(productId) },
    }).limit(Number(limit));
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching related products", error });
  }
};

// Search Suggestions
export const searchSuggestions = async (req: Request, res: Response): Promise<void> => {
  try {
    const query = req.query.q as string;
    if (!query || query.length < 2) {
      res.json([]);
      return;
    }
    const products = await ProductModel.find({ name: new RegExp(query, "i") }).limit(5);
    res.json(products.map((p: { name: string }) => p.name));
  } catch (error) {
    res.status(500).json({ message: "Error fetching suggestions", error });
  }
};
