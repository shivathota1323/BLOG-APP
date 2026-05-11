import exp from "express";
import { config } from "dotenv";
import { connect } from "mongoose";
import { userApp } from "./APIs/UserAPI.js";
import { authorApp } from "./APIs/AuthorAPI.js";
import { adminApp } from "./APIs/AdminAPI.js";
import { commonApp } from "./APIs/CommonAPI.js";
import cookieParser from "cookie-parser";
import cors from "cors";
config();
const cors = require("cors");

app.use(cors({
  origin: "https://blog-app-shiva2-l1iaq47lu-shivathota1323s-projects.vercel.app",
  credentials: true
}));

//create express app
const app = exp();
// app.set("trust proxy", 1);
// const localFrontendUrl = "http://localhost:5173";
// const productionFrontendUrls = [
//   "https://blog-app-shiva2-l1iaq47lu-shivathota1323s-projects.vercel.app/",
//   "https://blog-app-shiva2.vercel.app",
// ];
// const frontendUrls = (process.env.FRONTEND_URL || "")
//   .split(",")
//   .map((url) => url.trim())
//   .filter(Boolean);
// const allowedOrigins = [...new Set([localFrontendUrl, ...productionFrontendUrls, ...frontendUrls])];

// //enable cors
// app.use(
//   cors({
//     origin(origin, callback) {
//       if (!origin || allowedOrigins.includes(origin)) {
//         return callback(null, true);
//       }

//       return callback(new Error(`Origin ${origin} is not allowed by CORS`));
//     },
//     credentials: true,
//   }),
// );
//add cookie parser middeleware
app.use(cookieParser())
//body parser middleware
app.use(exp.json());
app.get("/", (req, res) => {
  res.status(200).json({ message: "Blog API is running" });
});

//path level middlewares
app.use("/user-api", userApp);
app.use("/author-api", authorApp);
app.use("/admin-api", adminApp);
app.use("/auth", commonApp);

//connect to db
const connectDB = async () => {
  try {
    if (!process.env.DB_URL) {
      throw new Error("DB_URL environment variable is missing");
    }

    await connect(process.env.DB_URL);
    console.log("DB server connected");
  } catch (err) {
    console.log("err in db connect", err);
  }
};

connectDB();

if (!process.env.VERCEL) {
  //assign port
  const port = process.env.PORT || 5000;
  app.listen(port, () => console.log(`server listening on ${port}..`));
}

//to handle invalid path
app.use((req, res, next) => {
  console.log(req.url);
  res.status(404).json({ message: `path ${req.url} is invalid` });
});

//Error handling middleware
app.use((err, req, res, next) => {
  console.log("error is ",err)
  console.log("Full error:", JSON.stringify(err, null, 2));
  //ValidationError
  if (err.name === "ValidationError") {
    return res.status(400).json({ message: "error occurred", error: err.message });
  }
  //CastError
  if (err.name === "CastError") {
    return res.status(400).json({ message: "error occurred", error: err.message });
  }
  const errCode = err.code ?? err.cause?.code ?? err.errorResponse?.code;
  const keyValue = err.keyValue ?? err.cause?.keyValue ?? err.errorResponse?.keyValue;

  if (errCode === 11000) {
    const field = Object.keys(keyValue)[0];
    const value = keyValue[field];
    return res.status(409).json({
      message: "error occurred",
      error: `${field} "${value}" already exists`,
    });
  }

  //send server side error
  res.status(500).json({ message: "error occurred", error: "Server side error" });
});

export default app;
