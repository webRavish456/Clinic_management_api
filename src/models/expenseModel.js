import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
   
    {
        expenseCategory: { 
          type: String, 
          required: true, 
        },

        payeeName: { 
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
  
        status: { 
            type: String, 
            default: "active"
          },
          
    },

    { timestamps: true }, 

);

const ExpenseModel = mongoose.model('Expense', expenseSchema);

export default ExpenseModel