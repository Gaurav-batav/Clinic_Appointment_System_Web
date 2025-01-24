import express from 'express';
import { 
  bookAppointment, 
  getAppointments_Admin, 
  deleteAppointments_ByFilter, 
  deleteAppointment_oneByOne, 
  SearchAppointment, 
  updateStatus 
} from '../controllers/appointmentController.js';

const router = express.Router();

// Define routes
router.post('/bookAppointment', bookAppointment); 
router.get('/getAppointments_Admin', getAppointments_Admin); 
router.delete('/deleteAppointments_ByFilter', deleteAppointments_ByFilter); 
router.delete('/deleteAppointment_oneByOne', deleteAppointment_oneByOne);
router.post('/searchAppointment', SearchAppointment);
router.put('/updateStatus', updateStatus);

export default router;
