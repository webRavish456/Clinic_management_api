import { addAdmin } from "../controllers/adminControllers.js";
import AdminModel from "../models/adminModel.js";
import { seed } from "./seed.js";


export const createAdmin = async () => {
       try {
              const adminExist = await AdminModel.findOne({ email: "superadmin@gmail.com" });
              
              if (!adminExist) {

                     for (const admin of seed.admins) {
                            await addAdmin(admin); 
                     } 
                     console.log('Super Admin created successfully.');
                 }
               else {
                     console.log('Super Admin already exists.');
              }
       } catch (error) {
              console.error('Error creating super admin', error);
       }
}; 
