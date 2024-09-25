import { Router } from "express";
import { getEmployees, getEmployee, createEmployee, updateEmployee, deleteEmployee } from "../controllers/employees.controller.js";

const router = Router();

// Login/Get employee.

router.get('/employees/:id', getEmployee);

// Supervisor routes.

// Get all employees.

router.get('/employees', getEmployees);

// Register new employee.

router.post('/employees', createEmployee);

// Update employee.

router.put('/employees/:id', updateEmployee);

// Delete employee.

router.delete('/employees/:id', deleteEmployee);


export default router;