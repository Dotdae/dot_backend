import {pool} from "../db.js";

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

        const {nombre, password, edad, direccion, salario} = req.body;

        const [rows] = await pool.query(
            "INSERT INTO employee (nombre, password, edad, direccion, salario) VALUE (?, ?, ?, ?, ?)",
            [nombre, password, edad, direccion, salario]
        )

        res.status(201).json({"Número de empleado": rows.insertId, nombre})

    }
    catch(error){

        return res.status(500).json({message: "Something goes wrong"})

    }
   
}

export const login = async (req, res) => {





}