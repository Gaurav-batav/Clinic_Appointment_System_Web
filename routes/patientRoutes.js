import express from 'express';
import { loginPatient } from '../controllers/patientController.js';

const router = express.Router();

router.post('/login&appointment', loginPatient);

export default router;
