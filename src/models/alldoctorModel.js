import mongoose from "mongoose";

const alldoctorsSchema = new mongoose.Schema(
   
    {
        doctorName: { 
          type: String, 
          required: true, 
        },
        email: { 
          type: String, 
          required: true 
        },
        mobileNo: { 
            type: String, 
            required: true,
            unique: true 
          },
          address: { 
            type: String,
            required: true,
            
          },
          specialization: { 
            type: String, 
            required: true 
          },
          experience: { 
            type: String, 
            required: true 
          },
          qualification: { 
            type: String, 
            required: true 
          },
          hospitalName: { 
            type: String, 
            required: true 
          },
          availability: { 
            type: String, 
            required: true 
          },
          joiningDate: { 
            type: String, 
             
          },
        status: { 
            type: String, 
            default: "active"
          },
          
    },

    { timestamps: true }, 

);

const AllDoctorModel = mongoose.model('AllDoctor', alldoctorsSchema);

export default AllDoctorModel