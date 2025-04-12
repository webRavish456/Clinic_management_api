import express from 'express'

import {deleteDepartment, getDepartment, getDepartmentById, postDepartment, updateDepartment} from '../controllers/departmentControllers.js';
import { deleteAppointment, getAppointment, getAppointmentById, updateAppointment,postAppointment } from '../controllers/appointmentController.js';
import {deleteIncome,getIncome,getIncomeById,updateIncome,postIncome}from'../controllers/incomeControllers.js';
import { deleteExpense,getExpense,getExpenseById,updateExpense,postExpense } from '../controllers/expenseControllers.js';
import { postAdmin, postForgot } from '../controllers/authControllers.js';
import { deleteBranch, getBranch, getBranchById, postBranch, updateBranch } from '../controllers/branchControllers.js';

import { deleteAllDoctor, getAllDoctor,getAllDoctorById, postAllDoctor, updateAllDoctor } from '../controllers/alldoctorControllers.js';
import { deleteShiftManagement, getShiftManagement,getShiftManagementById, postShiftManagement, updateShiftManagement } from '../controllers/shiftmanagementControllers.js';
import verifyToken from "../middleware/auth.js"

export const router = express.Router();

/* auth API endpoints */

router.route('/login').post(postAdmin);

/* department */

router.route('/department').post(verifyToken, postDepartment)
router.route('/department').get(verifyToken, getDepartment)
router.route('/department/:id').get(verifyToken, getDepartmentById)
router.route('/department/:id').patch(verifyToken, updateDepartment)
router.route('/department/:id').delete(verifyToken, deleteDepartment)

/* appointment */

router.route('/appointment').post(verifyToken, postAppointment)
router.route('/appointment').get(verifyToken, getAppointment)
router.route('/appointment/:id').get(verifyToken ,getAppointmentById)
router.route('/appointment/:id').patch(verifyToken, updateAppointment)
router.route('/appointment/:id').delete(verifyToken, deleteAppointment)

/* income*/

router.route('/income').post(verifyToken, postIncome)
router.route('/income').get(verifyToken, getIncome)
router.route('/income/:id').get(verifyToken, getIncomeById)
router.route('/income/:id').patch(verifyToken, updateIncome)
router.route('/income/:id').delete(verifyToken, deleteIncome)

/* expense */

router.route('/expense').post(verifyToken, postExpense)
router.route('/expense').get(verifyToken, getExpense)
router.route('/expense/:id').get(verifyToken, getExpenseById)
router.route('/expense/:id').patch(verifyToken, updateExpense)
router.route('/expense/:id').delete(verifyToken, deleteExpense)

router.route('/forgot-password').post(postForgot);

/* branch */

router.route('/branch').post(verifyToken, postBranch)
router.route('/branch').get(verifyToken, getBranch)
router.route('/branch/:id').get(verifyToken, getBranchById)
router.route('/branch/:id').patch(verifyToken, updateBranch)
router.route('/branch/:id').delete(verifyToken, deleteBranch)


/* patients */
router.route('/alldoctor').post(verifyToken, postAllDoctor)
router.route('/alldoctor').get(verifyToken, getAllDoctor)
router.route('/alldoctor/:id').get(verifyToken, getAllDoctorById)
router.route('/alldoctor/:id').put(verifyToken, updateAllDoctor)
router.route('/alldoctor/:id').delete(verifyToken, deleteAllDoctor)


router.route('/shiftmanagement').post(verifyToken, postShiftManagement)
router.route('/shiftmanagement').get(verifyToken, getShiftManagement)
router.route('/shiftmanagement/:id').get(verifyToken,getShiftManagementById)
router.route('/shiftmanagement/:id').put(verifyToken, updateShiftManagement)
router.route('/shiftmanagement/:id').delete(verifyToken,deleteShiftManagement)
