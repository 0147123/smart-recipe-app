import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { decryptAccessToken } from "../utils/jwt";

export type UserDecryptedToken = {
  email: string;
  role: string;
}


export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
  // access token from the header: Bearer token
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: "Access denied." });
  }

  try {
    const { email, role } = decryptAccessToken(token);
    if (role !== 'user') {
      return res.status(403).json({ message: "Access denied." });
    }

    req.body.email = email;
    req.body.role = role;


    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token." });
  }
}

export const verifyMerchant = (req: Request, res: Response, next: NextFunction) => {
  // access token from the header: Bearer token
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: "Access denied." });
  }

  try {
    const { email, role } = decryptAccessToken(token);
    if (role !== 'merchant') {
      return res.status(403).json({ message: "Access denied." });
    }

    req.body.email = email;
    req.body.role = role;

    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token." });
  }
}