import { check } from 'express-validator';
import { access, register, logout, refresh} from '../controllers/authController';
import { Router } from 'express';

const router = Router()

router.post('/register', check('email').isEmail().withMessage("Please enter a correct format"), register)
router.post('/', check('email').isEmail().withMessage("Please enter a correct format"), access)
router.get('/logout', logout)
router.get('/refresh', refresh)

export default router