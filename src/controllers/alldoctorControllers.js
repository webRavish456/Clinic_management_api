import multer from "multer";
import AllDoctorModel from "../models/alldoctorModel.js";

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

export const postAllDoctor = async (req, res) => {

    const ContentType = req.headers["content-type"];
  
    if (ContentType && ContentType.includes("multipart/form-data")) {
  
      upload.none()(req, res, async (err) => {
        if (err) {
          return res.status(500).json({ status: "error", msg: "Error handling form data" });
        }
  
    try {
  
      const { doctorName, email,mobileNo,address,specialization,experience,qualification,hospitalName,availablity,joiningDate} = req.body;
  
      if (! doctorName ||!email ||!mobileNo||!address||!specialization||!experience||!qualification||!hospitalName||!availablity||!joiningDate) {
        return res.status(400).json({ status: "error", message: "All fields are required" });
      }
  
   
      const existingAllDoctor = await AllDoctorModel.findOne({
        $or: [{ doctorName }, { email },{mobileNo},{address},{specialization},{hospitalName},{availablity},{joiningDate}]
      });
      
      if (existingAllDoctor) {
        if (existingAllDoctor.doctorName === doctorName) {
          return res.status(400).json({ status: "error", message: "AllDoctor Name already exists" });
        }
        if (existingAllDoctor.email === email) {
          return res.status(400).json({ status: "error", message: "AllDoctor Email already exists" });
        }
        if (existingAllDoctor.mobileNo === mobileNo) {
            return res.status(400).json({ status: "error", message: "AllDoctor MobileNo already exists" });
          }
          if (existingAllDoctor.address === address) {
            return res.status(400).json({ status: "error", message: "AllDoctor Address already exists" });
          }
          if (existingAllDoctor.specialization === specialization) {
            return res.status(400).json({ status: "error", message: "AllDoctor Specialization already exists" });
          }
          if (existingAllDoctor.experience === experience) {
            return res.status(400).json({ status: "error", message: "AllDoctor Experience already exists" });
          }
          if (existingAllDoctor.qualification === qualification) {
            return res.status(400).json({ status: "error", message: "AllDoctor Qualification already exists" });
          }
          if (existingAllDoctor.hospitalName === hospitalName) {
            return res.status(400).json({ status: "error", message: "AllDoctor HospitalName already exists" });
          }
      
          if (existingAllDoctor. availablity=== availablity) {
            return res.status(400).json({ status: "error", message: "AllDoctor Availablity already exists" });
          }
      
          if (existingAllDoctor.joiningDate === joiningDate) {
            return res.status(400).json({ status: "error", message: "AllDoctor JoiningDate already exists" });
          }
      
         
      


      
      
      
      
      
      
      
      
      
      }
      
      const newBranch = await AllDoctorModel.create({ doctorName, email,mobileNo,address,specialization,experience,qualification,hospitalName,availablity,joiningDate });

      res.status(200).json({ status: "success", message: "AllDoctor created successfully!" });
  
    } catch (error) {
      console.error("Error creating alldoctor:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
    }
    
  )}
  
  };


  export const getAllDoctor = async (req, res) => {
    try {
      const alldoctors = await AllDoctorModel.find();
  
      if (alldoctors.length === 0) {
        return res.status(404).json({ status: "error", message: "Branch not found" });
      }
  
      res.status(200).json({ status: "success", data: alldoctors });
    } catch (error) {
      console.error("Error fetching branch:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  };


export const getAllDoctorById = async (req, res) => {
    try {
      const { id } = req.params; 

      const alldoctor = await AllDoctorModel.findById(id); 
  
      if (!alldoctor) {
        return res.status(404).json({ status: "error", message: "AllDoctor not found" });
      }
  
      res.status(200).json({ status: "success", data: alldoctor });
    } catch (error) {
      console.error("Error fetching alldoctor:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  };


  export const updateAllDoctor = async (req, res) => {

    const ContentType = req.headers["content-type"];
  
    if (ContentType && ContentType.includes("multipart/form-data")) {
  
      upload.none()(req, res, async (err) => {
        if (err) {
          return res.status(500).json({ status: "error", msg: "Error handling form data" });
        }
    try {
      const { id } = req.params;
      const updateData = req.body; 
      const updatedAllDoctor =  await AllDoctorModel.updateOne({ _id: id }, { $set: updateData });
  
      if (!updatedAllDoctor) {
        return res.status(404).json({ status: "error", message: "AllDoctor not found" });
      }
  
      res.status(200).json({ status: "success", message: "AllDoctor updated successfully"});

    } catch (error) {
      console.error("Error updating alldoctor:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
})
    }
  };

  
  export const deleteAllDoctor = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deleteAllDoctor = await AllDoctorModel.deleteOne({ _id: id });
       
      if (deleteAllDoctor.deletedCount === 0) {
        return res.status(404).json({ status: "error", message: "AllDoctor not found" });
      }
  
      res.status(200).json({ status: "success", message: "AllDoctor deleted successfully" });
    } catch (error) {
      console.error("Error deleting alldocor:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
    
  };


  
