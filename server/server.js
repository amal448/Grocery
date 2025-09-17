import express from 'express';
import cors from 'cors'
import 'dotenv/config'
import cookieParser from 'cookie-parser';
import connectDb from './configs/db.js';
import userRoute from '../server/routes/userRoute.js'


const port=process.env.PORT||4000
const app=express()

const allowedOrigins=['http://localhost:5173']

await connectDb()
//Middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors({origin:allowedOrigins,credentials:true}))
app.use('/api/user',userRoute)
app.get('/',(req,res)=>{
    res.send("API Working")
})
app.listen(port,()=>{
    console.log("Server is Running");
    
})