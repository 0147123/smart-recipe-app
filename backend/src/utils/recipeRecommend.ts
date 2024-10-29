import { Request, Response } from "express";
import { db } from "../configs/databaseClient";

// Purpose: Contains the logic for recommending recipes to users based on their preferences.
// based on the ingredients they have in their inventory.
// The recommendation system should take into account the user's dietary restrictions,
export const recipeRecommend = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await db.users.findUnique({
      where: {
        u_id: Number(userId),
      },
    });

    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    const ingredients = await db.ingredient_stock.findMany({
      where: {
        u_id: Number(userId),
      },
    });

    // Get the list of ingredients the user has
    const userIngredients = ingredients.map((ingredient) => ingredient.i_id);

    // Get the list of recipes that contain the user's ingredients
    const recipes = await db.recipe.findMany({
      where: {
        recipe_ingredient: {
          some: {
            i_id: {
              in: userIngredients,
            },
          },
        },
      },
    });

    res.json({ recipes });
  }
};
