import express from 'express'
import { postAdmin, postForgot } from '../controllers/authControllers.js';
import { deleteBranch, getBranch, getBranchById, postBranch, updateBranch } from '../controllers/branchControllers.js';


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