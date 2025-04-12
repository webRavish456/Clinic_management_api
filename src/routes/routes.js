import express from 'express'
import { postAdmin, postForgot } from '../controllers/authControllers.js';
import { deleteBranch, getBranch, getBranchById, postBranch, updateBranch } from '../controllers/branchControllers.js';

import { deleteAllDoctor, getAllDoctor,getAllDoctorById, postAllDoctor, updateAllDoctor } from '../controllers/alldoctorControllers.js';
import { deleteShiftManagement, getShiftManagement,getShiftManagementById, postShiftManagement, updateShiftManagement } from '../controllers/shiftmanagementControllers.js';


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
