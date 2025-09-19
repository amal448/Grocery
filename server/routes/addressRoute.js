import express from 'express'
import VerifyUser from '../middlewares/authUser.js'
import { addAddress,getAddress } from '../controllers/addressController.js'

const router = express.Router()

router.post('/add',VerifyUser, addAddress)
router.get('/get',VerifyUser, getAddress)


export default router