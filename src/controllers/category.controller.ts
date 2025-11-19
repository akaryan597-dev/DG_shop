import { Request, Response } from 'express';
import { CategoryModel } from '../models/category.model';

// Controller: Get Categories with proper name + icon mapping
export const getCategories = async (req: Request, res: Response) => {
  try {
    // Fetch categories from DB
    const categories = await CategoryModel.find();

    // Map categories to include proper icon names for frontend
    const mappedCategories = categories.map(cat => {
      return {
        name: cat.name,
        // Ensure icon property matches frontend iconMap keys
        icon: mapCategoryToIcon(cat.name),
      };
    });

    res.json(mappedCategories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: 'Error fetching categories', error });
  }
};

// Helper function: map category names to icon component names
function mapCategoryToIcon(name: string): string {
  const lower = name.toLowerCase();
  switch (lower) {
    case 'cosmetics': return 'CosmeticIcon';
    case 'vegetables': return 'VegetablesIcon';
    case 'groceries': return 'GroceriesIcon';
    case 'household': return 'HouseholdIcon';
    case 'non-veg': return 'MeatIcon';
    case 'kids': return 'BabyIcon';
    case 'appliances': return 'AppliancesIcon';
    case 'plants': return 'PlantIcon';
    case 'luxury': return 'LuxuryIcon';
    case 'festival': return 'FestivalIcon';
    case 'eco': return 'EcoIcon';
    default: return 'CartIcon'; // fallback icon
  }
}
