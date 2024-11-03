import { Router } from "express";
import { getSectors, getSector, createSector, updateSector, deleteSector } from "../controllers/sectors.controller.js";

const router = Router();

router.get('/sectors', getSectors);
router.get('/sector/:id', getSector);
router.post('/sector', createSector);
router.put('/sector/:id', updateSector);
router.delete('/sector/:id', deleteSector);

export default router;