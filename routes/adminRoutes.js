import express from 'express';
import { loginAdmin, addAdmin, getAdmin, deleteAdmin } from '../controllers/adminController.js';

const router = express.Router();

router.post('/adminlogin', loginAdmin);
router.post('/addAdmin', addAdmin);
router.get('/getadmin', getAdmin);
router.delete('/deleteAdmin', deleteAdmin);

export default router; // Use `export default` for ESM
