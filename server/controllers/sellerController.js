import jwt from "jsonwebtoken"

export const sellerLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (password === process.env.SELLER_PASSWORD && email === process.env.SELLER_EMAIL) {
            const sellerToken = jwt.sign({ email:email }, process.env.JWTSECRET, { expiresIn: '7d' })
            
            res.cookie('sellerToken', sellerToken, {
                httpOnly: true, //prevent js to acess cookie
                secure: process.env.NODE_ENV === 'production', //use seccure cookie in production
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', //CSRF PROTECTION
                maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiration time
            })
            return res.json({ success: true, message: "Seller account is loggedin" })
        }
        else {

            return res.json({ success: false, message: "Invalid credentials" })
        }
    }

    catch (error) {
        res.json({ success: false, message: error.message })
    }
}
export const isSellerAuth = async (req, res) => {
    try {
        
        return res.json({ success: true})
    }
    catch (error) {
        res.json({ success: false, message: error.message })
    }
}
export const sellerLogout = async (req, res) => {
    try {
        res.clearCookie('sellerToken', {
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