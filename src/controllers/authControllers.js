import bcrypt from "bcryptjs";
import AdminModel from "../models/adminModel.js";
import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

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

        res.status(200).json({ status: "success", message: "Login Successfully!" });

      } catch (error) {
        console.log("Error during login:", error);
        res.status(500).json({ status: "error", message: "Internal server error" });
      }
    });

  } 
};
