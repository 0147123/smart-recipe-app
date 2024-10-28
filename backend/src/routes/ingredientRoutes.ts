import { check } from 'express-validator';
import { Router } from 'express';

const router = Router()

// user ingredient stock
router.post('/getUserIngredientslist', check('email').isEmail().withMessage("Please enter a correct format"), getUserIngredient)
router.post('/getUserIngredient', check('email').isEmail().withMessage("Please enter a correct format"), getIngredient)
router.post('/addUserIngredients', check('email').isEmail().withMessage("Please enter a correct format"), addUserIngredient)
router.post('/deleteUserIngredient', check('email').isEmail().withMessage("Please enter a correct format"), deleteUserIngredient)
router.post('/updateUserIngredient', check('email').isEmail().withMessage("Please enter a correct format"), updateUserIngredient)

// overall ingredient
router.get('/getIngredients', getIngredients)
router.post('/createIngredient', check('email').isEmail().withMessage("Please enter a correct format"), addUserIngredient)



export default router