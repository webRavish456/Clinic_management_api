import mongoose from "mongoose";

const patientsrecordsSchema = new mongoose.Schema(
   
    {

      patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AllPatients",
        required: true
      },

        patientName: { 
          type: String, 
          required: true, 
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