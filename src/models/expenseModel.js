import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
   
    {
        expenseType: { 
          type: String, 
          required: true, 
        },

        payeeName: { 
          type: String, 
          required: true 
        },

        transactionId: {
          type: String,
          unique: true,
        },
        
          datePaid: { 
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
            required:true
          },
          
    },

    { timestamps: true }, 

);

const ExpenseModel = mongoose.model('Expense', expenseSchema);

export default ExpenseModel