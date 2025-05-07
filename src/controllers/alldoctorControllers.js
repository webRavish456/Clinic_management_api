import DoctorModel from "../models/alldoctorModel.js";
import DepartmentModel from "../models/departmentModel.js";

export const postAllDoctor = async (req, res) => {

  const ContentType = req.headers["content-type"];
     
  if (ContentType && ContentType.includes("multipart/form-data"))  {

      try {
        const {
          doctorName,
          gender,
          dob,
          mobileNumber,
          emailId,
          experience,
          qualification,
          address,
          companyDetails,
          bankDetails
        } = req.body;
   
   const parsedBankDetails = JSON.parse(bankDetails);

   const parsecompanyDetails = JSON.parse(companyDetails)

        if (
          !doctorName ||
          !gender ||
          !dob ||
          !mobileNumber ||
          !emailId ||
          !experience ||
          !qualification ||
          !address ||
          !parsecompanyDetails.branchName ||
          !parsecompanyDetails.specialization ||
          !parsecompanyDetails.salary ||
          !parsecompanyDetails.department ||
          !parsecompanyDetails.assignDepartmentHead ||
          !parsecompanyDetails.joiningDate ||
          !parsedBankDetails.accountHolderName ||
          !parsedBankDetails.accountNumber ||
          !parsedBankDetails.bankName ||
          !parsedBankDetails.ifscCode ||
          !parsedBankDetails.branch ||
          !parsedBankDetails.branchLocation ||
          !req.imageUrls?.resumeCertificate ||
          !req.imageUrls?.highestQualificationCertificate ||
          !req.imageUrls?.panCard ||
          !req.imageUrls?.aadharCard ||
          !req.imageUrls?.licenseCertificate
        ) {
          return res.status(400).json({ status: "error", message: "All fields are required" });
        }
     
      const existingData = await DoctorModel.findOne({
        $or: [{ mobileNumber }, { emailId }]
      });
      

      if (existingData) {
        if (existingData.emailId === emailId) {
          return res.status(400).json({ status: "error", message: " Email Id already exists" });
        }
        if (existingData.mobileNumber == mobileNumber) {
          return res.status(400).json({ status: "error", message: "Mobile Number already exists" });
        }
      }

      const documents = {
        resumeCertificate: req.imageUrls?.resumeCertificate,
        licenseCertificate: req.imageUrls?.licenseCertificate,
        highestQualificationCertificate: req.imageUrls?.highestQualificationCertificate,
        panCard: req.imageUrls?.panCard ,
        aadharCard: req.imageUrls?.aadharCard ,
      };

     const departmentData = await DepartmentModel.findOne({ departmentName: parsecompanyDetails.department });

      if (departmentData) {

          if (parsecompanyDetails.assignDepartmentHead.toLowerCase()==="yes") {

            if(departmentData.departmentHead)
              {
                return res.status(400).json({ status: "error", message: "Department Head already assigned" });
              }
              
           else {
                await DepartmentModel.updateOne(
                { departmentName: parsecompanyDetails.department },
                { $set: { departmentHead: doctorName } }
              );
          }
         }
        
      }

        const newDoctor = await DoctorModel.create({
          doctorName,
          gender,
          dob,
          mobileNumber,
          emailId,
          experience,
          qualification,
          address,
         companyDetails: {
          branchName :parsecompanyDetails.branchName,
          specialization:parsecompanyDetails.specialization,
          department:parsecompanyDetails.department,
          assignDepartmentHead: parsecompanyDetails.assignDepartmentHead,
          salary:parsecompanyDetails.salary,
          joiningDate:parsecompanyDetails.joiningDate,
       },
          documents,
          bankDetails: {
            accountHolderName:parsedBankDetails.accountHolderName,
            accountNumber:parsedBankDetails.accountNumber,
            bankName:parsedBankDetails.bankName,
            ifscCode:parsedBankDetails.ifscCode,
            branch:parsedBankDetails.branch,
            branchLocation:parsedBankDetails.branchLocation
          }
        });

        res.status(200).json({ status: "success", message: "Doctor created successfully!" });
      } catch (error) {
        console.error("Error creating doctor:", error);
        res.status(500).json({ status: "error", message: "Internal server error" });
      }
 
  }
};


  export const getAllDoctor = async (req, res) => {
    try {
      const doctor = await DoctorModel.find();

      res.status(200).json({ status: "success", data: doctor });

    } catch (error) {
      console.error("Error fetching doctor data:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  };


export const getAllDoctorById = async (req, res) => {
  try {
    const { id } = req.params; 

    const doctor = await DoctorModel.findById(id); 

    if (!doctor) {
      return res.status(404).json({ status: "error", message: "Doctor Details not found" });
    }

    res.status(200).json({ status: "success", data: doctor });

  } catch (error) {
    console.error("Error fetching doctor data:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};


 export const updateAllDoctor = async (req, res) => {

    const ContentType = req.headers["content-type"];

    if (ContentType && ContentType.includes("multipart/form-data")) {

      try {

        const { id } = req.params;
        
        const {
          doctorName,
          gender,
          dob,
          mobileNumber,
          emailId,
          experience,
          qualification,
          address,
          companyDetails,
          bankDetails, 
        } = req.body;
      
   
   const parsedBankDetails = JSON.parse(bankDetails);

   const parsecompanyDetails = JSON.parse(companyDetails)

    const doctor = await DoctorModel.findById(id);
  
   

   const documents = {
    resumeCertificate: req.imageUrls?.resumeCertificate ?? doctor.documents?.resumeCertificate ?? null,
    highestQualificationCertificate: req.imageUrls?.highestQualificationCertificate ?? doctor.documents?.highestQualificationCertificate ?? null,
    panCard: req.imageUrls?.panCard ?? doctor.documents?.panCard ?? null,
    aadharCard: req.imageUrls?.aadharCard ?? doctor.documents?.aadharCard ?? null,
    licenseCertificate: req.imageUrls?.licenseCertificate ?? doctor.documents?.licenseCertificate ?? null,
  };



    const updateDoctor = await DoctorModel.updateOne(
      { _id: id },
      {
        $set: {
          doctorName,
          gender,
          dob,
          mobileNumber,
          emailId,
          experience,
          qualification,
          address,
          companyDetails: {
            branchName :parsecompanyDetails.branchName,
            specialization:parsecompanyDetails.specialization,
            department:parsecompanyDetails.department,
            salary:parsecompanyDetails.salary,
            joiningDate:parsecompanyDetails.joiningDate,
          },
          documents,
          bankDetails: {
            accountHolderName: parsedBankDetails.accountHolderName,
            accountNumber: parsedBankDetails.accountNumber,
            bankName: parsedBankDetails.bankName,
            ifscCode: parsedBankDetails.ifscCode,
            branch: parsedBankDetails.branch,
            branchLocation: parsedBankDetails.branchLocation,
          }
        }
      }
    );

    if (!updateDoctor) {
      return res.status(404).json({ status: "error", message: "Doctor Details not found" });
    }
    
    res.status(200).json({ status: "success", message: "Doctor Details updated successfully"});

  } catch (error) {
    console.error("Error updating doctor:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
   }

  }
};


export const deleteAllDoctor = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await DoctorModel.findById(id); 

    const departmentData = await DepartmentModel.findOne({ departmentName: appointment.companyDetails.department });

    if (departmentData) {

        if (appointment.companyDetails.assignDepartmentHead.toLowerCase()==="yes") {

              await DepartmentModel.updateOne(
              { departmentName: appointment.companyDetails.department },
              { $unset: { departmentHead: "" } }
            );
        
       }
      
    }
    const deletedDoctor = await DoctorModel.deleteOne({ _id: id });
     
    if (deletedDoctor.deletedCount === 0) {
      return res.status(404).json({ status: "error", message: "Doctor Details are not found" });
    }

    res.status(200).json({ status: "success", message: "Doctor Details deleted successfully" });

  } 

  catch (error) {

    console.error("Error deleting doctor:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });

  }
  
};