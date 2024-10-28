import { check } from 'express-validator';
import { Router } from 'express';
import { addUserIngredients, createIngredient, deleteIngredient, deleteUserIngredient, getIngredients, getUserIngredient, getUserIngredientslist, updateIngredient, updateUserIngredient } from '../controllers/ingredientController';

const router = Router()

// user ingredient stock
router.post('/getUserIngredientslist', check('email').isEmail().withMessage("Please enter a correct format"), getUserIngredientslist)
router.post('/getUserIngredient', check('email').isEmail().withMessage("Please enter a correct format"), getUserIngredient)
router.post('/addUserIngredients', check('email').isEmail().withMessage("Please enter a correct format"), addUserIngredients)
router.post('/deleteUserIngredient', check('email').isEmail().withMessage("Please enter a correct format"), deleteUserIngredient)
router.post('/updateUserIngredient', check('email').isEmail().withMessage("Please enter a correct format"), updateUserIngredient)

// ingredient source
router.get('/getIngredients', getIngredients)
router.post('/createIngredient', check('email').isEmail().withMessage("Please enter a correct format"), createIngredient)
router.post('/deleteIngredient', check('email').isEmail().withMessage("Please enter a correct format"), deleteIngredient)
router.post('/updateIngredient', check('email').isEmail().withMessage("Please enter a correct format"), updateIngredient)



export default router