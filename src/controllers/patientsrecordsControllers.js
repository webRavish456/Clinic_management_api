import PatientsRecordsModel from "../models/patientsrecordsModel.js";


export const postPatientsRecords = async (req, res) => {

    const ContentType = req.headers["content-type"];
  
    if (ContentType && ContentType.includes("multipart/form-data")) {
  
    try {
      
      const {  patientname, doctornotes,  nextfollowup} = req.body;

      if (! patientname || !doctornotes || !nextfollowup) {
        return res.status(400).json({ status: "error", message: "All fields are required" });
      }
      const labreport = req.imageUrls?.image || null;

   
      const newPatientsRecords = await PatientsRecordsModel.create({  patientname, doctornotes,nextfollowup,  labreport });

      res.status(200).json({ status: "success", message: " Patients Records created successfully!" });
  
    } catch (error) {
      console.error("Error creating allpatients:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
} };


  export const getPatientsRecords = async (req, res) => {
    try {
      const patientsrecords = await PatientsRecordsModel.find().populate("patient");;
  
      if (patientsrecords.length === 0) {
        return res.status(404).json({ status: "error", message: " Patients records not found" });
      }
  
      res.status(200).json({ status: "success", data: patientsrecords });
    } catch (error) {
      console.error("Error fetching patientsrecords:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  };


export const getPatientsRecordsById = async (req, res) => {
    try {
      const { id } = req.params; 

      const patientsrecords = await PatientsRecordsModel.findById(id).populate("patient");; 
  
      if (!patientsrecords) {
        return res.status(404).json({ status: "error", message: "Patients Records not found" });
      }
  
      res.status(200).json({ status: "success", data: patientsrecords });
    } catch (error) {
      console.error("Error fetching allpatients:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  };


  export const updatePatientsRecords = async (req, res) => {

    const ContentType = req.headers["content-type"];
  
    if (ContentType && ContentType.includes("multipart/form-data")) {
   
    try {
      const { id } = req.params;
      const updateData = req.body; 
      
      if (req.imageUrls?.image) {
        updateData.labreport = req.imageUrls.image;
      }

      const uploadPatientRecords =  await PatientsRecordsModel.updateOne({ _id: id }, { $set: updateData }).populate("patient");
  
      if (!updatePatientsRecords) {
        return res.status(404).json({ status: "error", message: "Patients Records not found" });
      }
  
      res.status(200).json({ status: "success", message: "All Patients Records updated successfully"});

    } catch (error) {
      console.error("Error updating patientsrecords:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }

    }
  };

  
  export const deletePatientsRecords = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletePatientsRecords = await PatientsRecordsModel.deleteOne({ _id: id });
       
      if (deletePatientsRecords.deletedCount === 0) {
        return res.status(404).json({ status: "error", message: "All Patients Records not found" });
      }
  
      res.status(200).json({ status: "success", message: "All Patients  Records deleted successfully" });
    } catch (error) {
      console.error("Error deleting allpatients:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
    
  };