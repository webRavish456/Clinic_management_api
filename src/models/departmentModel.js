import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema(
   
    {
        departmentName: { 
          type: String, 
          required: true, 
          unique: true, 
        },

        specialization: { 
          type: String, 
          required: true 
        },

        departmentHead: { 
          type: String, 
          required: true 
        },
        description: { 
          type: String, 
          required: true 
        },

        status: { 
          type: String, 
          default:"active"
        },

    },

    { timestamps: true }, 

);

const DepartmentModel = mongoose.model('Department', departmentSchema);

export default DepartmentModel