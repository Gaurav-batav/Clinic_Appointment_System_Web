import express from 'express';
import { getDoctors, addDoctor, deleteDoctor } from '../controllers/doctorController.js';

const router = express.Router();

router.get('/getDoctor', getDoctors);
router.post('/addDoctor', addDoctor);
router.delete('/deleteDoctor', deleteDoctor);

export default router;
