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
  
          amount: { 
            type: Number, 
            required: true 
          },
  
          paymentMethod: { 
            type: String, 
            required: true 
          },
         
        
    },

    { timestamps: true }, 

);

const IncomeModel = mongoose.model('Income', incomeSchema);

export default IncomeModel