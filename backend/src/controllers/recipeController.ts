import { Request, Response } from "express";
import { db } from "../configs/databaseClient";
import { Recipe } from "../models/recipe";

export const getUserRecommendRecipes = async (req: Request, res: Response) => {
  const { email } = req.params;
  try {
    const user = await db.users.findUniqueOrThrow({
      where: {
        u_email: email,
      },
      // include: {
      //   Users_preference: true,
      // },
    });

    const userIngredients = await db.ingredient_stock.findMany({
      where: {
        u_id: user.u_id,
      },
      include: {
        ingredient: true,
      },
    });
    const userIngredientsList = userIngredients.map((ingredient) => ingredient.ingredient.i_name);
    console.log(userIngredientsList);

    res.json({ userIngredientsList });
  } catch (error) {
    res.status(400).json({ message: "Failed to get user recommended recipes." });
  }
}

export const searchRecipes = async (req: Request, res: Response) => {
  const { searchString } = req.query;
  if (!searchString) {
    res.json({ recipes: [] });
  }
  try {
    const recipes = await db.recipe.findMany({
      where: {
        r_name: {
          contains: searchString as string,
        },
      },
    });
    res.json({ recipes });
  } catch (error) {
    res.status(400).json({ message: "Failed to search recipes." });
  }
}

export const getRecipeDetail = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const recipe = await db.recipe.findUnique({
      where: {
        r_id: Number(id),
      },
    });
    res.json({ recipe });
  } catch (error) {
    res.status(400).json({ message: "Failed to get recipe detail." });
  }
}

export const getFirstTwentyRecipes = async (req: Request, res: Response) => {
  try {
    const recipes = await db.recipe.findMany({
      take: 20,
    });
    res.json({ recipes });
  } catch (error) {
    res.status(400).json({ message: "Failed to get recipes." });
  }
}

export const createRecipe = async (req: Request, res: Response) => {
  const { name, description, calories, fat, protein, sugar, pt_time, ct_time } = req.body;
  try {
    const recipe = await db.recipe.create({
      data: {
        r_name: name,
        r_description: description,
        r_calories: calories,
        r_fat: fat,
        r_protein: protein,
        r_sugar: sugar,
        pt_time: pt_time,
        ct_time: ct_time,
      },
    });
    res.json({ recipe });
  } catch (error) {
    res.status(400).json({ message: "Failed to create recipe." });
  }
}

export const deleteRecipe = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await db.recipe.delete({
      where: {
        r_id: Number(id),
      },
    });
    res.json({ message: "Recipe deleted." });
  } catch (error) {
    res.status(400).json({ message: "Failed to delete recipe." });
  }
}

export const updateRecipe = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, calories, fat } = req.body;
  try {
    const recipe = await db.recipe.update({
      where: {
        r_id: Number(id),
      },
      data: {
        r_name: name,
        r_description: description,
        r_calories: 0,
        r_fat: 0,
        r_protein: 0,
        r_sugar: 0,
        pt_time: 0,
        ct_time: 0,
      },
    });
    res.json({ recipe });
  } catch (error) {
    res.status(400).json({ message: "Failed to update recipe." });
  }
}

export const updateOwnRecipe = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, email } = req.body;
  try {
    const userRecipe = await db.recipe.findUnique({
      where: {
        r_id: Number(id),
      },

    });

    const recipe = await db.recipe.update({
      where: {
        r_id: Number(id),
      },
      data: {
        r_name: name,
        r_description: description,
      },
    });
    res.json({ recipe });
  } catch (error) {
    res.status(400).json({ message: "Failed to update recipe." });
  }
}