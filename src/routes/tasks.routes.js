import { Router } from "express";
import { createTask, getAllTasks, getTaskByEmployee, updateTask, deleteTask } from "../controllers/tasks.controller.js";

const router = Router();

router.get('/tasks', getAllTasks);
router.get('/task/:empleado_id', getTaskByEmployee);
router.post('/task/:empleado_id', createTask);
router.put('/task/:id', updateTask);
router.delete('/task/:id', deleteTask);


export default router;