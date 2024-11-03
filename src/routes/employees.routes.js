import { Router } from "express";
import { getEmployees, getEmployee, createEmployee, updateEmployee, deleteEmployee } from "../controllers/employees.controller.js";

const router = Router();
// Supervisor routes.

// Get all employees.

router.get('/employees', getEmployees);

// Get employee.

router.get('/employees/:id', getEmployee);

// Register new employee.

router.post('/employees', createEmployee);

// Update employee.

router.put('/employees/:id', updateEmployee);

// Delete employee.

router.delete('/employees/:id', deleteEmployee);


export default router;