import {pool} from "../db.js";
import bcrypt from 'bcryptjs';
import pass from 'secure-random-password';

// Get all employees.

export const getEmployees = async (req, res) => {

    try{

        const [rows] = await pool.query('SELECT * FROM employee');

        res.json(rows);

    }
    catch (error){

        return res.status(500).json({message: '+Something goes wrong.'})

    }

}

// Get specific employee by ID.

export const getEmployee = async (req, res) => {

    try{

        const { id } = req.params;

        const [rows] = await pool.query('SELECT * FROM employee WHERE id = ?', [id]);

        // Check if employee exist.

        if (rows.length <= 0){

            return res.status(400).json({message: 'Employee not found'})

        }

        res.json(rows[0]);


    }
    catch (error){

        return res.status(500).json({messages: 'Something goes wrong.'})

    }

}


// Register new employee.

export const createEmployee = async (req, res) => {

    try{

        const {nombre, edad, direccion, salario, rol} = req.body;

        const roles = ['Empleado', 'Supervisor'];

        // Check is rol is correct.

        if(roles.includes(rol)){
            
            // Generate random password.
    
            const password = pass.randomPassword({
                length: 8,
                characters: pass.digits
            })
    
            const encryptPassword = await bcrypt.hash(password, 10);
    
            const [rows] = await pool.query(
                "INSERT INTO employee (nombre, password, edad, direccion, salario, rol) VALUE (?, ?, ?, ?, ?, ?)",
                [nombre, encryptPassword, edad, direccion, salario, rol]
            )
    
            res.status(201).json(
                {
                "Número de empleado": rows.insertId, 
                contraseña: password,
                nombre,
                edad,
                direccion, 
                salario
                }
            )

        }
        else{

            return res.status(404).json({message: 'Invalid rol.'})

        }


    }
    catch(error){

        return res.status(500).json({message: "Something goes wrong"})

    }
   
}

// Update employee information.

export const updateEmployee = async (req, res) => {

    try{

        const { id } = req.params;

        const {nombre, edad, direccion, salario} = req.body;

        const [result] = await pool.query('UPDATE employee SET nombre = ?, edad = ?, direccion = ?, salario = ? WHERE id = ?', [nombre, edad, direccion, salario, id]);

        if(result.affectedRows === 0){

            return res.status(404).json({message: 'Employee not found.'})

        }

        const [rows] = await pool.query('SELECT * FROM employee WHERE id = ?', [id]);

        res.json(rows[0]);

    }
    catch(error){

        return  res.status(500).json({message: 'Something goes wrong.'})

    }

}


// Delete employee.

export const deleteEmployee = async(req, res) => {

    try{

        const { id } = req.params;

        const [rows] = await pool.query('DELETE FROM employee WHERE id = ?', [id]);

        if(rows.affectedRows <= 0){

            return res.status(404).json({message: 'Employee not found.'});

        }

        res.status(204).json({message: 'Employee deleted.'});

    }
    catch(error){

        return res.status(500).json({message: 'Something goes wrong.'})

    }

}
