import multer from "multer";
import ShiftManagementModel from "../models/shiftmanagementModel.js";

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

export const postShiftManagement = async (req, res) => {

    const ContentType = req.headers["content-type"];
  
    if (ContentType && ContentType.includes("multipart/form-data")) {
  
      upload.none()(req, res, async (err) => {
        if (err) {
          return res.status(500).json({ status: "error", msg: "Error handling form data" });
        }
  
    try {
  
      const { doctorName, department,specialization,shiftStartDate,shiftEndDate,workDays,shiftHours,shiftType} = req.body;
  
      if (!doctorName || !department||!specialization||!shiftStartDate||!shiftEndDate||!workDays||!shiftHours||!shiftType) {
        return res.status(400).json({ status: "error", message: "All fields are required" });
      }
  
  
      
      const newShiftManagement = await ShiftManagementModel.create({ doctorName, department,specialization,shiftStartDate,shiftEndDate,workDays,shiftHours,shiftType});

      res.status(200).json({ status: "success", message: "Shift Management created successfully!" });
  
    } catch (error) {
      console.error("Error creating shift management:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
    }
    
  )}
  
  };


  export const getShiftManagement = async (req, res) => {
    try {
      const shiftmanagements = await ShiftManagementModel.find();
  
      if (shiftmanagements.length === 0) {
        return res.status(404).json({ status: "error", message: "Shift Management not found" });
      }
  
      res.status(200).json({ status: "success", data: shiftmanagements });
    } catch (error) {
      console.error("Error fetching shiftmanagement:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  };


export const getShiftManagementById = async (req, res) => {
    try {
      const { id } = req.params; 

      const shiftmanagement = await ShiftManagementModel.findById(id); 
  
      if (!shiftmanagement) {
        return res.status(404).json({ status: "error", message: "Shift Management not found" });
      }
  
      res.status(200).json({ status: "success", data: shiftmanagement });
    } catch (error) {
      console.error("Error fetching shift management:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  };


  export const updateShiftManagement = async (req, res) => {

    const ContentType = req.headers["content-type"];
  
    if (ContentType && ContentType.includes("multipart/form-data")) {
  
      upload.none()(req, res, async (err) => {
        if (err) {
          return res.status(500).json({ status: "error", msg: "Error handling form data" });
        }
    try {
      const { id } = req.params;
      const updateData = req.body; 
      const updatedShiftManagement =  await ShiftManagementModel.updateOne({ _id: id }, { $set: updateData });
  
      if (!updatedShiftManagement) {
        return res.status(404).json({ status: "error", message: "Shift Management not found" });
      }
  
      res.status(200).json({ status: "success", message: "Shift Management updated successfully"});

    } catch (error) {
      console.error("Error updating shiftmanagement:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
})
    }
  };

  
  export const deleteShiftManagement = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedShiftManagement = await ShiftManagementModel.deleteOne({ _id: id });
       
      if (!deletedShiftManagement) {
        return res.status(404).json({ status: "error", message: "Shift Management not found" });
      }
  
      res.status(200).json({ status: "success", message: "Shift Management deleted successfully" });
    } catch (error) {
      console.error("Error deleting shift management:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
    
  };


  
