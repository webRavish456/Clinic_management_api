import multer from "multer";
import BranchModel from "../models/branchModel.js";

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

export const postBranch = async (req, res) => {

    const ContentType = req.headers["content-type"];
  
    if (ContentType && ContentType.includes("multipart/form-data")) {
  
      upload.none()(req, res, async (err) => {
        if (err) {
          return res.status(500).json({ status: "error", msg: "Error handling form data" });
        }
  
    try {
  
      const { branchName, branchLocation} = req.body;
  
      if (! branchName || !branchLocation) {
        return res.status(400).json({ status: "error", message: "All fields are required" });
      }
  
   
      const existingBranch = await BranchModel.findOne({
        $or: [{ branchName }, { branchLocation }]
      });
      
      if (existingBranch) {
        if (existingBranch.branchName === branchName) {
          return res.status(400).json({ status: "error", message: "Branch Name already exists" });
        }
        if (existingBranch.branchLocation === branchLocation) {
          return res.status(400).json({ status: "error", message: "Branch Location already exists" });
        }
      }
      
      const newBranch = await BranchModel.create({ branchName, branchLocation });

      res.status(200).json({ status: "success", message: "Branch created successfully!" });
  
    } catch (error) {
      console.error("Error creating branch:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
    }
    
  )}
  
  };


  export const getBranch = async (req, res) => {
    try {
      const branches = await BranchModel.find();
 
      res.status(200).json({ status: "success", data: branches });
    } catch (error) {
      console.error("Error fetching branch:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  };


export const getBranchById = async (req, res) => {
    try {
      const { id } = req.params; 

      const branch = await BranchModel.findById(id); 
  
      if (!branch) {
        return res.status(404).json({ status: "error", message: "Branch not found" });
      }
  
      res.status(200).json({ status: "success", data: branch });
    } catch (error) {
      console.error("Error fetching branch:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  };


  export const updateBranch = async (req, res) => {

    const ContentType = req.headers["content-type"];
  
    if (ContentType && ContentType.includes("multipart/form-data")) {
  
      upload.none()(req, res, async (err) => {
        if (err) {
          return res.status(500).json({ status: "error", msg: "Error handling form data" });
        }
    try {
      const { id } = req.params;
      const updateData = req.body; 
      const updatedBranch =  await BranchModel.updateOne({ _id: id }, { $set: updateData });
  
      if (!updatedBranch) {
        return res.status(404).json({ status: "error", message: "Branch not found" });
      }
  
      res.status(200).json({ status: "success", message: "Branch updated successfully"});

    } catch (error) {
      console.error("Error updating branch:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
})
    }
  };

  
  export const deleteBranch = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedBranch = await BranchModel.deleteOne({ _id: id });
       
      if (deletedBranch.deletedCount === 0) {
        return res.status(404).json({ status: "error", message: "Branch not found" });
      }
  
      res.status(200).json({ status: "success", message: "Branch deleted successfully" });
    } catch (error) {
      console.error("Error deleting branch:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
    
  };


  
