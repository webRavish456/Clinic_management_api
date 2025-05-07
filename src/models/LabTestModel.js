import mongoose from "mongoose";

const labtestSchema = new mongoose.Schema(
   
    {
        
        patientName: { 
          type: String, 
          required: true 
        },

        patient: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "PatientsRecords",
          required: true
        },

        mobileNo: { 
          type: Number, 
          required: true 
        },

        testName: { 
            type: String, 
            required: true 
          },

          labName: { 
            type: String, 
            required: true 
          },
  
          labResult: { 
            type: String, 
          },
    
        status: { 
            type: String, 
            default: "Scheduled"
          },
          
    },

    { timestamps: true }, 

);

const LabTestModel = mongoose.model('LabTest', labtestSchema);

export default LabTestModel