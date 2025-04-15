import bcrypt from "bcryptjs";
import AdminModel from "../models/adminModel.js";
import multer from "multer";
import jwt from "jsonwebtoken";


const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

const secretKey = process.env.JWT_SECRET;

export const postAdmin = async (req, res) => {

  const ContentType = req.headers["content-type"];

  if (ContentType && ContentType.includes("multipart/form-data")) {

    upload.none()(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ status: "error", msg: "Error handling form data" });
      }

      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ status: "error", message: "Email and Password are required" });
      }

      try {
        const existingAdmin = await AdminModel.findOne({ email });

        if (!existingAdmin) {
          return res.status(401).json({ status: "error", message: "Invalid credentials" });
        }

        if (!existingAdmin.password) {
          return res.status(500).json({ status: "error", message: "Password field missing in DB" });
        }

        const isPasswordValid = await bcrypt.compare(password, existingAdmin.password);

        if (!isPasswordValid) {
          return res.status(401).json({ status: "error", message: "Invalid credentials" });
        }

        const access_token = jwt.sign(
          { userId: existingAdmin._id, email: existingAdmin.email }, 
          secretKey,
          { expiresIn: "28d" } 
        );

        const expiresIn = 28 * 24 * 60 * 60 * 1000; 
        const expiryDate = new Date(Date.now() + expiresIn).toISOString();

        res.status(200).json({ status: "success", message: "Login Successfully!", access_token,  expiresAt: expiryDate, });

      } catch (error) {
        console.log("Error during login:", error);
        res.status(500).json({ status: "error", message: "Internal server error" });
      }
    });

  } 
};

export const postForgot = async (req, res) => {

  const ContentType = req.headers["content-type"];

  if (ContentType && ContentType.includes("multipart/form-data")) {

    upload.none()(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ status: "error", msg: "Error handling form data" });
      }

  try {

    const { email, password, confirmpassword } = req.body;

    if (!email || !password || !confirmpassword) {
      return res.status(400).json({ status: "error", message: "All fields are required" });
    }

    if (password !== confirmpassword) {
      return res.status(400).json({ status: "error", message: "Passwords do not match" });
    }

    const existingAdmin = await AdminModel.findOne({ email });

    if (!existingAdmin) {
      return res.status(404).json({ status: "error", message: "Admin not found" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await AdminModel.updateOne(
      { email },
      { $set: { password: hashedPassword } }
    );

    res.status(200).json({ status: "success", message: "Password updated successfully!" });

  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
  }
  
)}

};
