type Subset = Set<string>;
type Recipes = Subset[];

// interface Subset Set<string>;
// filter out recipes that have ingredients that the user does not have
// time complexity should be O(n * m) where n is the number of recipes and m is the number of ingredients in each recipe
const filterRecipeNoUserIngredient = (userIngredient: Set<string>, recipes: Recipes) => {
  return recipes.filter((recipe) => {
    for (const ingredient of recipe) {
      if (!userIngredient.has(ingredient)) {
        return false;
      }
    }
    return true;
  });
}

// calculate the cost of a set of recipes
// factor: ingredients expiration date, ingredients price, amount of ingredients
// factor: recipe time
const costCalculator = (recipes: Recipes, costs: number[]) => {

}

function recipeSuggestion(
  userIngredient: Set<string>,    // can change it to 
  recipes: Recipes,
  costs: number[]
): [Subset[], number] | null {
  let cost = 0;
  const elements = new Set<string>();
  recipes.forEach((s) => s.forEach((e) => elements.add(e)));

  console.log("element", elements)
  if (
    // elements.size !== userIngredient.size || // Commented out to allow for partial set cover
    ![...elements].every((e) => userIngredient.has(e))
  ) {
    return null;
  }

  console.log()


  const covered = new Set<string>();
  const cover: Subset[] = [];
  while (covered.size !== elements.size) {
    const subset = recipes.reduce((maxSubset, s) => {
      const uncoveredElements = new Set([...s].filter((e) => !covered.has(e)));
      const maxUncoveredElements = new Set(
        [...maxSubset].filter((e) => !covered.has(e))
      );

      // return the subset that has the most uncovered elements
      return uncoveredElements.size / costs[recipes.indexOf(s)] >
        maxUncoveredElements.size / costs[recipes.indexOf(maxSubset)]
        ? s
        : maxSubset;
    }, recipes[0]);
    console.log("recipe", subset)
    cover.push(subset);
    cost += costs[recipes.indexOf(subset)];
    subset.forEach((e) => covered.add(e));
  }
  return [cover, cost];
}


// Example usage
// const userIngredient = new Set<string>([1, 2, 3, 4, 5]);
const userIngredient  = new Set<string>(["3", "2", "4", "5", "6"]);
const recipes: Subset[] = [
  new Set(["1", "2"]),
  new Set(["2", "3", "4"]),
  new Set(["4", "5"]),
  new Set(["5", "6"]),
];

const costs = [1, 2, 3, 1];
const filteredIngredients = filterRecipeNoUserIngredient(userIngredient, recipes);
console.log(filteredIngredients);
const result = recipeSuggestion(userIngredient, filteredIngredients, costs);
console.log(result);
