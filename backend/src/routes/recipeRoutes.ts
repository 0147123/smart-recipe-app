import { check } from 'express-validator';
import { Router } from 'express';
import { createRecipe, deleteRecipe, getRecipeDetail, getUserRecommendRecipes, searchRecipes, updateRecipe } from '../controllers/recipeController';

const router = Router()

// user recipe recommendation
router.post('/getUserRecommendRecipes', check('email').isEmail().withMessage("Please enter a correct format"), getUserRecommendRecipes)
// search recipe
router.post('/searchRecipes', check('email').isEmail().withMessage("Please enter a correct format"), searchRecipes)

// CURD recipe
router.post('/getRecipeDetail', check('email').isEmail().withMessage("Please enter a correct format"), getRecipeDetail)
router.post('/createRecipe', check('email').isEmail().withMessage("Please enter a correct format"), createRecipe)
router.post('/deleteRecipe', check('email').isEmail().withMessage("Please enter a correct format"), deleteRecipe)
router.post('/updateRecipe', check('email').isEmail().withMessage("Please enter a correct format"), updateRecipe)


export default router