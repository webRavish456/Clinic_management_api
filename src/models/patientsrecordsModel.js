import mongoose from "mongoose";

const patientsrecordsSchema = new mongoose.Schema(
   
    {
     
        patientname: { 
          type: String, 
          required: true, 
        },

        gender: { 
          type: String, 
          required: true 
        },
        treatment: { 
            type: String, 
            required: true 
          },
          admissionDate: { 
            type: String, 
            required: true 
          },
          labreport: { 
            type: String, 
            
          },
          nextfollowup: { 
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

const PatientsRecordsModel = mongoose.model('PatientsRecords', patientsrecordsSchema);

export default PatientsRecordsModel