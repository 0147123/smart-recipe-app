import { check } from 'express-validator';
import { Router } from 'express';
import { addUserIngredients, createIngredient, deleteIngredient, deleteUserIngredient, getIngredients, getUserIngredientDetail, getUserIngredientslist, updateIngredient, updateUserIngredient } from '../controllers/ingredientController';
import { verifyUser } from '../middlewares/verifyToken';

const router = Router()

// user ingredient stock
router.post('/getUserIngredientslist', getUserIngredientslist)
router.post('/getUserIngredientDetail', getUserIngredientDetail)
router.post('/addUserIngredients', verifyUser, addUserIngredients)
router.post('/deleteUserIngredient', deleteUserIngredient)
router.post('/updateUserIngredient', verifyUser, updateUserIngredient)

// ingredient source
router.get('/getIngredients', getIngredients)

router.post('/createIngredient', verifyUser, createIngredient)
router.post('/deleteIngredient', verifyUser, deleteIngredient)
router.post('/updateIngredient', verifyUser, updateIngredient)



export default router