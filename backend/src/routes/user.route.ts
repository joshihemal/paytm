import express from 'express';
import { createUser } from '../controllers/user.controller';
const router = express.Router();

router.route('/signup').post(createUser);

export default router;

// /api/v1/user/signup
// /api/v1/user/signin
// /api/v1/user/changePassword ....