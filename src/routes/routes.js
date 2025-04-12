import express from 'express'

import {deleteDepartment, getDepartment, getDepartmentById, postDepartment, updateDepartment} from '../controllers/departmentControllers.js';
import { deleteAppointment, getAppointment, getAppointmentById, updateAppointment,postAppointment } from '../controllers/appointmentController.js';
import {deleteIncome,getIncome,getIncomeById,updateIncome,postIncome}from'../controllers/incomeControllers.js';
import { deleteExpense,getExpense,getExpenseById,updateExpense,postExpense } from '../controllers/expenseControllers.js';
import { postAdmin, postForgot } from '../controllers/authControllers.js';
import { deleteBranch, getBranch, getBranchById, postBranch, updateBranch } from '../controllers/branchControllers.js';

import { deleteAllDoctor, getAllDoctor,getAllDoctorById, postAllDoctor, updateAllDoctor } from '../controllers/alldoctorControllers.js';
import { deleteShiftManagement, getShiftManagement,getShiftManagementById, postShiftManagement, updateShiftManagement } from '../controllers/shiftmanagementControllers.js';


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

router.route('/forgot-password').post(postForgot);

/* branch */

router.route('/branch').post(postBranch)
router.route('/branch').get(getBranch)
router.route('/branch/:id').get(getBranchById)
router.route('/branch/:id').patch(updateBranch)
router.route('/branch/:id').delete(deleteBranch)


/* patients */
router.route('/alldoctor').post( postAllDoctor)
router.route('/alldoctor').get(getAllDoctor)
router.route('/alldoctor/:id').get(getAllDoctorById)
router.route('/alldoctor/:id').put( updateAllDoctor)
router.route('/alldoctor/:id').delete(deleteAllDoctor)


router.route('/shiftmanagement').post( postShiftManagement)
router.route('/shiftmanagement').get(getShiftManagement)
router.route('/shiftmanagement/:id').get(getShiftManagementById)
router.route('/shiftmanagement/:id').put( updateShiftManagement)
router.route('/shiftmanagement/:id').delete(deleteShiftManagement)
