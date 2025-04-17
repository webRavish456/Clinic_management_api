import multer from "multer";
import IncomeModel from "../models/incomeModel.js";

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

export const postIncome= async (req, res) => {

    const ContentType = req.headers["content-type"];
  
    if (ContentType && ContentType.includes("multipart/form-data")) {
  
      upload.none()(req, res, async (err) => {
        if (err) {
          return res.status(500).json({ status: "error", msg: "Error handling form data" });
        }
  
    try {
  
      const { sourceName,description,date,amount,paymentMethod} = req.body;
  
      if (!sourceName || !description||  ! date|| !amount || !paymentMethod )  {
        return res.status(400).json({ status: "error", message: "All fields are required" });
      }
  
      
      const newIncome = await IncomeModel.create({ sourceName,description,date,amount,paymentMethod });

      res.status(200).json({ status: "success", message: " Income created successfully!" });
  
    } catch (error) {
      console.error("Error creating income:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
    }
    
  )}
  
  };


  export const getIncome= async (req, res) => {
    try {
      const  Income = await  IncomeModel.find();
  
      if ( Income.length === 0) {
        return res.status(404).json({ status: "error", message: " Income not found" });
      }
  
      res.status(200).json({ status: "success", data: Income});
    } catch (error) {
      console.error("Error fetching  income :", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  };


export const getIncomeById = async (req, res) => {
    try {
      const { id } = req.params; 

      const  income = await  IncomeModel.findById(id); 
  
      if (! income ) {
        return res.status(404).json({ status: "error", message: " Income not found" });
      }
  
      res.status(200).json({ status: "success", data: income });
    } catch (error) {
      console.error("Error fetching  income :", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  };


  export const updateIncome = async (req, res) => {

    const ContentType = req.headers["content-type"];
  
    if (ContentType && ContentType.includes("multipart/form-data")) {
  
      upload.none()(req, res, async (err) => {
        if (err) {
          return res.status(500).json({ status: "error", msg: "Error handling form data" });
        }
    try {
      const { id } = req.params;
      const updateData = req.body; 
      const updatedIncome  =  await  IncomeModel.updateOne({ _id: id }, { $set: updateData });
  
      if (!updatedIncome ) {
        return res.status(404).json({ status: "error", message: " Income  not found" });
      }
  
      res.status(200).json({ status: "success", message: " Income updated successfully"});

    } catch (error) {
      console.error("Error updating income:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
})
    }
  };

  
  export const deleteIncome = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deleteIncome  = await  IncomeModel.deleteOne({ _id: id });
       
      if (!deleteIncome) {
        return res.status(404).json({ status: "error", message: " Income not found" });
      }
  
      res.status(200).json({ status: "success", message: " Income deleted successfully" });
    } catch (error) {
      console.error("Error deleting  income :", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
    
  };