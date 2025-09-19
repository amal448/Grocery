import express from 'express'
import { getAllOrders,getuserOrders,placeOrderCOD, placeOrderStripe } from '../controllers/orderController.js'
import VerifySeller from '../middlewares/authSeller.js'
import VerifyUser from '../middlewares/authUser.js'

const router = express.Router()

router.post('/cod',VerifyUser, placeOrderCOD)
router.post('/stripe',VerifyUser, placeOrderStripe)
router.get('/user', VerifyUser, getuserOrders)
router.get('/seller', VerifySeller, getAllOrders)

export default router