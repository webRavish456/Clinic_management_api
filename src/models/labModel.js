import mongoose from "mongoose";

const alllabSchema = new mongoose.Schema(
   
    {
        labName: { 
          type: String, 
          required: true,  
        },

        labType: { 
          type: String, 
          required: true 
        },

        assigneeStaff: { 
            type: String, 
            required: true 
          },
  
          shift: { 
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

const AlllabModel = mongoose.model('AllLab', alllabSchema);

export default AlllabModel