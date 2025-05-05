import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
   
    {
        patientName: { 
          type: String, 
          required: true, 
          },

        treatment: { 
          type: String, 
          required: true, 
         },

         mobileNo: { 
          type: String, 
          required: true 
        },

        emailId: { 
          type: String, 
          required: true 
        },

        gender: { 
          type: String, 
          required: true 
        },

        department: {
          type: String, 
          required: true 
        },

        specialization: {
          type: String, 
          required: true 
        },
        doctorAssigned: { 
          type: String, 
          required: true 
        },
       appointmentDate: { 
            type:Date, 
            required: true 
          },

          appointmentStatus: { 
            type: String, 
            required: true 
          },

          visitType: { 
            type: String, 
            required: true 
          },        
    },

    { timestamps: true }, 

);

const AppointmentModel = mongoose.model('Appointment', appointmentSchema);

export default AppointmentModel