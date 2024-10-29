import { db } from "../configs/databaseClient";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import jwt, { JwtPayload } from "jsonwebtoken";
import { createRefreshToken } from "../utils/jwt";

import { inputValidationErrorsHandleing } from "../utils/validation";
import { PrismaClient } from "@prisma/client";
// import { User } from "middlewares/verifyToken";
import { decryptRefreshToken } from "../utils/jwt";
import { deleteAllRefreshTokenFromUser } from "../utils/jwt";
import { dealWithInvalidToken } from "../utils/jwt";
import bcrypt from "bcrypt";
import { hashingPassword } from "../utils/encryption";
import { Tokens } from "../models/token";
// import { insertCouponForNewUser } from "../utils/insertNewUser";

// input:
// { email: string,
//   password: string,
//   image: string,
//   username: string }
// todo: email validation
export const register = async (req: Request, res: Response) => {
  inputValidationErrorsHandleing(validationResult(req), res);

  const { email, href, username, password } = req.body;

  let tokens: Tokens = { refreshToken: "", accessToken: "" };

  try {
    // hash password
    const hashedPassword = await hashingPassword(password);

    // create a new user
    const newUser = await db.users.create({
      data: {
        u_name: username,
        u_email: email,
        u_hashedpassword: hashedPassword,
      },
    });

    // assign the user a refresh token
    if (newUser) {
      tokens = await createRefreshToken(newUser.u_id, email, "user");
    }


    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      secure: true, // Set to true in production
      sameSite: "strict", // Adjust based on your requirements
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    res.header("Authorization", `Bearer ${tokens.accessToken}`);
    res.json({ message: "register success" });
  } catch (error) {
    console.log("error", error);
    res.status(400).json({ message: "Failed to register." });
  }
};

// input { email: string, password: string, href: string }
export const login = async (req: Request, res: Response) => {
  inputValidationErrorsHandleing(validationResult(req), res);

  let tokens: Tokens = { refreshToken: "", accessToken: "" };

  const { email, password } = req.body;
  console.log("email", email);
  console.log("password", password);

  try {
    // check if the email is in the database
    const user = await db.users.findUnique({
      where: {
        u_email: email,
      },
    });

    if (!user) {
      res.status(400).json({ message: "User not found." });
      return;
    }

    // compare the password
    const isPasswordMatch = await bcrypt.compare(password, user.u_hashedpassword);
    if (!isPasswordMatch) {
      res.status(400).json({ message: "Invalid password." });
      return;
    }

    // assign the user a refresh and access token
    tokens = await createRefreshToken(user.u_id, email, "user");

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      secure: true, // Set to true in production
      sameSite: "strict", // Adjust based on your requirements
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.header("Authorization", `Bearer ${tokens.accessToken}`);

    res.json({ message: "login success" });
  } catch (error) {
    console.log("error", error);

    if (error instanceof Error && "code" in error && error.code === "auth/invalid-email") {
      res.status(403);
      return;
    }

    if (error instanceof Error && "code" in error && error.code === "auth/invalid-action-code") {
      res.status(403).json({ message: "The link is invalid." });
      return;
    }

    res.status(400).json({ message: "Failed to access request." });
    return;
  }
};

export const refresh = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    console.log("refreshToken", refreshToken);
    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token provided" });
    }


    // Check if the token is valid
    const isRefreshTokenExist = await db.refresh_token.findUnique({
      where: {
        token: refreshToken,
      },
    }); 

    if (!isRefreshTokenExist) {
      //Decrypt token and delete all refresh token from user
      deleteAllRefreshTokenFromUser(refreshToken); //commented out for the moment
      return res.status(403).json({ message: "Invalidrefresh token" });
    }

    
    // Check if the token is not expired
    const currentTime = new Date();
    if (currentTime.getTime() > isRefreshTokenExist.expires_at.getTime()) {
      //delete Token from server, return message to front end that says log out
      await db.refresh_token.delete({
        where: { token_id: isRefreshTokenExist.token_id },
      });
      return res.status(401).json({ message: "Session expired. Please log in again." });
    }


    // if token exist, select expires_at to get the lifespan to new access Token
    const timeDifference = isRefreshTokenExist.expires_at.getTime() - currentTime.getTime();

    const result = decryptRefreshToken(refreshToken); 


    if (!result) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }
    if (result.email === "error") {
      return res.status(401).json({ message: "Session expired. Please log in again." });
    }

    const tokenContent: JwtPayload = { email: result.email, role: result.role };
    const newRefreshToken = jwt.sign(tokenContent, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: `${timeDifference}s` });
    const accessToken = jwt.sign(tokenContent, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });

    // update old token to new token

    const updatedToken = await db.refresh_token.update({
      where: {
        token: refreshToken,
      },
      data: {
        token: newRefreshToken,
      },
    });

    console.log("updatedToken is ", updatedToken);
    res.clearCookie("refreshToken");
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: true, // Set to true in production
      sameSite: "strict", // Adjust based on your requirements
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    res.header("Authorization", `Bearer ${accessToken}`);
  } catch (error) {
    console.log("error", error);
    return res.status(401).json({ message: "Session expired. Please log in again." });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token provided" });
    }
    // Check if the token is valid
    const isRefreshTokenExist = await db.refresh_token.findUnique({
      where: {
        token: refreshToken,
      },
    });

    if (!isRefreshTokenExist) {
      res.clearCookie("refreshToken");
      return res.status(403).json({ message: "Invalid refresh token" });
    }
    // Delete token from server
    await db.refresh_token.delete({
      where: { token_id: isRefreshTokenExist.token_id },
    });
    res.clearCookie("refreshToken");
    res.json({ message: "ok" });
  } catch (e) {
    console.log("error", e);
    return res.status(401).json({ message: "Session expired. Please log in again." });
  }
};
