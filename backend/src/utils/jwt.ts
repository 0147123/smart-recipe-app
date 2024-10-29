import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import { db } from "../configs/databaseClient";
import { UserDecryptedToken } from "../middlewares/verifyToken";
export type Tokens = {
  refreshToken: string;
  accessToken: string;
};

export async function handleRefreshToken(userId: number, email: string, role: string): Promise<Tokens> {
  // Check the number of refresh tokens the user holds

  const tokens = await db.refresh_token.findMany({
    where: { u_id: userId },
    orderBy: { token_id: "asc" },
  });

  // If the number is more than 5, delete the oldest one
  if (tokens.length >= 3) {
    const oldestTokenId = tokens[0].token_id;
    await db.refresh_token.delete({
      where: { token_id: oldestTokenId },
    });
  }

  // Generate a new refresh token
  const currentTime = new Date().getTime();
  const refreshToken = jwt.sign({email:email,role:role,currentTime:currentTime},process.env.REFRESH_TOKEN_SECRET!,{expiresIn:'30d'});
  const accessToken = jwt.sign({email:email,role:role,currentTime:currentTime},process.env.ACCESS_TOKEN_SECRET!,{expiresIn:'10s'});
  // Store the refresh token in the database
  await db.refresh_token.create({
    data: {
      token: refreshToken,
      u_id: userId,
    },
  });

  // Send the refresh token to the user
  return { refreshToken: refreshToken, accessToken: accessToken };
}

export const decryptAccessToken = (token: string) => {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as UserDecryptedToken;
};

export const decryptRefreshToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!) as UserDecryptedToken;
  } catch (e) {
    const error = { email: "error", role: "error" } as UserDecryptedToken;
    return error;
  }
};

export const dealWithInvalidToken = (token: string) => {};

export const deleteAllRefreshTokenFromUser = async (refreshToken: string) => {
  console.log("called isRefreshTokenExist");
  const userInfo = decryptRefreshToken(refreshToken);
  if (userInfo.email !== "error") {
    const user = await db.users.findUnique({
      where: {
        u_email: userInfo.email,
      },
    });
    console.log("users are ", user);
    if (user) {
      // Delete all refresh tokens for the user
      console.log("Called user function");
      await db.refresh_token.deleteMany({
        where: {
          u_id: user.u_id,
        },
      });
    }
  }
};
