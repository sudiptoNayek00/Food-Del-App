import jwt from "jsonwebtoken";

const authMiddelware = async (req, res, next) => {
  // Standard way to get Bearer token
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized", success: false });
  }
  const token = authHeader.split(" ")[1]; // Get the actual token after "Bearer "
  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.id = token_decode.id;
    next();
  } catch (err) {
    console.log("Error in auth middleware:", err);
    return res
      .status(401)
      .json({ message: "Invalid or expired token", success: false });
  }
};

export default authMiddelware;