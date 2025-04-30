import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema(
   
    {
        profilePhoto: { 
          type: String,  
        },

        name: { 
          type: String, 
          required: true 
        },

        mobileNo: { 
          type:Number, 
          required: true,
          unique:true 
        },

        email: { 
          type: String, 
          required: true,
          unique: true, 
        },

        dob: { 
          type: Date, 
          required: true 
        },

        gender: { 
            type: String, 
          },

          address: { 
            type: String, 
            required: true 
          },
       
        password: { 
          type: String, 
          required: true 
        },
          
    },

    { timestamps: true }, 

);

const ProfileModel = mongoose.model('profile', ProfileSchema);

export default ProfileModel