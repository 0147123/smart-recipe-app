import { Request, Response } from "express";
import { db } from "../configs/databaseClient";

interface Recipe {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
}

export const getUserRecommendRecipes = async (req: Request, res: Response) => {}

export const searchRecipes = async (req: Request, res: Response) => {}

export const getRecipeDetail = async (req: Request, res: Response) => {}

export const getFirstTwentyRecipes = async (req: Request, res: Response) => {


}

export const createRecipe = async (req: Request, res: Response) => {}

export const deleteRecipe = async (req: Request, res: Response) => {}

export const updateRecipe = async (req: Request, res: Response) => {}

export const updateOwnRecipe = async (req: Request, res: Response) => {}