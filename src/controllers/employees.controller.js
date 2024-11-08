import { Employee } from "../models/Employee.model.js";
import bcrypt from 'bcryptjs';
import pass from 'secure-random-password';

// Get all employees.

export const getEmployees = async (req, res) => {

    try{

        const data = await Employee.findAll();

        res.json(data);

    }
    catch (error){

        return res.status(500).json({message: 'Something goes wrong.'})

    }

}

// Get specific employee by ID.

export const getEmployee = async (req, res) => {

    try{

        const { id } = req.params;

        const data = await Employee.findAll({
            where: {
                id
            }
        })

        // Check if employee exist.

        if (data.length <= 0){

            return res.status(400).json({message: 'Employee not found'})

        }

        res.json(data[0]);


    }
    catch (error){

        return res.status(500).json({messages: 'Something goes wrong.'})

    }

}

// Register new employee.

export const createEmployee = async (req, res) => {

    try{

        const {nombre, email, edad, direccion, salario, rol} = req.body;

        const roles = ['Empleado', 'Supervisor'];

        // Check is rol is correct.

        if(roles.includes(rol)){
            
            // Generate random password.
    
            const password = pass.randomPassword({
                length: 8,
                characters: pass.digits
            })
    
            const encryptPassword = await bcrypt.hash(password, 10);

            const user = await Employee.create({
                nombre,
                email,
                edad,
                direccion,
                password: encryptPassword,
                salario,
                rol,
                user_image: 'image.jpg'
            })


            const { id } = user.dataValues;

            res.status(201).json(
                {
                "Número de empleado": id, 
                contraseña: password,
                nombre,
                email,
                edad,
                direccion, 
                salario,
                rol
                }
            )

        }
        else{

            return res.status(404).json({message: 'Invalid rol.'})

        }


    }
    catch(error){

        return res.status(500).json({message: "Something goes wrong"});

    }
   
}

// Update employee information.

export const updateEmployee = async (req, res) => {

    try{

        const { id } = req.params;

        const {nombre, edad, direccion, salario} = req.body;

        const data = await Employee.update(
            { nombre, edad, direccion, salario},
            {
                where: {
                    id,
                },
            }
        );

        if(data[0] === 0){

            return res.status(404).json({message: 'Employee not found.'})

        }

        const employeeUpdated = await Employee.findAll({
            where: {
                id
            }
        })

        // Fix response.

        res.json(employeeUpdated);

    }
    catch(error){

        return  res.status(500).json({message: 'Something goes wrong.'})

    }

}

// Delete employee.

export const deleteEmployee = async(req, res) => {

    try{

        const { id } = req.params;


        const data = await Employee.destroy({
            where: {
                id
            }
        });

        if(data === 0){

            return res.status(404).json({message: 'Employee not found.'});

        }

        res.status(204).json({message: 'Employee deleted.'});

    }
    catch(error){

        return res.status(500).json({message: 'Something goes wrong.'})

    }

}
