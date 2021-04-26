import express from 'express';
const router = express.Router();

import { authUser, registerUser, getUserProfile } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').post(registerUser);
router.post('/login', authUser);
// Will run the middleware when it is 
router.route('/profile').get(protect, getUserProfile);

export default router;
