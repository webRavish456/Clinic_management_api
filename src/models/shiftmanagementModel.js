import mongoose from "mongoose";

const shiftmanagementsSchema = new mongoose.Schema(
   
    {
        name: { 
          type: String, 
          required: true, 
        },
        department: { 
          type: String, 
          required: true 
        },
        specialization: { 
            type: String, 
            required: true,
            unique: true 
          },
          shiftStartDate: { 
            type: String,
            required: true,
            unique : true
          },
          shiftEndDate: { 
            type: String, 
            required: true 
          },
          workDays: { 
            type: String, 
            required: true 
          },
          shiftHours: { 
            type: String, 
            required: true 
          },
          shiftType: { 
            type: String, 
            required: true 
          },
          availabilityStatus: { 
            type: String, 
            required: true 
          },
          
    },

    { timestamps: true }, 

);

const ShiftManagementModel = mongoose.model('ShiftManagement', shiftmanagementsSchema);

export default ShiftManagementModel