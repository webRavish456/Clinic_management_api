import AllPatientsModel from "../models/allpatientsModel.js";
import AppointmentModel from "../models/appointmentModel.js";
import PatientsRecordsModel from "../models/patientsrecordsModel.js";


export const postPatientsRecords = async (req, res) => {

    const ContentType = req.headers["content-type"];
  
    if (ContentType && ContentType.includes("multipart/form-data")) {
  
    try {
      
      const { mobileNo, patientName, doctorNotes, nextFollowUp} = req.body;

      if (! patientName || !doctorNotes  || !mobileNo) {
        return res.status(400).json({ status: "error", message: "All fields are required" });
      }


      const labReport = req.imageUrls?.image;

      const patient= await AllPatientsModel.findOne({mobileNo})

      
          if (patient?.name !== patientName) {
           return res.status(400).json({ status: "error", message: "Patient not found" });
        }
    
      const appointment= await AppointmentModel.findOne({mobileNo:mobileNo})
        
        if (appointment?.patientName !== patientName) {
          return res.status(400).json({ status: "error", message: "Please make an appointment first" });
        }
     
      const newPatientsRecords = await PatientsRecordsModel.create({ patientName, doctorNotes,  nextFollowUp, labReport, patient, mobileNo, treatment:appointment.treatment, doctorAssigned: appointment.doctorAssigned });

      res.status(200).json({ status: "success", message: " Patients Records created successfully!" });
  
    } catch (error) {
      console.error("Error creating allpatients:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
} };



  export const getPatientsRecords = async (req, res) => {
    try {
      const patientsrecords = await PatientsRecordsModel.find().populate({  path: 'patient',
        select: 'admissionDate status'});
  
      res.status(200).json({ status: "success", data: patientsrecords });
    } catch (error) {
      console.error("Error fetching patientsrecords:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  };


export const getPatientsRecordsById = async (req, res) => {
    try {
      const { id } = req.params; 

      const patientsrecords = await PatientsRecordsModel.findById(id).populate({  path: 'patient',
        select: 'admissionDate status'});
  
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
        updateData.labReport = req.imageUrls.image;
      }

      const patient = await AllPatientsModel.findOne({ mobileNo: updateData.mobileNo });

      await AllPatientsModel.updateOne({ _id: patient._id }, { $set: { status: updateData.status } });

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