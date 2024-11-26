import { Router } from "express";
import { authLogin, authLogout} from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.post('/login', authLogin);
router.post('/logout', authRequired, authLogout);
router.get('/test', authRequired, (req, res) => {
    res.json({ message: 'Token válido', user: req.user });
});

export default router;