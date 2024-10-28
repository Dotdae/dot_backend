import { Router } from "express";
import { authLogin, authLogout, authProfile } from "../controllers/auth.controller.js";

const router = Router();

router.post('/login', authLogin);
router.post('/logout', authLogout);
router.get('/profile/:id', authProfile) // Auth required


export default router;