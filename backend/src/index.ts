// Import modules
import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import http from "http";
import https from "https";
import fs from "fs";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import { setDefaultResultOrder } from "dns";
// import { db } from "./config/databaseClient";
// import jwt from "jsonwebtoken";


// Import routes
import authRoutes from "./routes/authRoutes";
import recipeRoutes from "./routes/recipeRoutes";
import ingredientRoutes from "./routes/ingredientRoutes";
import preferenceRoutes from "./routes/preferenceRoutes";
// import merchantRoutes from "./routes/merchantRoutes";

// Initialize libraries
config();
setDefaultResultOrder("ipv4first");

const app: Express = express();
const devPort: number = 8082;

// Set CORS options
// const whitelist = process.env.ALLOW_ORIGINS!.split(" ");
// const corsOptions = {
//   origin: function (origin: any, callback: any) {
//     console.log("origin is", origin);
//     if (whitelist.indexOf(origin) !== -1) {
//       console.log("allowed by CORS");
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true,
// };

const corsOptionsForTest = {
  credentials: true,
};

// Middleware
app.use(bodyParser.json({ limit: "1mb" }));
app.use(bodyParser.urlencoded({ limit: "1mb", extended: true }));
// app.use(cors(corsOptions));
app.use(cors(corsOptionsForTest));
app.use(cookieParser());

// API routes path
app.use("/auth", authRoutes);
app.use("/recipe", recipeRoutes);
app.use("/ingredient", ingredientRoutes);
app.use("/preference", preferenceRoutes);
// app.get("/testing", async (req: Request, res: Response) => {
//   // const result = await db.refresh_token.create({
//   //   data: {
//   //     token: "test",
//   //     u_id: 1,
//   //   },
//   // });
//   const hi = jwt.sign({ email: "test", role: "merchant" }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: "30d" });
//   res.json({ accessToken: hi });
// });

// Create HTTP server
const httpServer = http.createServer(app);

// Listen on port 8082
httpServer.listen(devPort, () => {
  console.log(`Example app listening on port ${devPort}`);
});
