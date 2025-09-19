import express from 'express'
import { addProduct,productList,productById,changeStock } from '../controllers/productController.js'
import { upload } from '../configs/multer.js'
import VerifySeller from '../middlewares/authSeller.js'

const router = express.Router()
//Seller routes
router.post('/add',upload.array("images"),VerifySeller, addProduct)
router.get('/list', productList)
router.get('/id', VerifySeller, productById)
router.post('/stock', VerifySeller, changeStock)

export default router