import { Employee } from "../models/Employee.model.js";
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';

export const authLogin = async (req, res) => {

    try{

        const {numeroEmpleado, empleadoPassword } = req.body;

        console.log(numeroEmpleado, empleadoPassword)

        const employee = await Employee.findAll({
            where: {
                id: numeroEmpleado,
            }
        });

         // Check if employee exist.

         if (employee.length <= 0){

            return res.status(400).json({message: 'Employee not found'})

        }

        // Compare password.

        const {password} = employee[0].dataValues;

        const isMatch = await bcrypt.compare(empleadoPassword, password)

        if(!isMatch){

            return res.status(400).json({message: 'Password incorrect.'})

        }

        const {id, nombre, edad, direccion, salario, rol} = employee[0].dataValues;

        // Create token.

        const token = await createAccessToken({id})

        // Save token in cookie.

        res.cookie('token', token, {
            httpOnly: true, // Access only in server side.
        }).json({
            id,
            nombre,
            edad,
            direccion,
            salario,
            rol
        })

    }
    catch(error){

        return res.status(500).json({message: 'Something went wrong.'})

    }

}

export const authLogout = async (req, res) => {

    res.cookie('token', '', {
        expires: new Date (0)
    })

    return res.sendStatus(200);

}
