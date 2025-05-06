import AllPatientsModel from "../models/allpatientsModel.js";


export const postAllPatients = async (req, res) => {

    const ContentType = req.headers["content-type"];
  
    if (ContentType && ContentType.includes("multipart/form-data")) {
  
    try {
      
      const { name, mobileNo, email, gender, address, admissionDate, bloodGroup} = req.body;

      if (! name ||!mobileNo ||!email ||!gender ||!address ||!admissionDate  ||!bloodGroup  || !req.imageUrls?.image) {
        return res.status(400).json({ status: "error", message: "All fields are required" });
      }
      const medicalHistory = req.imageUrls?.image;

      const existing = await AllPatientsModel.findOne({
        $or: [{ email }, { mobileNo }]
      });
      
      if (existing) {
        if (existing.email === email) {
          return res.status(400).json({ status: "error", message: "Email already exists" });
        }
        if (existing.mobileNo === mobileNo) {
          return res.status(400).json({ status: "error", message: "Mobile No already exists" });
        }
      }
   
      const newAllPatients = await AllPatientsModel.create({ name, mobileNo, email, gender, address, admissionDate, bloodGroup, medicalHistory });

      res.status(200).json({ status: "success", message: "All Patients created successfully!" });
  
    } catch (error) {
      console.error("Error creating allpatients:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
} };


  export const getAllPatients = async (req, res) => {
    try {
      const allpatients = await AllPatientsModel.find();
    
      res.status(200).json({ status: "success", data: allpatients });
    } catch (error) {
      console.error("Error fetching allpatients:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  };


export const getAllPatientsById = async (req, res) => {
    try {
      const { id } = req.params; 

      const allpatients = await AllPatientsModel.findById(id); 
  
      if (!allpatients) {
        return res.status(404).json({ status: "error", message: "All Patients not found" });
      }
  
      res.status(200).json({ status: "success", data: allpatients });
    } catch (error) {
      console.error("Error fetching allpatients:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  };


  export const updateAllPatients = async (req, res) => {

    const ContentType = req.headers["content-type"];
  
    if (ContentType && ContentType.includes("multipart/form-data")) {
   
    try {
      const { id } = req.params;
      const updateData = req.body; 
      
      if (req.imageUrls?.image) {
        updateData.medicalHistory = req.imageUrls.image;
      }

      const updatedAllPatients =  await AllPatientsModel.updateOne({ _id: id }, { $set: updateData });
  
      if (!updatedAllPatients) {
        return res.status(404).json({ status: "error", message: "All Patients not found" });
      }
  
      res.status(200).json({ status: "success", message: "All Patients updated successfully"});

    } catch (error) {
      console.error("Error updating allpatients:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }

    }
  };

  
  export const deleteAllPatients = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedAllPatients = await AllPatientsModel.deleteOne({ _id: id });
       
      if (deletedAllPatients.deletedCount === 0) {
        return res.status(404).json({ status: "error", message: "All Patients not found" });
      }
  
      res.status(200).json({ status: "success", message: "All Patients deleted successfully" });
    } catch (error) {
      console.error("Error deleting allpatients:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
    
  };