import mongoose from "mongoose";

const shiftmanagementsSchema = new mongoose.Schema(
   
    {
        doctorName: { 
          type: String, 
          required: true, 
        },
        mobileNo:{
        type:Number,
        required: true,
        },
          shiftStartDate: { 
            type: Date,
            required: true,
          },
          shiftEndDate: { 
            type: Date, 
            required: true 
          },
          workDays: { 
            type: Number, 
            required: true 
          },
          shiftHours: { 
            type: Number, 
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