import { db } from "../src/configs/databaseClient";
import { Ingredient, Ingredient_stock } from "../src/models/ingredient";
import { Recipe, Recipe_ingredient, Recipe_step, Recipe_tag } from "../src/models/recipe";
import { Users, Users_preference, Users_recipe } from "../src/models/users";


// dummy data
function getUsers(): Array<Users> {
  return [
    {
      "u_name": "user1",
      "u_email": "example1@example.com",
      "u_hashedpassword": "password1",
      "u_image": "image1",
    },
    {
      "u_name": "user2",
      "u_email": "example2@example.com",
      "u_hashedpassword": "password2",
      "u_image": "image2",
    },
    {
      "u_name": "user3",
      "u_email": "example3@example.com",
      "u_hashedpassword": "password3",
      "u_image": "image3",
    },
  ];
}

function getIngredients(): Array<Ingredient> {
  return [
    {
      "i_name": "ingredient1",
      "i_description": "description1",
      "i_image": "image1",
    },
    {
      "i_name": "ingredient2",
      "i_description": "description2",
      "i_image": "image2",
    },
    {
      "i_name": "ingredient3",
      "i_description": "description3",
      "i_image": "image3",
    },
  ];
}

function getIngredientStocks(): Array<Ingredient_stock> {
  return [
    {
      "i_id": 1,
      "u_id": 1,
      "is_quantity": 1,
      "is_unit": "g",
    },
    {
      "i_id": 2,
      "u_id": 2,
      "is_quantity": 2,
      "is_unit": "unit2",
    },
    {
      "i_id": 3,
      "u_id": 3,
      "is_quantity": 3,
      "is_unit": "unit3",
    },
  ];
}

function getRecipes(): Array<Recipe> {
  return [
    {
      "r_name": "recipe1",
      "r_description": "description1",
      "r_image": "image1",
      "r_calories": 1,
      "r_fat": 1,
      "r_protein": 1,
      "r_sugar": 1,
      "pt_time": 1,
      "ct_time": 1,
    },
    {
      "r_name": "recipe2",
      "r_description": "description2",
      "r_image": "image2",
      "r_calories": 2,
      "r_fat": 2,
      "r_protein": 2,
      "r_sugar": 2,
      "pt_time": 2,
      "ct_time": 2,
    },
    {
      "r_name": "recipe3",
      "r_description": "description3",
      "r_image": "image3",
      "r_calories": 3,
      "r_fat": 3,
      "r_protein": 3,
      "r_sugar": 3,
      "pt_time": 3,
      "ct_time": 3,
    },
  ];
}

function getRecipeIngredients(): Array<Recipe_ingredient> {
  return [
    {
      "r_id": 1,
      "i_id": 1,
      "ri_quantity": 1,
      "ri_unit": "unit1",
    },
    {
      "r_id": 2,
      "i_id": 2,
      "ri_quantity": 2,
      "ri_unit": "unit2",
    },
    {
      "r_id": 3,
      "i_id": 3,
      "ri_quantity": 3,
      "ri_unit": "unit3",
    },
  ];
}

function getRecipeSteps(): Array<Recipe_step> {
  return [
    {
      "r_id": 1,
      "rs_description": "description1",
      "rs_image": "image1",
    },
    {
      "r_id": 2,
      "rs_description": "description2",
      "rs_image": "image2",
    },
    {
      "r_id": 3,
      "rs_description": "description3",
      "rs_image": "image3",
    },
  ];
}

function getRecipeTags(): Array<Recipe_tag> {
  return [
    {
      "r_id": 1,
      "rt_name": "tag1",
    },
    {
      "r_id": 2,
      "rt_name": "tag2",
    },
    {
      "r_id": 3,
      "rt_name": "tag3",
    },
  ];
}

function getUsersPreferences(): Array<Users_preference> {
  return [
    {
      "u_id": 1,
      "rt_id": 1,
    },
    {
      "u_id": 2,
      "rt_id": 2,
    },
    {
      "u_id": 3,
      "rt_id": 3,
    },
  ];
}

