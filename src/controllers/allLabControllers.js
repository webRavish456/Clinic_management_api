import multer from "multer";
import AlllabModel from "../models/labModel.js";





const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

export const postAllLab= async (req, res) => {

    const ContentType = req.headers["content-type"];
  
    if (ContentType && ContentType.includes("multipart/form-data")) {
  
      upload.none()(req, res, async (err) => {
        if (err) {
          return res.status(500).json({ status: "error", msg: "Error handling form data" });
        }
  
    try {
  
      const { labName,labType,assigneeStaff,shift} = req.body;
  
      if (! labName || ! labType|| ! assigneeStaff|| ! shift   )  {
        return res.status(400).json({ status: "error", message: "All fields are required" });
      }
  
      
      const newAllLab = await AlllabModel.create({ labName,labType,assigneeStaff,shift });

      res.status(200).json({ status: "success", message: "AllLab created successfully!" });
  
    } catch (error) {
      console.error("Error creating alllab:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
    }
    
  )}
  
  };


  export const getAllLab = async (req, res) => {
   
    try {
      const alllab = await AlllabModel.find();
    
      res.status(200).json({ status: "success", data: alllab});
    } catch (error) {
      console.error("Error fetching alllab :", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  };


export const getAllLabById = async (req, res) => {
    try {
      const { id } = req.params; 

      const alllab = await AllLabModel.findById(id); 
  
      if (!alllab ) {
        return res.status(404).json({ status: "error", message: "AllLab  not found" });
      }
  
      res.status(200).json({ status: "success", data: alllab });
    } catch (error) {
      console.error("Error fetching alllab :", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  };


  export const updateAllLab  = async (req, res) => {

    const ContentType = req.headers["content-type"];
  
    if (ContentType && ContentType.includes("multipart/form-data")) {
  
      upload.none()(req, res, async (err) => {
        if (err) {
          return res.status(500).json({ status: "error", msg: "Error handling form data" });
        }
    try {
      const { id } = req.params;
      const updateData = req.body; 
      const updatedAllLab  =  await AlllabModel.updateOne({ _id: id }, { $set: updateData });
  
      if (!updatedAllLab ) {
        return res.status(404).json({ status: "error", message: "AllLab  not found" });
      }
  
      res.status(200).json({ status: "success", message: "AllLab updated successfully"});

    } catch (error) {
      console.error("Error updating alllab :", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
})
    }
  };

  
  export const deleteAllLab = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deleteAllLab  = await AlllabModel.deleteOne({ _id: id });
       
      if (!deleteAllLab) {
        return res.status(404).json({ status: "error", message: "AllLab  not found" });
      }
  
      res.status(200).json({ status: "success", message: "AllLab deleted successfully" });
    } catch (error) {
      console.error("Error deleting alllab :", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
    
  };