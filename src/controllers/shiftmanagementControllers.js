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
  
      const { name, department,specialization,shiftStartDate,shiftEndDate,workDays,shiftHours,shiftType,availabilityStatus} = req.body;
  
      if (!name || !department||!specialization||!shiftStartDate||!shiftEndDate||!workDays||!shiftHours||!shiftType||!availabilityStatus) {
        return res.status(400).json({ status: "error", message: "All fields are required" });
      }
  
   
      const existingShiftManagement = await ShiftManagementModel.findOne({
        $or: [{ name }, { department },{specialization},{shiftStartDate},{shiftEndDate},{workDays},{shiftHours},{shiftType},{availabilityStatus}]
      });
      
      if (existingShiftManagement) {
        if (existingShiftManagement.name === name) {
          return res.status(400).json({ status: "error", message: "ShiftManagement Name already exists" });
        }
        if (existingShiftManagement.department === department) {
          return res.status(400).json({ status: "error", message: "ShiftManagement Department already exists" });
        }
    
    if (existingShiftManagement.specialization === specialization) {
      return res.status(400).json({ status: "error", message: "ShiftManagement Specialization already exists" });
    }

if (existingShiftManagement.shiftStartDate === shiftStartDate) {
  return res.status(400).json({ status: "error", message: "ShiftManagement ShiftStartDate already exists" });
}

if (existingShiftManagement.shiftEndDate === shiftEndDate) {
  return res.status(400).json({ status: "error", message: "ShiftManagement ShiftEndDate already exists" });
}

if (existingShiftManagement.workDays === workDays) {
  return res.status(400).json({ status: "error", message: "ShiftManagement WorkDays already exists" });
}

if (existingShiftManagement.shiftHours === shiftHours) {
  return res.status(400).json({ status: "error", message: "ShiftManagement ShiftHours already exists" });
}

if (existingShiftManagement.shiftType === shiftType) {
  return res.status(400).json({ status: "error", message: "ShiftManagement ShiftType already exists" });
}

if (existingShiftManagement.availabilityStatus === availabilityStatus) {
  return res.status(400).json({ status: "error", message: "ShiftManagement AvailabilityStatus already exists" });
}




      }
      
      const newShiftManagement = await ShiftManagementModel.create({ name, department,specialization,shiftStartDate,shiftEndDate,workDays,shifttHours,shiftType,availabilityStatus});

      res.status(200).json({ status: "success", message: "ShiftManagement created successfully!" });
  
    } catch (error) {
      console.error("Error creating shiftmanagement:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
    }
    
  )}
  
  };


  export const getShiftManagement = async (req, res) => {
    try {
      const shiftmanagements = await ShiftManagementModel.find();
  
      if (shiftmanagements.length === 0) {
        return res.status(404).json({ status: "error", message: "ShiftManagement not found" });
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
        return res.status(404).json({ status: "error", message: "ShiftManagement not found" });
      }
  
      res.status(200).json({ status: "success", data: shiftmanagement });
    } catch (error) {
      console.error("Error fetching shiftmanagement:", error);
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
        return res.status(404).json({ status: "error", message: "ShiftManagement not found" });
      }
  
      res.status(200).json({ status: "success", message: "ShiftManagement updated successfully"});

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
       
      if (deletedShiftManagement.deletedCount === 0) {
        return res.status(404).json({ status: "error", message: "ShiftManagement not found" });
      }
  
      res.status(200).json({ status: "success", message: "ShiftManagement deleted successfully" });
    } catch (error) {
      console.error("Error deleting shiftmanagement:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
    
  };


  
