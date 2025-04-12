import express from 'express'
import { postAdmin, postForgot } from '../controllers/authControllers.js';
import { deleteBranch, getBranch, getBranchById, postBranch, updateBranch } from '../controllers/branchControllers.js';

import { deleteAllDoctor, getAllDoctor,getAllDoctorById, postAllDoctor, updateAllDoctor } from '../controllers/alldoctorControllers.js';
import { deleteShiftManagement, getShiftManagement,getShiftManagementById, postShiftManagement, updateShiftManagement } from '../controllers/shiftmanagementControllers.js';
import verifyToken from '../middleware/auth.js';


export const router = express.Router();

/* auth API endpoints */

router.route('/login').post(postAdmin);
router.route('/forgot-password').post(postForgot);

/* branch */

router.route('/branch').post(verifyToken, postBranch)
router.route('/branch').get(verifyToken,getBranch)
router.route('/branch/:id').get(verifyToken,verifyToken,getBranchById)
router.route('/branch/:id').patch(verifyToken,updateBranch)
router.route('/branch/:id').delete(verifyToken,deleteBranch)


/* patients */
router.route('/alldoctor').post(verifyToken,postAllDoctor)
router.route('/alldoctor').get(verifyToken,getAllDoctor)
router.route('/alldoctor/:id').get(verifyToken,getAllDoctorById)
router.route('/alldoctor/:id').put(verifyToken,updateAllDoctor)
router.route('/alldoctor/:id').delete(verifyToken,deleteAllDoctor)


router.route('/shiftmanagement').post(verifyToken,postShiftManagement)
router.route('/shiftmanagement').get(verifyToken,getShiftManagement)
router.route('/shiftmanagement/:id').get(verifyToken,getShiftManagementById)
router.route('/shiftmanagement/:id').put(verifyToken,updateShiftManagement)
router.route('/shiftmanagement/:id').delete(verifyToken,deleteShiftManagement)
