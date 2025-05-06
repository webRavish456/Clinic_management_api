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

    
  
      const { doctorName,mobileNo,shiftStartDate,specialization, department, shiftEndDate,workDays,shiftHours,shiftType,availabilityStatus} = req.body;
  

      if (!doctorName||!mobileNo ||!shiftStartDate||!shiftEndDate|| !specialization || !department || !workDays||!shiftHours||!shiftType||!availabilityStatus) {
        return res.status(400).json({ status: "error", message: "All fields are required" });
      }
  
      const existingShift = await ShiftManagementModel.findOne({mobileNo})

      if(existingShift)
        {
          if (existingShift.mobileNo === existingShift) {
            return res.status(400).json({ status: "error", message: "Already Shift exist" });
          }
        }
      
      const newShiftManagement = await ShiftManagementModel.create({ doctorName,mobileNo, specialization, department, shiftStartDate,shiftEndDate,workDays,shiftHours,shiftType,availabilityStatus});

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


  
