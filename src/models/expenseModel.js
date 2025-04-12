import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
   
    {
        expenseCategory: { 
          type: String, 
          required: true, 
          unique: true, 
        },

        payeeName: { 
          type: String, 
          required: true 
        },

          date: { 
            type: String, 
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

const ExpenseModel = mongoose.model('Expense', expenseSchema);

export default ExpenseModel