import { Request, Response } from "express";
import { db } from "../configs/databaseClient";

interface Ingredient {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
}

export const getUserIngredientslist = async (req: Request, res: Response) => {}

export const getUserIngredient = async (req: Request, res: Response) => {}

export const addUserIngredients = async (req: Request, res: Response) => {}

export const deleteUserIngredient = async (req: Request, res: Response) => {}

export const updateUserIngredient = async (req: Request, res: Response) => {}

export const getIngredients = async (req: Request, res: Response) => {}

export const createIngredient = async (req: Request, res: Response) => {}

export const deleteIngredient = async (req: Request, res: Response) => {}

export const updateIngredient = async (req: Request, res: Response) => {}