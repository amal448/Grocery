import express from 'express'
import { sellerLogin, isSellerAuth, sellerLogout } from '../controllers/sellerController.js'
import VerifySeller from '../middlewares/authSeller.js'


const router = express.Router()

router.post('/login', sellerLogin)
router.get('/is-Auth', VerifySeller, isSellerAuth)
router.get('/logout', VerifySeller, sellerLogout)

export default router