import multer from "multer";
import AppointmentModel from "../models/appointmentModel.js";
import PatientsRecordsModel from "../models/patientsrecordsModel.js";
import AllPatientsModel from "../models/allpatientsModel.js";

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

export const postAppointment= async (req, res) => {

    const ContentType = req.headers["content-type"];
  
    if (ContentType && ContentType.includes("multipart/form-data")) {
  
      upload.none()(req, res, async (err) => {
        if (err) {
          return res.status(500).json({ status: "error", msg: "Error handling form data" });
        }
  
    try {
  
      const { patientName, doctorAssigned, treatment, gender, appointmentDate, department, specialization,  mobileNo, emailId, appointmentStatus, visitType} = req.body;
  
      if (! patientName || !doctorAssigned|| !treatment|| ! gender|| !appointmentDate || ! mobileNo|| !specialization || !department ||! emailId ||! appointmentStatus|| ! visitType   )  {
        return res.status(400).json({ status: "error", message: "All fields are required" });
      }

      const existingPatient= await AllPatientsModel.findOne({mobileNo:mobileNo})
 
      if(!existingPatient)
      {
        return res.status(400).json({ status: "error", message: "Patient not found." });
      }
  
      const newAppointment = await AppointmentModel.create({ patientName, doctorAssigned, gender,treatment, appointmentDate, department, specialization, mobileNo, emailId, appointmentStatus, visitType });

      res.status(200).json({ status: "success", message: "Appointment created successfully!" });
  
    } catch (error) {
      console.error("Error creating appointment:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
    }
    
  )}
  
  };


  export const getAppointment = async (req, res) => {
    try {
      const appointment = await AppointmentModel.find();
       res.status(200).json({ status: "success", data: appointment});
    } catch (error) {
      console.error("Error fetching appointment :", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  };


export const getAppointmentById = async (req, res) => {
    try {
      const { id } = req.params; 

      const appointment = await AppointmentModel.findById(id); 
  
      if (!appointment ) {
        return res.status(404).json({ status: "error", message: "Appointment  not found" });
      }
  
      res.status(200).json({ status: "success", data: appointment });
    } catch (error) {
      console.error("Error fetching appointment :", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  };


  export const updateAppointment  = async (req, res) => {

    const ContentType = req.headers["content-type"];
  
    if (ContentType && ContentType.includes("multipart/form-data")) {
  
      upload.none()(req, res, async (err) => {
        if (err) {
          return res.status(500).json({ status: "error", msg: "Error handling form data" });
        }
        
    try {
      const { id } = req.params;
      const updateData = req.body; 
     
      const updatedAppointment  =  await AppointmentModel.updateOne({ _id: id }, { $set: updateData });

      if (!updatedAppointment ) {
        return res.status(404).json({ status: "error", message: "Appointment  not found" });
      }
  
      res.status(200).json({ status: "success", message: "Appointment updated successfully"});

    } catch (error) {
      console.error("Error updating appointment :", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
})
    }
  };

  
  export const deleteAppointment = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deleteAppointment  = await AppointmentModel.deleteOne({ _id: id });
       
      if (!deleteAppointment) {
        return res.status(404).json({ status: "error", message: "Appointment  not found" });
      }
  
      res.status(200).json({ status: "success", message: "Appointment deleted successfully" });
    } catch (error) {
      console.error("Error deleting appointment :", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
    
  };