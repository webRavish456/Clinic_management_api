import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema(
   
  {

    transactionId: {
      type: String,
      unique: true,
    },

    sourceName: {
      type: String,
      required: true, 
    },

    description: {
      type: String,
      required: true, 
    },

    amount: {
      type: Number,
      required: true,
    },

    paymentMethod: {
      type: String,
      required:true
    },

    dateReceived: {
      type: Date,
      default: Date.now,
    },
    
    status: {
      type: String,
      required:true
    },
   
  },
  { timestamps: true }

);

const IncomeModel = mongoose.model('Income', incomeSchema);

export default IncomeModel