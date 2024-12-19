import { Router } from "express";
import { createTask, getAllTasks, getTaskByEmployee, getDoneTasks, updateTask, updateTaskStatus, updateTaskTime, deleteTask } from "../controllers/tasks.controller.js";

const router = Router();

router.get('/tasks', getAllTasks);
router.get('/task/:empleado_id', getTaskByEmployee);
router.get('/done-tasks', getDoneTasks);
router.post('/task/:empleado_id', createTask);
router.put('/task/:id', updateTask);
router.put('/status/:id', updateTaskStatus);
router.put('/time/:id', updateTaskTime);
router.delete('/task/:id', deleteTask);


export default router;