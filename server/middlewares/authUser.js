import jwt from "jsonwebtoken";

const VerifyUser = (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not Authorised",
      });
    }

    const tokenDecode = jwt.verify(token, process.env.JWTSECRET);

    if (!tokenDecode?.id) {
      return res.status(401).json({
        success: false,
        message: "Invalid Token",
      });
    }

    req.userId = tokenDecode.id;
    next(); // ✅ only runs on success
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Token verification failed",
    });
  }
};

export default VerifyUser;
