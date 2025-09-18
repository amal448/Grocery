import jwt from 'jsonwebtoken'

const VerifySeller = (req, res, next) => {
    try {
        const { sellerToken } = req.cookies;
        if (!sellerToken) return res.json({ success: false, message: 'Not Authorised' })
        const tokenDecode = jwt.verify(sellerToken, process.env.JWTSECRET)

        if (tokenDecode.email === process.env.SELLER_EMAIL ) {
           next()
        }
        else res.json({ success: false, message: "Not Authorised" })
       
    }
    catch (error) {
        res.json({ success: false, message: error.message })

    }
}
export default VerifySeller