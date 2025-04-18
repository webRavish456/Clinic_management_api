import mongoose from "mongoose";

const labtestSchema = new mongoose.Schema(
   
    {
        
        patientName: { 
          type: String, 
          required: true 
        },

        patient: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "AllPatients",
          required: true
        },

        testName: { 
            type: String, 
            required: true 
          },
  
          sampleCollectedOn: { 
            type: Date, 
            required: true 
          },
  
          result: { 
            type: String, 
            required: true 
          },
  
          doctorName: { 
            type: String, 
            required: true 
          },
  
          assignedLabTechnician: { 
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

const LabTestModel = mongoose.model('LabTest', labtestSchema);

export default LabTestModel