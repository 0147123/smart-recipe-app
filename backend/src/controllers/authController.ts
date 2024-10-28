import { db } from "../config/databaseClient";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import jwt, { JwtPayload } from "jsonwebtoken";
import { handleRefreshToken } from "../utils/jwt";
import { Tokens } from "../utils/jwt";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { sendSignInLinkToEmail } from "firebase/auth";
// import auth from "../config/firebaseConfig";
import { inputValidationErrorsHandleing } from "../utils/validation";
import { PrismaClient } from "@prisma/client";
// import { User } from "middlewares/verifyToken";
import { decryptRefreshToken } from "../utils/jwt";
import { deleteAllRefreshTokenFromUser } from "../utils/jwt";
import { dealWithInvalidToken } from "../utils/jwt";
// import { insertCouponForNewUser } from "../utils/insertNewUser";

// input: { email: string }
export const register = async (req: Request, res: Response) => {
  inputValidationErrorsHandleing(validationResult(req), res);

  const { email, href } = req.body;

  console.log("email", email);
  console.log("href", href);
  console.log("req.body", req.body);

  try {
    // sendSignInLinkToEmail(auth, email, {
    //   // this is the URL that we will redirect back to after clicking on the link in mailbox
    //   url: href || "http://localhost:3000/login", // need to change to the production URL
    //   handleCodeInApp: true,
    // });

    res.json({ message: "ok" });
  } catch (error) {
    console.log("error", error);
    res.status(400).json({ message: "Failed to send email." });
  }
};

// input { email: string, href: string }
export const access = async (req: Request, res: Response) => {
  inputValidationErrorsHandleing(validationResult(req), res);

  let tokens: Tokens = { refreshToken: "", accessToken: "" };

  const { email, href } = req.body;
  console.log("email", email);
  console.log("href", href);

  try {
    // part 1: comfirm if the email through firebase validation
    const isFirebaseVarifid = await signInWithEmailLink(auth, email, href);

    // console.log("isFirebaseVarifid", isFirebaseVarifid);

    if (!isFirebaseVarifid) {
      res.status(400).json({ message: "Failed to access request." });
      return;
    }

    // part 2: check if the email is in the database, if not, return create a new user
    const user = await db.users.findUnique({
      where: {
        email,
      },
    });
    if (user) {
      tokens = await handleRefreshToken(user.u_id, email, "user");
    }

    if (!user) {
      // create a new user
      const newUser = await db.users.create({
        data: {
          email,
        },
      });
      console.log("newUser", newUser);
      tokens = await handleRefreshToken(newUser.u_id, email, "user");
      
      // const newUserCouponResult = await insertCouponForNewUser(newUser.u_id);
    }

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      secure: true, // Set to true in production
      sameSite: "strict", // Adjust based on your requirements
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    res.json({ accessToken: tokens.accessToken });
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
    // Part 1: Check if the token is valid
    const isRefreshTokenExist = await db.refresh_token.findUnique({
      where: {
        token: refreshToken,
      },
    }); // Part 2: check if the refresh token is valid, exist
    // need to implement
    if (!isRefreshTokenExist) {
      //Decrypt token and delete all refresh token from user
      deleteAllRefreshTokenFromUser(refreshToken); //commented out for the moment
      return res.status(403).json({ message: "Invalidrefresh token" });
    }
    //Part 3: Check if the token is not expired
    const currentTime = new Date();
    if (currentTime.getTime() > isRefreshTokenExist.expires_at.getTime()) {
      //delete Token from server, return message to front end that says log out
      await db.refresh_token.delete({
        where: { token_id: isRefreshTokenExist.token_id },
      });
      return res.status(401).json({ message: "Session expired. Please log in again." });
    }
    //Part 4: if token exist, select expires_at to get the lifespan to new access Token
    const timeDifference = isRefreshTokenExist.expires_at.getTime() - currentTime.getTime();
    const result = decryptRefreshToken(refreshToken); //How about expired token?? Ans: It will end up in the catch error part
    if (!result) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }
    if (result.email === "error") {
      return res.status(401).json({ message: "Session expired. Please log in again." });
    }
    // const tokenContent: User = { email: result.email, role: result.role } as User;
    const tokenContent: JwtPayload = { email: result.email, role: result.role };
    const newRefreshToken = jwt.sign(tokenContent, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: `${timeDifference}s` });
    const accessToken = jwt.sign(tokenContent, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: "15m" });

    //Part 5: update old token to new token

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
    res.json({ accessToken: accessToken });
  } catch (error) {
    console.log("error", error);
    return res.status(401).json({ message: "Session expired. Please log in again." });
  }
};

export const logout = async (req: Request, res: Response) => {
  // need to implement
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token provided" });
    }
    // Part 1: Check if the token is valid
    const isRefreshTokenExist = await db.refresh_token.findUnique({
      where: {
        token: refreshToken,
      },
    });
    if (!isRefreshTokenExist) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }
    //Part 2: Delete token from server
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
