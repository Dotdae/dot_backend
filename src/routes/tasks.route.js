import { Router } from "express";
import { createTask, getAllTasks, getTask, updateTask, deleteTask } from "../controllers/tasks.controller.js";

const router = Router();

router.get('/tasks', getAllTasks);
router.get('/task/:id', getTask);
router.post('/task', createTask);
router.put('/task/:id', updateTask);
router.delete('/task/:id', deleteTask);


export default router;