import mongoose from "mongoose";

const allpatientsSchema = new mongoose.Schema(
   
    {
        name: { 
          type: String, 
          required: true, 
        },
        treatment: { 
          type: String, 
          required: true 
        },
        mobileNo: { 
            type: String, 
            required: true,
            unique: true 
          },
          email: { 
            type: String,
            required: true,
            unique : true
          },
          gender: { 
            type: String, 
            required: true 
          },
          address: { 
            type: String, 
            required: true 
          },
          admissionDate: { 
            type: Date, 
            required: true 
          },
          doctorAssigned: { 
            type: String, 
            required: true 
          },
          bloodGroup: { 
            type: String, 
            required: true 
          },
          medicalHistory: { 
            type: String, 
             
          },
        status: { 
            type: String, 
            default: "active"
          },
          
    },

    { timestamps: true }, 

);

const AllPatientsModel = mongoose.model('AllPatients', allpatientsSchema);

export default AllPatientsModel