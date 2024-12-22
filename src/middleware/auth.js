import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();

// middleware/auth.js

const verifyToken = (token) => {
  const secretKey = process.env.JWT_SECRET;

  try {
    const decodedToken = jwt.verify(token, secretKey);
    return decodedToken;
  } catch (error) {
    console.error("Token verification error:", error);
    throw new Error("Invalid token");
  }
};


export const authToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(403).json({ message: "Token is missing or invalid" });
    }

    const token = authHeader.replace("Bearer ", "");

    console.log("Received Token:", token);

    if (!token) {
      return res.status(403).json({ message: "Token is missing or invalid" });
    }

    const decodedToken = verifyToken(token); 

    console.log("Decoded Token:", decodedToken);

    if (!decodedToken || decodedToken.exp < Date.now() / 1000) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    req.user = {
      id: decodedToken.id,
      email: decodedToken.email,
    };

    next(); 
  } catch (error) {
    console.error("Auth token middleware error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
