import { Request, Response } from "express";
import DirectorModel from "../models/director.model"; // ✅ default import

// ✅ Get all directors
export const getDirectors = async (req: Request, res: Response): Promise<void> => {
  try {
    const directors = await DirectorModel.find();
    res.status(200).json(directors);
  } catch (error: unknown) {
    res.status(500).json({ message: "Error fetching directors", error });
  }
};

// ✅ Get director by ID
export const getDirectorById = async (req: Request, res: Response): Promise<void> => {
  try {
    const director = await DirectorModel.findById(req.params.id);
    if (!director) {
      res.status(404).json({ message: "Director not found" });
      return;
    }
    res.status(200).json(director);
  } catch (error: unknown) {
    res.status(500).json({ message: "Error fetching director", error });
  }
};

// ✅ Create new director
export const createDirector = async (req: Request, res: Response): Promise<void> => {
  try {
    const newDirector = new DirectorModel(req.body);
    const savedDirector = await newDirector.save();
    res.status(201).json(savedDirector);
  } catch (error: unknown) {
    res.status(400).json({ message: "Error creating director", error });
  }
};

// ✅ Update director
export const updateDirector = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedDirector = await DirectorModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedDirector) {
      res.status(404).json({ message: "Director not found" });
      return;
    }
    res.status(200).json(updatedDirector);
  } catch (error: unknown) {
    res.status(400).json({ message: "Error updating director", error });
  }
};

// ✅ Delete director
export const deleteDirector = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedDirector = await DirectorModel.findByIdAndDelete(req.params.id);
    if (!deletedDirector) {
      res.status(404).json({ message: "Director not found" });
      return;
    }
    res.status(200).json({ message: "Director deleted successfully" });
  } catch (error: unknown) {
    res.status(500).json({ message: "Error deleting director", error });
  }
};
