import mongoose from "mongoose";

const branchSchema = new mongoose.Schema(
   
    {
        branchName: { 
          type: String, 
          required: true, 
          unique:true
        },

        branchLocation: { 
          type: String, 
          required: true ,
          unique:true
        },
        status: { 
          type: String, 
          default:"active"
        },
    },

    { timestamps: true }, 

);

const BranchModel = mongoose.model('Branch', branchSchema);

export default BranchModel