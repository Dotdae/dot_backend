import { Router } from "express";
import { signUp } from "../controllers/user.controller.js";

const router = Router();

router.get('/signup', signUp);


export default router;