import jwt from 'jsonwebtoken'
const VerifyUser = (req, res, next) => {
    try {
        
        const { token } = req.cookies;
        
        if (!token) return res.json({ success: false, message: 'Not Authorised1' })
        const tokenDecode = jwt.verify(token, process.env.JWTSECRET)
        
        if (tokenDecode.id) {
            req.userId = tokenDecode.id
        }
        else res.json({ success: false, message: "Not Authorised2" })
        next()
    }
    catch (error) {
        res.json({ success: false, message: error.message })

    }
}
export default VerifyUser