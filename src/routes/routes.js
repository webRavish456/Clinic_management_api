import express from 'express'
import { postAdmin } from '../controllers/authControllers.js';


export const router = express.Router();

router.route('/login').post(postAdmin);