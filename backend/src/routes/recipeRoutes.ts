import { check } from 'express-validator';
import { Router } from 'express';
import { createRecipe, deleteRecipe, getFirstTwentyRecipes, getRecipeDetail, getUserRecommendRecipes, searchRecipes, updateOwnRecipe, updateRecipe } from '../controllers/recipeController';
import { verifyAdmin, verifyUser } from '../middlewares/verifyToken';

const router = Router()

// role: user
router.get('/getUserRecommendRecipes', verifyUser, getUserRecommendRecipes)
router.post('/searchRecipes', verifyUser, searchRecipes)
router.post('/getRecipeDetail', verifyUser, getRecipeDetail)
router.post('/getFirstTwentyRecipes', verifyUser, getFirstTwentyRecipes)
router.post('/createRecipe', verifyUser, createRecipe)
router.post('/updateOwnRecipe', verifyUser, updateOwnRecipe)

 // role: admin
router.post('/deleteRecipe', verifyAdmin, deleteRecipe)
router.post('/updateRecipe', verifyAdmin, updateRecipe)


export default router