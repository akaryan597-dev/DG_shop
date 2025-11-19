
import { Request, Response } from 'express';
import { DirectorModel } from '../models/director.model';

// FIX: Add explicit Request and Response types from express to the controller method.
export const getDirectors = async (req: Request, res: Response) => {
    try {
        const directors = await DirectorModel.find();
        res.json(directors);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching directors', error });
    }
};