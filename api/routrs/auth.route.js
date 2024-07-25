import express from 'express';
import { signin, signup, google,signout } from '../Controllers/auth.controller.js';

const router = express.Router()

router.post("/signup",signup);
router.post("/signin",signin);
router.post("/google", google);
router.get('/signout',signout);

export default router;
