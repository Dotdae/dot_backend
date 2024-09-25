import { Router } from "express";
import { getEmployees, getEmployee, createEmployee } from "../controllers/employees.controller.js";

const router = Router();
 
// Get all employees (Supervisor)
router.get('/employees', getEmployees);

// Get employee (Supervisor)

router.get('/employees/:id', getEmployee);

// Login.

// Register new employee.

router.get('/signup', createEmployee);




export default router;