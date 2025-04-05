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
            required: true 
          },
          email: { 
            type: String, 
            required: true 
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
            type: String, 
            required: true 
          },
          doctorAssigned: { 
            type: String, 
            required: true 
          },
          medicalHistory: { 
            type: String, 
          },
          bloodGroup: { 
            type: String, 
            required: true 
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