import express from 'express'
import { postAdmin } from '../controllers/authControllers.js';
import {deleteDepartment, getDepartment, getDepartmentById, postDepartment, updateDepartment} from '../controllers/departmentControllers.js';
import { deleteAppointment, getAppointment, getAppointmentById, updateAppointment,postAppointment } from '../controllers/appointmentController.js';
import {deleteIncome,getIncome,getIncomeById,updateIncome,postIncome}from'../controllers/incomeControllers.js';
import { deleteExpense,getExpense,getExpenseById,updateExpense,postExpense } from '../controllers/expenseControllers.js';


export const router = express.Router();

/* auth API endpoints */

router.route('/login').post(postAdmin);

/* department */

router.route('/department').post(postDepartment)
router.route('/department').get(getDepartment)
router.route('/department/:id').get(getDepartmentById)
router.route('/department/:id').patch(updateDepartment)
router.route('/department/:id').delete(deleteDepartment)

/* appointment */

router.route('/appointment').post(postAppointment)
router.route('/appointment').get(getAppointment)
router.route('/appointment/:id').get(getAppointmentById)
router.route('/appointment/:id').patch(updateAppointment)
router.route('/appointment/:id').delete(deleteAppointment)

/* income*/

router.route('/income').post(postIncome)
router.route('/income').get(getIncome)
router.route('/income/:id').get(getIncomeById)
router.route('/income/:id').patch(updateIncome)
router.route('/income/:id').delete(deleteIncome)

/* expense */

router.route('/expense').post(postExpense)
router.route('/expense').get(getExpense)
router.route('/expense/:id').get(getExpenseById)
router.route('/expense/:id').patch(updateExpense)
router.route('/expense/:id').delete(deleteExpense)

