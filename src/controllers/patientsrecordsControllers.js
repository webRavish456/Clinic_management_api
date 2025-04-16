import PatientsRecordsModel from "../models/patientsrecordsModel.js";


export const postPatientsRecords = async (req, res) => {

    const ContentType = req.headers["content-type"];
  
    if (ContentType && ContentType.includes("multipart/form-data")) {
  
    try {
      
      const { patientID, patientname, gender, treatment,  admissionDate,  nextfollowup} = req.body;

      if (! patientID || !patientname ||!gender ||!treatment  ||!admissionDate ||!nextfollowup) {
        return res.status(400).json({ status: "error", message: "All fields are required" });
      }
      const labreport = req.imageUrls?.image || null;

      // const existing = await PatientsRecordsModel.findOne({
      //   $or: [{ email }, { mobileNo }]
      // });
      
      // if (existing) {
      //   if (existing.email === email) {
      //     return res.status(400).json({ status: "error", message: "Email already exists" });
      //   }
      //   if (existing.mobileNo === mobileNo) {
      //     return res.status(400).json({ status: "error", message: "Mobile No already exists" });
      //   }
      // }
   
      const newPatientsRecords = await PatientsRecordsModel.create({ patientID, patientname, gender, treatment, admissionDate, nextfollowup,  labreport });

      res.status(200).json({ status: "success", message: " Patients Records created successfully!" });
  
    } catch (error) {
      console.error("Error creating allpatients:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
} };


  export const getPatientsRecords = async (req, res) => {
    try {
      const patientsrecords = await PatientsRecordsModel.find();
  
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

      const patientsrecords = await PatientsRecordsModel.findById(id); 
  
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

      const uploadPatientRecords =  await PatientsRecordsModel.updateOne({ _id: id }, { $set: updateData });
  
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