import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
   
    {
        patientName: { 
          type: String, 
          required: true, 
          unique: true, 
        },

        doctorName: { 
          type: String, 
          required: true 
        },

        gender: { 
            type: String, 
            required: true 
          },
  
          date: { 
            type:Date, 
            required: true 
          },
  
          time: { 
            type: String, 
            required: true 
          },
  
          mobile: { 
            type: String, 
            required: true 
          },
  
          email: { 
            type: String, 
            required: true 
          },
  
          visitType: { 
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

const AppointmentModel = mongoose.model('Appointment', appointmentSchema);

export default AppointmentModel