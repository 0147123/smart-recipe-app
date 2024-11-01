import { check } from 'express-validator';
import { Router } from 'express';
import { createRecipe, deleteRecipe, getFirstTwentyRecipes, getRecipeDetail, getUserRecommendRecipes, searchRecipes, updateOwnRecipe, updateRecipe } from '../controllers/recipeController';
import { verifyAdmin, verifyUser } from '../middlewares/verifyToken';

const router = Router()

// role: user
router.get('/getUserRecommendRecipes', verifyUser, getUserRecommendRecipes)
router.post('/searchRecipes', verifyUser, searchRecipes)
router.post('/getRecipeDetail', getRecipeDetail)
router.post('/getFirstTwentyRecipes', verifyUser, getFirstTwentyRecipes)
router.post('/createRecipe', createRecipe)
router.post('/updateOwnRecipe', updateOwnRecipe)

 // role: admin
router.post('/deleteRecipe', deleteRecipe)
router.post('/updateRecipe', updateRecipe)


export default router