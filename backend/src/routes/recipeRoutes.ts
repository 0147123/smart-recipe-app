import { check } from 'express-validator';
// import { access, getLoginLink, logout, refresh} from '../controllers/authController';
import { Router } from 'express';

const router = Router()

// router.post('/getMerchertLoginLink', check('email').isEmail().withMessage("Please enter a correct format"), getLoginLink)
// router.post('/merchantLogin', check('email').isEmail().withMessage("Please enter a correct format"), access)
router.post('/getLoginLink', check('email').isEmail().withMessage("Please enter a correct format"), getLoginLink)
router.post('/', check('email').isEmail().withMessage("Please enter a correct format"), access)
router.get('/logout', logout)
router.get('/refresh', refresh)

export default router