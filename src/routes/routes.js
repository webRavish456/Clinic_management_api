import express from 'express'
import { postAdmin, postForgot } from '../controllers/authControllers.js';
import { deleteBranch, getBranch, getBranchById, postBranch, updateBranch } from '../controllers/branchControllers.js';
import { deleteAllPatients, getAllPatients, getAllPatientsById, postAllPatients, updateAllPatients } from '../controllers/allpatientsControllers.js';


export const router = express.Router();

router.route('/login').post(postAdmin);
router.route('/forgot').post(postForgot);

router.route('/branch').post(postBranch)
router.route('/branch').get(getBranch)
router.route('/branch/:id').get(getBranchById)
router.route('/branch/:id').put(updateBranch)
router.route('/branch/:id').delete(deleteBranch)
router.route('/allpatients').post(postAllPatients)
router.route('/allpatients').get(getAllPatients)
router.route('/allpatients/:id').get(getAllPatientsById)
router.route('/allpatients/:id').put(updateAllPatients)
router.route('/allpatients/:id').delete(deleteAllPatients)