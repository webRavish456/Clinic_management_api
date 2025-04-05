import express from 'express'
import { postAdmin, postForgot } from '../controllers/authControllers.js';
import { deleteBranch, getBranch, getBranchById, postBranch, updateBranch } from '../controllers/branchControllers.js';
import { deleteAllPatients, getAllPatients, getAllPatientsById, postAllPatients, updateAllPatients } from '../controllers/allpatientsControllers.js';
import uploadPatient from '../upload/patient.js';


export const router = express.Router();

/* auth API endpoints */

router.route('/login').post(postAdmin);
router.route('/forgot-password').post(postForgot);

/* branch */

router.route('/branch').post(postBranch)
router.route('/branch').get(getBranch)
router.route('/branch/:id').get(getBranchById)
router.route('/branch/:id').patch(updateBranch)
router.route('/branch/:id').delete(deleteBranch)


/* patients */
router.route('/allpatients').post(uploadPatient, postAllPatients)
router.route('/allpatients').get(getAllPatients)
router.route('/allpatients/:id').get(getAllPatientsById)
router.route('/allpatients/:id').patch(uploadPatient, updateAllPatients)
router.route('/allpatients/:id').delete(deleteAllPatients)
