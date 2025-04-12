import express from 'express'
import { postAdmin, postForgot } from '../controllers/authControllers.js';
import { deleteBranch, getBranch, getBranchById, postBranch, updateBranch } from '../controllers/branchControllers.js';
import { deleteAllPatients, getAllPatients, getAllPatientsById, postAllPatients, updateAllPatients } from '../controllers/allpatientsControllers.js';
import uploadPatient from '../upload/patient.js';
import uploadPatientRecords from '../upload/patientsrecords.js';
import { deletePatientsRecords, getPatientsRecords,  getPatientsRecordsById, postPatientsRecords, updatePatientsRecords } from '../controllers/patientsrecordsControllers.js';
import verifyToken from '../middleware/auth.js';


export const router = express.Router();

/* auth API endpoints */

router.route('/login').post(postAdmin);
router.route('/forgot-password').post(postForgot);

/* branch */

router.route('/branch').post(verifyToken, postBranch)
router.route('/branch').get(verifyToken, getBranch)
router.route('/branch/:id').get(verifyToken, getBranchById)
router.route('/branch/:id').patch(verifyToken, updateBranch)
router.route('/branch/:id').delete(verifyToken, deleteBranch)


/* patients */
router.route('/allpatients').post(verifyToken, uploadPatient, postAllPatients)
router.route('/allpatients').get(verifyToken, getAllPatients)
router.route('/allpatients/:id').get(verifyToken, getAllPatientsById)
router.route('/allpatients/:id').patch(verifyToken, uploadPatient, updateAllPatients)
router.route('/allpatients/:id').delete(verifyToken, deleteAllPatients)
