import multer from "multer";
import AllPatientsModel from "../models/allpatientsModel.js";

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

export const postAllPatients = async (req, res) => {

    const ContentType = req.headers["content-type"];
  
    if (ContentType && ContentType.includes("multipart/form-data")) {
  
      upload.single('MedicalHistoryAttachment')(req, res, async (err) => {
        if (err) {
          return res.status(500).json({ status: "error", msg: "Error handling form data" });
        }
  
    try {
  
      const { Name, Treatment, MobileNo, Email, Gender, Address, AdmissionDate, DoctorAssigned, BloodGroup} = req.body;
  console.log(req.body)
      if (! Name || !Treatment ||!MobileNo ||!Email ||!Gender ||!Address ||!AdmissionDate ||!DoctorAssigned ||!BloodGroup) {
        return res.status(400).json({ status: "error", message: "All fields are required" });
      }
  
   
      // const existingAllPatients = await AllPatientsModel.findOne({
      //   $or: [{Name }, { Treatment }, {MobileNo}, {Email}, {Gender}, {Address},{AdmissionDate}, {DoctorAssigned},{BloodGroup}, ]
      // });
      
      // if (existingAllPatients) {
      //   if (existingAllPatients.Name === Name) {
      //     return res.status(400).json({ status: "error", message: " Name already exists" });
      //   }
      //   if (existingAllPatients.Treatment === Treatment) {
      //     return res.status(400).json({ status: "error", message: "Treatment already exists" });
      //   }
      //   if (existingAllPatients.MobileNo === MobileNo) {
      //       return res.status(400).json({ status: "error", message: "Mobile No already exists" });
      //     }
      //     if (existingAllPatients.Email === Email) {
      //       return res.status(400).json({ status: "error", message: "Email already exists" });
      //     }
      //     if (existingAllPatients.Gender === Gender) {
      //       return res.status(400).json({ status: "error", message: "Gender already exists" });
      //     }
      //     if (existingAllPatients.Address === Address) {
      //       return res.status(400).json({ status: "error", message: "Address already exists" });
      //     }
      //     if (existingAllPatients.AdmissionDate === AdmissionDate) {
      //       return res.status(400).json({ status: "error", message: "Addmission Date already exists" });
      //     }
      //     if (existingAllPatients.DoctorAssigned === DoctorAssigned) {
      //       return res.status(400).json({ status: "error", message: "Doctor Assigned already exists" });
      //     }
      //     if (existingAllPatients.BloodGroup === BloodGroup) {
      //       return res.status(400).json({ status: "error", message: "Blood Group already exists" });
      //     }
      // }
      
      const newAllPatients = await AllPatientsModel.create({ Name, Treatment, MobileNo, Email, Gender, Address, AdmissionDate, DoctorAssigned, BloodGroup, });

      res.status(200).json({ status: "success", message: "All Patients created successfully!" });
  
    } catch (error) {
      console.error("Error creating allpatients:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
    }
    
  )}
  
  };


  export const getAllPatients = async (req, res) => {
    try {
      const allpatients = await AllPatientsModel.find();
  
      if (allpatients.length === 0) {
        return res.status(404).json({ status: "error", message: "All Patients not found" });
      }
  
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
  
      upload.none()(req, res, async (err) => {
        if (err) {
          return res.status(500).json({ status: "error", msg: "Error handling form data" });
        }
    try {
      const { id } = req.params;
      const updateData = req.body; 
      const updatedAllPatients =  await AllPatientsModel.updateOne({ _id: id }, { $set: updateData });
  
      if (!updatedAllPatients) {
        return res.status(404).json({ status: "error", message: "All Patients not found" });
      }
  
      res.status(200).json({ status: "success", message: "All Patients updated successfully"});

    } catch (error) {
      console.error("Error updating allpatients:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
})
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