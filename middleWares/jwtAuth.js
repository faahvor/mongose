import jwt from "jsonwebtoken";
export const verifyJWToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    if (!token) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorised :(",
      });
    }
    const decoded =  jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded) {
      return res.status(401).json({
        status: "error",
        message: "uUnauthorised :(",
      });
    }

    req.user = decoded;
    console.log(req.user.role, "jwt");
    next();
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "an error occured while trying to verify token",
    });
  }
};
