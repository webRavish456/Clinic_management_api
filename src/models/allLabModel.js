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

const AllLabModel = mongoose.model('AllLab', alllabSchema);

export default AllLabModel