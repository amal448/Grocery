import jwt from 'jsonwebtoken'
const VerifyUser = (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) return res.json({ success: false, message: 'Not Authorised' })
        const tokenDecode = jwt.verify(token, process.env.JWTSECRET)

        if (tokenDecode.id) {
            req.body.userId = tokenDecode.id
        }
        else res.json({ success: false, message: "Not Authorised" })
        next()
    }
    catch (error) {
        res.json({ success: false, message: error.message })

    }
}
export default VerifyUser