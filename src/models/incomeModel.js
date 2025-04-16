import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema(
   
    {
        sourceName: { 
          type: String, 
          required: true, 
        },

        description: { 
          type: String, 
          required: true 
        },

  
          date: { 
            type: Date, 
            required: true 
          },
  
          time: { 
            type: String, 
            required: true 
          },
  
          amount: { 
            type: String, 
            required: true 
          },
  
          paymentMethod: { 
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

const IncomeModel = mongoose.model('Income', incomeSchema);

export default IncomeModel