function getUsersRecipes(): Array<Users_recipe> {
  return [
    {
      "u_id": 1,
      "r_id": 1,
    },
    {
      "u_id": 2,
      "r_id": 2,
    },
    {
      "u_id": 3,
      "r_id": 3,
    },
  ];
}

async function insertDummyData() {
  await Promise.all(
    getUsers().map((user) => {
      return db.users.create({
        data: {
          u_name: user.u_name,
          u_email: user.u_email,
          u_hashedpassword: user.u_hashedpassword,
          u_image: user.u_image,
        },
      });
    }
  ));

  await Promise.all(
    getIngredients().map((ingredient) => {
      return db.ingredient.create({
        data: {
          i_name: ingredient.i_name,
          i_description: ingredient.i_description,
          i_image: ingredient.i_image,
        },
      });
    }
  ));

  await Promise.all(
    getIngredientStocks().map((ingredient_stock) => {
      return db.ingredient_stock.create({
        data: {
          i_id: ingredient_stock.i_id,
          u_id: ingredient_stock.u_id,
          is_quantity: ingredient_stock.is_quantity,
          is_unit: ingredient_stock.is_unit,
        },
      });
    }
  ));

  await Promise.all(
    getRecipes().map((recipe) => {
      return db.recipe.create({
        data: {
          r_name: recipe.r_name,
          r_description: recipe.r_description,
          r_image: recipe.r_image,
          r_calories: recipe.r_calories,
          r_fat: recipe.r_fat,
          r_protein: recipe.r_protein,
          r_sugar: recipe.r_sugar,
          pt_time: recipe.pt_time,
          ct_time: recipe.ct_time,
        },
      });
    }
  ));

  await Promise.all(
    getRecipeIngredients().map((recipe_ingredient) => {
      return db.recipe_ingredient.create({
        data: {
          r_id: recipe_ingredient.r_id,
          i_id: recipe_ingredient.i_id,
          ri_quantity: recipe_ingredient.ri_quantity,
          ri_unit: recipe_ingredient.ri_unit,
        },
      });
    }
  ));

  await Promise.all(
    getRecipeSteps().map((recipe_step) => {
      return db.recipe_step.create({
        data: {
          r_id: recipe_step.r_id,
          rs_description: recipe_step.rs_description,
          rs_image: recipe_step.rs_image,
        },
      });
    }
  ));

  await Promise.all(
    getRecipeTags().map((recipe_tag) => {
      return db.recipe_tag.create({
        data: {
          r_id: recipe_tag.r_id,
          rt_name: recipe_tag.rt_name,
        },
      });
    }
  ));

  await Promise.all(
    getUsersPreferences().map((users_preference) => {
      return db.users_preference.create({
        data: {
          u_id: users_preference.u_id,
          rt_id: users_preference.rt_id,
        },
      });
    }
  ));

  await Promise.all(
    getUsersRecipes().map((users_recipe) => {
      return db.users_recipe.create({
        data: {
          u_id: users_recipe.u_id,
          r_id: users_recipe.r_id,
        },
      });
    }
  ));

  console.log("Inserted dummy data");
}


// Seed data
async function seed() {
  await insertDummyData();
}

seed();

//   // STATUS: comment it out for now
//   // users_coupon table is changed to users_coupon_records, and don't need to seed it
  
//   // create users_coupon records
//   // const example_user = await db.users.findFirst();
//   // const coupons = await db.coupon.findMany();

//   // await Promise.all(
//   //   coupons.map((coupon) => {
//   //     return db.users_coupon.create({
//   //       data: {
//   //         u_id: example_user!.u_id,
//   //         c_id: coupon.c_id,
//   //         is_used: false,
//   //       },
//   //     });
//   //   })
//   // );

//   console.log("Seeded data");
// }

// seed();


// // Seed data+

// function getCustomers(): Array<Customer> {
//   return [
//     {
//       "email": "users@example.com",
//     },
//     {
//       "email": "users2@example.com",
//     },
//     {
//       "email": "users3@example.com",
//     },
//   ];
// }

