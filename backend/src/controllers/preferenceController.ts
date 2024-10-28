import { Request, Response } from "express";
import { db } from "../configs/databaseClient";

interface Ingredient {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
}

// export const getUserIngredientslist = async (req: Request, res: Response) => {}

