import bcrypt from "bcryptjs";
import AdminModel from "../models/adminModel.js";

export const addAdmin = async (adminData) => {

    const hashedPassword = await bcrypt.hash(adminData.password, 10);
    const admin = {

           email: adminData.email,
           password: hashedPassword,
    };
    const createdAdmin = await AdminModel.create(admin);
    return createdAdmin;
};

