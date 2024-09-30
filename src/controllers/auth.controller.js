import {pool} from "../db.js";
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';

export const authLogin = async (req, res) => {

    try{

        const {employeeNumber, employeePassword } = req.body;

        const [rows] = await pool.query('SELECT * FROM employee WHERE id = ? ', [employeeNumber]);


         // Check if employee exist.

         if (rows.length <= 0){

            return res.status(400).json({message: 'Employee not found'})

        }

        // Compare password.

        const {password} = rows[0]

        const isMatch = await bcrypt.compare(employeePassword, password)

        if(!isMatch){

            return res.status(400).json({message: 'Password incorrect.'})

        }

        const {id, nombre, edad, direccion, salario, rol} = rows[0];

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