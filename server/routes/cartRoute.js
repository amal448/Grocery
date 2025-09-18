import express from 'express'
import VerifyUser from '../middlewares/authUser.js'
import { updateCart } from '../controllers/cartController.js'

const router = express.Router()

router.post('/update',VerifyUser, updateCart)


export default router