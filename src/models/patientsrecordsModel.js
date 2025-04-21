import mongoose from "mongoose";

const patientsrecordsSchema = new mongoose.Schema(
   
    {

        patientName: { 
          type: String, 
          required: true, 
        },

        patient: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "AllPatients",
          required: true
        },

        treatment: {
          type: String, 
          required: true,
        },
        
        doctorAssigned: {
          type: String, 
          required: true,
        },
      
        mobileNo: { 
          type: Number, 
          required: true, 
          unique:true,
        },

          labReport: { 
            type: String, 
          },

          nextFollowUp: { 
            type: Date, 
          },

          doctorNotes:{
            type: String,
          }
          
    },

    { timestamps: true }, 

);

const PatientsRecordsModel = mongoose.model('PatientsRecords', patientsrecordsSchema);

export default PatientsRecordsModel