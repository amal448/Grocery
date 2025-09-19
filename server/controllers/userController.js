import User from "../models/User.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

//Register User
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.json({ success: false, message: "Missing Details" })
        }
        const existingUser = await User.findOne({ email })
        if (existingUser) return res.json({ success: false, message: "User Already Exist!!" })

        const hashpassword = await bcrypt.hash(password, 10)
        const user = await new User({
            name, email, password: hashpassword
        })
        await user.save()

        const token = jwt.sign({ id: user._id }, process.env.JWTSECRET, { expiresIn: '7d' })

        res.cookie('token', token, {
            httpOnly: true, //prevent js to acess cookie
            secure: process.env.NODE_ENV === 'production', //use seccure cookie in production
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', //CSRF PROTECTION
            maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiration time
        })
        return res.json({ success: true, user: { email: user.email, name: user.name }, message: "User account is Created" })
    }
    catch (error) {
        res.json({ success: false, message: error.message })
    }
}
export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) return res.json({ success: false, message: "Credential missing" })

        const user = await User.findOne({ email })
        if (!user) return res.json({ success: false, message: "User Account Not Exist!!" })

        const verify = await bcrypt.compare(password, user.password)
        if (!verify) return res.json({ success: false, message: "Invalid Credentials" })

        const token = jwt.sign({ id: user._id }, process.env.JWTSECRET, { expiresIn: '7d' })

        res.cookie('token', token, {
            httpOnly: true, //prevent js to acess cookie
            secure: process.env.NODE_ENV === 'production', //use seccure cookie in production
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', //CSRF PROTECTION
            maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiration time
        })
        return res.json({ success: true, user: { email: user.email, name: user.name }, message: "User account is verified" })
    }
    catch (error) {
        res.json({ success: false, message: error.message })
    }
}
export const isAuth = async (req, res) => {
    
    try {
        const userId=req.userId
        const user = await User.findById(userId).select("-password")
        return res.json({ success: true, user })
    }
    catch (error) {
        
        res.json({ success: false, message: error.message })
    }
}
export const logout = async (req, res) => {
    try {
        
        res.clearCookie('token', {
            httpOnly: true, //prevent js to acess cookie
            secure: process.env.NODE_ENV === 'production', //use seccure cookie in production
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', //CSRF PROTECTION
        })
        return res.json({ success: true, message:"Logged Out" })

    }
    catch (error) {
        res.json({ success: false, message: error.message })
    }
}