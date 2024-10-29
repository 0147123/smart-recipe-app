import { Request, Response } from "express";
import { db } from "../configs/databaseClient";

interface Ingredient {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
}

export const getUserIngredientslist = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const ingredients = await db.ingredient_stock.findMany({
      where: {
        u_id: Number(id),
      },
    });
    res.json({ ingredients });
  } catch (error) {
    res.status(400).json({ message: "Failed to get user ingredients." });
  }
}

export const getUserIngredientDetail = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const ingredient = await db.ingredient_stock.findUnique({
      where: {
        is_id: Number(id),
      },
    });
    res.json({ ingredient });
  } catch (error) {
    res.status(400).json({ message: "Failed to get user ingredient." });
  }
}

export const addUserIngredients = async (req: Request, res: Response) => {
  const { email, ingredientId, quantity } = req.body;

  try {
    const user = await db.users.findUnique({
      where: {
        u_email: email,
      },
    });

    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    const ingredient = await db.ingredient_stock.create({
      data: {
        u_id: user.u_id,
        i_id: ingredientId,
        is_quantity: quantity,
        is_unit: "unit", // Add appropriate unit value here
      },
    });

    res.json({ ingredient });
  } catch (error) {
    res.status(400).json({ message: "Failed to add user ingredient." });
  }
}

export const deleteUserIngredient = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await db.ingredient_stock.delete({
      where: {
        is_id: Number(id),
      },
    });
    res.json({ message: "Ingredient deleted." });
  } catch (error) {
    res.status(400).json({ message: "Failed to delete ingredient." });
  }
}

export const updateUserIngredient = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { quantity } = req.body;
  try {
    const ingredient = await db.ingredient_stock.update({
      where: {
        is_id: Number(id),
      },
      data: {
        is_quantity: quantity,
      },
    });
    res.json({ ingredient });
  } catch (error) {
    res.status(400).json({ message: "Failed to update ingredient." });
  }
}

export const getIngredients = async (req: Request, res: Response) => {
  try {
    const ingredients = await db.ingredient.findMany();
    res.json({ ingredients });
  } catch (error) {
    res.status(400).json({ message: "Failed to get ingredients." });
  }
}

export const createIngredient = async (req: Request, res: Response) => {
  const { name, description, image= "" } = req.body;
  try {
    const ingredient = await db.ingredient.create({
      data: {
        i_name: name,
        i_description: description,
        i_image: image,
      },
    });
    res.json({ ingredient });
  } catch (error) {
    res.status(400).json({ message: "Failed to create ingredient." });
  }
}

export const deleteIngredient = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await db.ingredient.delete({
      where: {
        i_id: Number(id),
      },
    });
    res.json({ message: "Ingredient deleted." });
  } catch (error) {
    res.status(400).json({ message: "Failed to delete ingredient." });
  }
}

export const updateIngredient = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, image } = req.body;
  try {
    const ingredient = await db.ingredient.update({
      where: {
        i_id: Number(id),
      },
      data: {
        i_name: name,
        i_description: description,
        i_image: image,
      },
    });
    res.json({ ingredient });
  } catch (error) {
    res.status(400).json({ message: "Failed to update ingredient." });
  }
}