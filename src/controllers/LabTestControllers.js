import multer from "multer";
import LabTestModel from "../models/LabTestModel.js";
import PatientsRecordsModel from "../models/patientsrecordsModel.js";

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

export const postLabTest= async (req, res) => {

    const ContentType = req.headers["content-type"];
  
    if (ContentType && ContentType.includes("multipart/form-data")) {
  
    try {
  
      const { mobileNo, patientName, testName, labName} = req.body;
  
      if ( ! patientName|| ! testName || ! labName || !mobileNo || !req.imageUrls?.image )  {
        return res.status(400).json({ status: "error", message: "All fields are required" });
      }
  
      const patient= await PatientsRecordsModel.findOne({mobileNo})

      if (patient.patientName !== patientName) {
        return res.status(400).json({ status: "error", message: "Patient not found" });
      }

      const labResult = req.imageUrls?.image;
      
      const newLabTest = await LabTestModel.create({ patientName, patient:patient._id, testName,labName, mobileNo, labResult });

      res.status(200).json({ status: "success", message: "LabTest created successfully!" });
  
    } catch (error) {
      console.error("Error creating labtest:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
}
  
  };


  export const getLabTest = async (req, res) => {
    try {
      const labtest = await LabTestModel.find().populate({  path: 'patient',
        select: 'doctorAssigned treatment'});
   
      res.status(200).json({ status: "success", data: labtest});
    } catch (error) {
      console.error("Error fetching labtest :", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  };


export const getLabTestById = async (req, res) => {
    try {
      const { id } = req.params; 

      const labtest = await LabTestModel.findById(id).populate({  path: 'patient',
        select: 'doctorAssigned treatment'}); 
  
      if (!labtest ) {
        return res.status(404).json({ status: "error", message: "LabTest  not found" });
      }
  
      res.status(200).json({ status: "success", data: labtest });
    } catch (error) {
      console.error("Error fetching labtest :", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  };


  export const updateLabTest  = async (req, res) => {

    const ContentType = req.headers["content-type"];
  
    if (ContentType && ContentType.includes("multipart/form-data")) {
  
        try {
      const { id } = req.params;
      const updateData = req.body; 

         
      if (req.imageUrls?.image) {
        updateData.labResult = req.imageUrls.image;
      }

      const updatedLabTest  =  await LabTestModel.updateOne({ _id: id }, { $set: updateData });
  
      if (!updatedLabTest ) {
        return res.status(404).json({ status: "error", message: "LabTest  not found" });
      }
  
      res.status(200).json({ status: "success", message: "LabTest updated successfully"});

    } catch (error) {
      console.error("Error updating labtest :", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
    }
  };

  
  export const deleteLabTest = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deleteLabTest  = await LabTestModel.deleteOne({ _id: id });
       
      if (!deleteLabTest) {
        return res.status(404).json({ status: "error", message: "LabTest  not found" });
      }
  
      res.status(200).json({ status: "success", message: "LabTest deleted successfully" });
    } catch (error) {
      console.error("Error deleting labtest :", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
    
  };