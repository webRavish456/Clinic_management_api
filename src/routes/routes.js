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
import uploadStaff from '../upload/staff.js';
import { deleteStaff, getStaff, getStaffById, postStaff, updateStaff } from '../controllers/staffControllers.js';
import {deleteAllLab,getAllLab,getAllLabById,updateAllLab,postAllLab } from '../controllers/allLabControllers.js';
import {deleteLabTest,getLabTest,getLabTestById,updateLabTest,postLabTest} from '../controllers/LabTestControllers.js';
import { deleteAllPatients, getAllPatients, getAllPatientsById, postAllPatients, updateAllPatients } from '../controllers/allpatientsControllers.js';
import { getPatientsRecords, postPatientsRecords,getPatientsRecordsById, updatePatientsRecords, deletePatientsRecords, } from '../controllers/patientsrecordsControllers.js';
import uploadPatient from '../upload/patient.js';
import uploadPatientRecords from '../upload/patientsrecords.js';
import uploadDoctor from '../upload/doctor.js';
import uploadProfile from '../upload/profile.js';
import { getProfile, postProfile, updateProfile } from '../controllers/profileControllers.js';
import uploadTest from '../upload/labTest.js';



export const router = express.Router();

/* auth API endpoints */

router.route('/login').post(postAdmin);
router.route('/forgot-password').post(postForgot);


/* branch */

router.route('/branch').post(verifyToken, postBranch);
router.route('/branch').get(verifyToken, getBranch);
router.route('/branch/:id').get(verifyToken, getBranchById);
router.route('/branch/:id').patch(verifyToken, updateBranch);
router.route('/branch/:id').delete(verifyToken, deleteBranch);

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

/* staff */

router.route('/staff').post(verifyToken, uploadStaff, postStaff);
router.route('/staff').get(verifyToken, getStaff);
router.route('/staff/:id').get(verifyToken, getStaffById);
router.route('/staff/:id').patch(verifyToken, uploadStaff, updateStaff);
router.route('/staff/:id').delete(verifyToken, deleteStaff);


/* shiftmanagement */

router.route('/shiftmanagement').post(verifyToken, postShiftManagement)
router.route('/shiftmanagement').get(verifyToken, getShiftManagement)
router.route('/shiftmanagement/:id').get(verifyToken, getShiftManagementById)
router.route('/shiftmanagement/:id').patch(verifyToken, updateShiftManagement)
router.route('/shiftmanagement/:id').delete(verifyToken, deleteShiftManagement)


/* alldoctor */

router.route('/alldoctor').post(verifyToken, uploadDoctor, postAllDoctor)
router.route('/alldoctor').get(verifyToken, getAllDoctor)
router.route('/alldoctor/:id').get(verifyToken, getAllDoctorById)
router.route('/alldoctor/:id').patch(verifyToken, uploadDoctor, updateAllDoctor)
router.route('/alldoctor/:id').delete(verifyToken, deleteAllDoctor)

/* alllab */
router.route('/allpatients').post(verifyToken, uploadPatient, postAllPatients)
router.route('/allpatients').get(verifyToken, getAllPatients)
router.route('/allpatients/:id').get(verifyToken, getAllPatientsById)
router.route('/allpatients/:id').patch(verifyToken, uploadPatient, updateAllPatients)
router.route('/allpatients/:id').delete(verifyToken, deleteAllPatients)

router.route('/patientsrecords').post(verifyToken,  uploadPatientRecords, postPatientsRecords)
router.route('/patientsrecords').get(verifyToken, getPatientsRecords)
router.route('/patientsrecords/:id').get(verifyToken, getPatientsRecordsById)
router.route('/patientsrecords/:id').patch(verifyToken, uploadPatientRecords, updatePatientsRecords)
router.route('/patientsrecords/:id').delete(verifyToken, deletePatientsRecords)



router.route('/alllab').post(verifyToken, postAllLab)
router.route('/alllab').get(verifyToken, getAllLab)
router.route('/alllab/:id').get(verifyToken, getAllLabById)
router.route('/alllab/:id').patch(verifyToken, updateAllLab)
router.route('/alllab/:id').delete(verifyToken, deleteAllLab)

/* labtest */

router.route('/labtest').post(verifyToken, uploadTest, postLabTest)
router.route('/labtest').get(verifyToken, getLabTest)
router.route('/labtest/:id').get(verifyToken, getLabTestById)
router.route('/labtest/:id').patch(verifyToken,uploadTest, updateLabTest)
router.route('/labtest/:id').delete(verifyToken, deleteLabTest)


router.route('/profile').post(verifyToken, uploadProfile, postProfile);
router.route('/profile/:id').get(verifyToken, getProfile);
router.route('/profile/:id').patch(verifyToken, uploadProfile, updateProfile );