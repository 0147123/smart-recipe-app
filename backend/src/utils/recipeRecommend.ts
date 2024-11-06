// Purpose: Contains the logic for recommending recipes to users based on their preferences.
// based on the ingredients they have in their inventory.
// The recommendation system should take into account the user's dietary restrictions,
export const recipeRecommend = (reqIngredient: string[], recipe: string[][]): number[] => {
  const reqIngredientSize = reqIngredient.length;
  const recipeSize = recipe.length-1; // the last index of recipe is r_id of the recipe

  const ingredientMap: Map<string, number> = new Map();
  for (let i = 0; i < reqIngredientSize; i++) {
    ingredientMap.set(reqIngredient[i], i);
  }

  const recipeIngredientList: number[] = new Array(recipeSize).fill(0);
  for (let i = 0; i < recipeSize; i++) {
    let ingredients = 0;
    for (const recipeIngredient of recipe[i]) {
      if (ingredientMap.has(recipeIngredient)) {
        ingredients |= (1 << ingredientMap.get(recipeIngredient)!);
      }
    }
    recipeIngredientList[i] = ingredients;
  }

  const dp: number[][] = new Array(1 << reqIngredientSize).fill(null).map(() => []);
  dp[0] = [];

  for (let i = 0; i < recipeSize; i++) {
    const indivRecipeIngrediants = recipeIngredientList[i];
    for (let j = dp.length - 1; j >= 0; j--) {
      if (dp[j].length === 0 && j !== 0) continue;
      const combinedIngredients = j | indivRecipeIngrediants;
      if (dp[combinedIngredients].length === 0 || dp[combinedIngredients].length > dp[j].length + 1) {
        dp[combinedIngredients] = [...dp[j], i];
      }
    }
  }

  const resultIndex = dp[(1 << reqIngredientSize) - 1];
  const result_r_id = resultIndex.map((i) => parseInt(recipe[i][recipe[i].length-1]));
  return result_r_id;
}

// "username": "testing"
