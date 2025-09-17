import express from 'express'
import { register,login, isAuth, logout } from '../controllers/userController.js'
import VerifyUser from '../middlewares/authUser.js'

const router=express.Router()

router.post('/register',register)
router.post('/login',login)
router.get('/is-Auth',VerifyUser,isAuth)
router.get('/logout',VerifyUser,logout)
export default router