import multer from "multer";
import DepartmentModel from "../models/departmentModel.js";

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

export const postDepartment= async (req, res) => {

    const ContentType = req.headers["content-type"];
  
    if (ContentType && ContentType.includes("multipart/form-data")) {
  
      upload.none()(req, res, async (err) => {
        if (err) {
          return res.status(500).json({ status: "error", msg: "Error handling form data" });
        }
  
    try {
  
      const { departmentName, specialization, departmentHead, description} = req.body;
  
      if (! departmentName || !specialization || !description) {
        return res.status(400).json({ status: "error", message: "All fields are required" });
      }
  
      const existingdepartment = await DepartmentModel.findOne({departmentName});
      
      if(existingdepartment)
      {
        if (existingdepartment.departmentName === departmentName) {
          return res.status(400).json({ status: "error", message: "Department Name already exists" });
        }
      }
      
      const newDepartment = await DepartmentModel.create({ departmentName,specialization,departmentHead,description});

      res.status(200).json({ status: "success", message: "Department created successfully!" });
  
    } catch (error) {
      console.error("Error creating :", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
    }
    
  )}
  
  };


  export const getDepartment = async (req, res) => {
    try {
      const department = await DepartmentModel.find();
    
      res.status(200).json({ status: "success", data: department});
    } catch (error) {
      console.error("Error fetching department:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  };


export const getDepartmentById = async (req, res) => {
    try {
      const { id } = req.params; 

      const department = await DepartmentModel.findById(id); 
  
      if (!department) {
        return res.status(404).json({ status: "error", message: "Department not found" });
      }
  
      res.status(200).json({ status: "success", data:department });
    } catch (error) {
      console.error("Error fetching department:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  };


  export const updateDepartment = async (req, res) => {

    const ContentType = req.headers["content-type"];
  
    if (ContentType && ContentType.includes("multipart/form-data")) {
  
      upload.none()(req, res, async (err) => {
        if (err) {
          return res.status(500).json({ status: "error", msg: "Error handling form data" });
        }
    try {
      const { id } = req.params;
      const updateData = req.body; 
      const updatedDepartment =  await DepartmentModel.updateOne({ _id: id }, { $set: updateData });
  
      if (!updatedDepartment) {
        return res.status(404).json({ status: "error", message: "Department not found" });
      }
  
      res.status(200).json({ status: "success", message: "Department updated successfully"});

    } catch (error) {
      console.error("Error updating department:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
})
    }
  };

  
  export const deleteDepartment = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deleteDepartment = await DepartmentModel.deleteOne({ _id: id });
       
      if (!deleteDepartment) {
        return res.status(404).json({ status: "error", message: "Department not found" });
      }
  
      res.status(200).json({ status: "success", message: "Department deleted successfully" });
    } catch (error) {
      console.error("Error deleting department:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
    
  };