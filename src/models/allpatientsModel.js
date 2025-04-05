import mongoose from "mongoose";

const allpatientsSchema = new mongoose.Schema(
   
    {
        Name: { 
          type: String, 
          required: true, 
         
        },

        Treatment: { 
          type: String, 
          required: true 
        },
        MobileNo: { 
            type: String, 
            unique: true,
            required: true 
          },
          Email: { 
            type: String,
            unique : true, 
            required: true 
          },
          Gender: { 
            type: String, 
            required: true 
          },
          Address: { 
            type: String, 
            required: true 
          },
          AdmissionDate: { 
            type: String, 
            required: true 
          },
          DoctorAssigned: { 
            type: String, 
            required: true 
          },
          BloodGroup: { 
            type: String, 
            required: true 
          },
          MedicalHistoryAttachment: { 
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