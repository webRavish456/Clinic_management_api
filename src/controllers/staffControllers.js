import StaffModel from "../models/staffModel.js";


export const postStaff = async (req, res) => {

  const ContentType = req.headers["content-type"];
     
  if (ContentType && ContentType.includes("multipart/form-data"))  {

      try {
        const {
          staffName,
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
          !staffName ||
          !gender ||
          !dob ||
          !mobileNumber ||
          !emailId ||
          !experience ||
          !qualification ||
          !address ||
          !parsecompanyDetails.branchName ||
          !parsecompanyDetails.designation ||
          !parsecompanyDetails.salary ||
          !parsecompanyDetails.shift ||
          !parsecompanyDetails.joiningDate ||
          !parsedBankDetails.accountHolderName ||
          !parsedBankDetails.accountNumber ||
          !parsedBankDetails.bankName ||
          !parsedBankDetails.ifscCode ||
          !parsedBankDetails.branch ||
          !parsedBankDetails.branchLocation,
          !req.imageUrls?.resumeCertificate ||
          !req.imageUrls?.highestQualificationCertificate ||
          !req.imageUrls?.panCard ||
          !req.imageUrls?.aadharCard
        ) {
          return res.status(400).json({ status: "error", message: "All fields are required" });
        }
     

      const existingData = await StaffModel.findOne({
        $or: [{ mobileNumber }, { emailId }]
      });
      
      if (existingData) {
        if (existingData.emailId === emailId) {
          return res.status(400).json({ status: "error", message: " Email Id already exists" });
        }
        if (existingData.mobileNumber === mobileNumber) {
          return res.status(400).json({ status: "error", message: "Mobile Number already exists" });
        }
      }

      const documents = {
        resumeCertificate: req.imageUrls?.resumeCertificate,
        highestQualificationCertificate: req.imageUrls?.highestQualificationCertificate,
        panCard: req.imageUrls?.panCard,
        aadharCard: req.imageUrls?.aadharCard,
      };

        const newStaff = await StaffModel.create({
          staffName,
          gender,
          dob,
          mobileNumber,
          emailId,
          experience,
          qualification,
          address,
         companyDetails: {
          branchName :parsecompanyDetails.branchName,
          designation:parsecompanyDetails.designation,
          salary:parsecompanyDetails.salary,
          joiningDate:parsecompanyDetails.joiningDate,
          shift:parsecompanyDetails.shift,
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

        res.status(200).json({ status: "success", message: "Staff created successfully!" });
      } catch (error) {
        console.error("Error creating staff:", error);
        res.status(500).json({ status: "error", message: "Internal server error" });
      }
 
  }
};


  export const getStaff = async (req, res) => {
    try {

      const staff = await StaffModel.find();
      res.status(200).json({ status: "success", data: staff });
      
    } catch (error) {
      console.error("Error fetching staff data:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  };


export const getStaffById = async (req, res) => {
  try {
    const { id } = req.params; 

    const staff = await StaffModel.findById(id); 

    if (!staff) {
      return res.status(404).json({ status: "error", message: "Staff Details not found" });
    }

    res.status(200).json({ status: "success", data: staff });

  } catch (error) {
    console.error("Error fetching staff data:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};


 export const updateStaff = async (req, res) => {

    const ContentType = req.headers["content-type"];

    if (ContentType && ContentType.includes("multipart/form-data")) {

      try {

        const { id } = req.params;
        
        const {
         staffName,
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

   const staff = await StaffModel.findById(id);
  
   const documents = {
    resumeCertificate: req.imageUrls?.resumeCertificate ?? staff.documents?.resumeCertificate ?? null,
    highestQualificationCertificate: req.imageUrls?.highestQualificationCertificate ?? staff.documents?.highestQualificationCertificate ?? null,
    panCard: req.imageUrls?.panCard ?? staff.documents?.panCard ?? null,
    aadharCard: req.imageUrls?.aadharCard ?? staff.documents?.aadharCard ?? null,
  };

    const updateStaff = await StaffModel.updateOne(
      { _id: id },
      {
        $set: {
          staffName,
          gender,
          dob,
          mobileNumber,
          emailId,
          experience,
          qualification,
          address,
          companyDetails: {
            branchName :parsecompanyDetails.branchName,
            designation:parsecompanyDetails.designation,
            salary:parsecompanyDetails.salary,
            joiningDate:parsecompanyDetails.joiningDate,
            staff:parsecompanyDetails.shift,
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

    if (!updateStaff) {
      return res.status(404).json({ status: "error", message: "Staff Details not found" });
    }
    
    res.status(200).json({ status: "success", message: "Staff Details updated successfully"});

  } catch (error) {
    console.error("Error updating staff:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
   }

  }
};


export const deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedStaff = await StaffModel.deleteOne({ _id: id });
     
    if (deletedStaff.deletedCount === 0) {
      return res.status(404).json({ status: "error", message: "Staff Details are not found" });
    }

    res.status(200).json({ status: "success", message: "Staff Details deleted successfully" });

  } 

  catch (error) {

    console.error("Error deleting staff:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });

  }
  
};