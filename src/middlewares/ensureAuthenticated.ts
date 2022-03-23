import { NextFunction, request, Request, Response } from "express";
import { verify } from "jsonwebtoken";

function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token is missing" });
  }

  try {
    const { sub } = verify(token, process.env.JWT_SECRET || "secret");

    if (sub && typeof sub === "string") {
      request.id = sub;
    } else {
      return res.status(401).json({ message: "Invalid token" });
    }
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Expired token" });
    }

    return res.status(401).json({ message: "Invalid token" });
  }

  next();
}

export default ensureAuthenticated;
