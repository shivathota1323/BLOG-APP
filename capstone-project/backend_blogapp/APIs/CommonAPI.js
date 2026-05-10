import exp from "express";
import { UserModel } from "../models/UserModel.js";
import { hash,compare } from "bcrypt";
//import { hash, compare } from "bcrypt.js";
import { config } from "dotenv";
import jwt from "jsonwebtoken";
import { verifyToken } from "../middlewares/VerifyToken.js";
const { sign } = jwt;
export const commonApp = exp.Router();
import { upload } from "../config/multer.js";
import { uploadToCloudinary } from "../config/cloudinaryUpload.js";
import cloudinary from "../config/cloudinary.js";
config();
const isProduction =
  process.env.NODE_ENV === "production" ||
  process.env.VERCEL === "1" ||
  process.env.RENDER === "true" ||
  Boolean(process.env.RENDER_EXTERNAL_URL) ||
  Boolean(process.env.FRONTEND_URL);

const getAuthCookieOptions = (req) => {
  const isHttps = req.secure || req.get("x-forwarded-proto") === "https";
  const useSecureCookie = isProduction || isHttps;

  return {
    httpOnly: true,
    secure: useSecureCookie,
    sameSite: useSecureCookie ? "none" : "lax",
  };
};

//Route for register
commonApp.post("/users", upload.single("profileImageUrl"), async (req, res) => {
  let cloudinaryResult;
  try {
    let allowedRoles = ["USER", "AUTHOR"];
    //get user from req
    const newUser = req.body;
    console.log(newUser);
    console.log(req.file);

    //check role
    if (!allowedRoles.includes(newUser.role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    //Upload image to cloudinary from memoryStorage
    if (req.file) {
      cloudinaryResult = await uploadToCloudinary(req.file.buffer);
    }

    // console.log("cloudinaryResult", cloudinaryResult);
    //add CDN link(secure_url) of image to newUserObj
    if (cloudinaryResult?.secure_url) {
      newUser.profileImageUrl = cloudinaryResult.secure_url;
    }

    //run validators manually
    //hash password and replace plain with hashed one
    newUser.password = await hash(newUser.password, 12);

    //create New user document
    const newUserDoc = new UserModel(newUser);

    //save document
    await newUserDoc.save();
    //send res
    res.status(201).json({ message: "User created" });
  } catch (err) {
    console.log("err is ", err);
    //delete image from cloudinary
    // if (cloudinaryResult.public_id) {
    //   await cloudinary.uploader.destroy(cloudinaryResult.public_id);
    // }
    // delete image from cloudinary

if (cloudinaryResult && cloudinaryResult.public_id) {
    await cloudinary.uploader.destroy(cloudinaryResult.public_id);
}
    const errCode = err.code ?? err.cause?.code ?? err.errorResponse?.code;
    if (errCode === 11000) {
      return res.status(409).json({ message: "Email already exists" });
    }

    return res.status(500).json({ message: "Registration failed", error: err.message });
  }
});

//Route for Login(USER, AUTHOR and ADMIN)
commonApp.post("/login", async (req, res) => {
  //console.log(req.body)
  //get user cred obj
  const { email, password } = req.body;
  //find user by email
  const user = await UserModel.findOne({ email: email });
  //if use not found
  if (!user) {
    return res.status(400).json({ message: "Invalid email" });
  }
  //compare password
  const isMatched = await compare(password, user.password);
  //if passwords not matched
  if (!isMatched) {
    return res.status(400).json({ message: "Invalid password" });
  }
  //create jwt
  const signedToken = sign(
    {
      id: user._id,
      _id: user._id,
      email: email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      profileImageUrl: user.profileImageUrl,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: "1h",
    },
  );

  //set token to res header as httpOnly cookie
  res.cookie("token", signedToken, getAuthCookieOptions(req));
  //remove password from user document
  let userObj = user.toObject();
  delete userObj.password;

  //send res
  res.status(200).json({ message: "login success", payload: userObj });
});

//Route for Logout
commonApp.get("/logout", (req, res) => {
  //delete token from cookie storage
  res.clearCookie("token", getAuthCookieOptions(req));
  //send res
  res.status(200).json({ message: "Logout success" });
});

//Page refresh
commonApp.get("/check-auth", verifyToken("USER", "AUTHOR", "ADMIN"), (req, res) => {
  res.status(200).json({
    message: "authenticated",
    payload: req.user,
  });
});

//Change password
commonApp.put("/password", verifyToken("USER", "AUTHOR", "ADMIN"), async (req, res) => {
  //check current password and new password are same
  //get current password of user/admin/author
  //check the current password of req and user are not same
  // hash new password
  //replace current password of user with hashed new password
  //save
  //send res
});
