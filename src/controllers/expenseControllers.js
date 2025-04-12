import multer from "multer";
import ExpenseModel from "../models/expenseModel.js";

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

export const postExpense= async (req, res) => {

    const ContentType = req.headers["content-type"];
  
    if (ContentType && ContentType.includes("multipart/form-data")) {
  
      upload.none()(req, res, async (err) => {
        if (err) {
          return res.status(500).json({ status: "error", msg: "Error handling form data" });
        }
  
    try {
  
      const { expenseCategory,payeeName,date,time,amount,paymentMethod} = req.body;
  
      if (! expenseCategory || !payeeName|| ! date|| ! time|| ! amount|| !  paymentMethod  )  {
        return res.status(400).json({ status: "error", message: "All fields are required" });
      }
  
      
      const newExpense = await  ExpenseModel.create({ expenseCategory,payeeName,date,time,amount,paymentMethod});

      res.status(200).json({ status: "success", message: " Expense created successfully!" });
  
    } catch (error) {
      console.error("Error creating  expense:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
    }
    
  )}
  
  };


  export const getExpense = async (req, res) => {
    try {
      const  expense = await  ExpenseModel.find();
  
      if (expense.length === 0) {
        return res.status(404).json({ status: "error", message: " Expense not found" });
      }
  
      res.status(200).json({ status: "success", data:  expense});
    } catch (error) {
      console.error("Error fetching  expense :", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  };


export const getExpenseById = async (req, res) => {
    try {
      const { id } = req.params; 

      const expense = await  ExpenseModel.findById(id); 
  
      if (! expense ) {
        return res.status(404).json({ status: "error", message: " Expense not found" });
      }
  
      res.status(200).json({ status: "success", data:  expense });
    } catch (error) {
      console.error("Error fetching  expense :", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  };


  export const updateExpense = async (req, res) => {

    const ContentType = req.headers["content-type"];
  
    if (ContentType && ContentType.includes("multipart/form-data")) {
  
      upload.none()(req, res, async (err) => {
        if (err) {
          return res.status(500).json({ status: "error", msg: "Error handling form data" });
        }
    try {
      const { id } = req.params;
      const updateData = req.body; 
      const updatedExpense  =  await  ExpenseModel.updateOne({ _id: id }, { $set: updateData });
  
      if (!updatedExpense ) {
        return res.status(404).json({ status: "error", message: " Expense  not found" });
      }
  
      res.status(200).json({ status: "success", message: " Expense updated successfully"});

    } catch (error) {
      console.error("Error updating  expense :", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
})
    }
  };

  
  export const deleteExpense= async (req, res) => {
    try {
      const { id } = req.params;
  
      const deleteExpense  = await  ExpenseModel.deleteOne({ _id: id });
       
      if (!deleteExpense) {
        return res.status(404).json({ status: "error", message: " Expense  not found" });
      }
  
      res.status(200).json({ status: "success", message: " Expense deleted successfully" });
    } catch (error) {
      console.error("Error deleting  expense :", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
    
  };