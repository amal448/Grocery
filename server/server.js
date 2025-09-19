import express, { application } from 'express';
import cors from 'cors'
import 'dotenv/config'
import cookieParser from 'cookie-parser';
import connectDb from './configs/db.js';
import userRoute from '../server/routes/userRoute.js'
import sellerRoute from '../server/routes/sellerRoute.js'
import productRoute from '../server/routes/productRoute.js'
import cartRoute from '../server/routes/cartRoute.js'
import connectCloudinary from './configs/cloudinary.js';
import addressRoute from '../server/routes/addressRoute.js'
import orderRoute from '../server/routes/orderRoute.js'
import { stripeWebHooks } from './controllers/orderController.js';

const port=process.env.PORT||4000
const app=express()

const allowedOrigins=['http://localhost:5173'||'https://grocery-arq6.vercel.app']
app.post('/stripe',express.raw({type:'application/json'}),stripeWebHooks)

await connectDb()
await connectCloudinary() //cloudinary config
//Middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors({origin:allowedOrigins,credentials:true}))

app.use('/api/user',userRoute)
app.use('/api/seller',sellerRoute)
app.use('/api/product',productRoute)
app.use('/api/cart',cartRoute)
app.use('/api/address',addressRoute)
app.use('/api/order',orderRoute)

app.get('/',(req,res)=>{
    res.send("API Working")
})
app.listen(port,()=>{
    console.log("Server is Running");
    
})