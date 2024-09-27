import {pool} from "../db.js";


export const authLogin = async (req, res) => {

    try{

        const {employeeNumber, employeePassword } = req.body;

        const [rows] = await pool.query('SELECT * FROM employee WHERE id = ? ', [employeeNumber]);

        const {password} = rows[0]

         // Check if employee exist.

         if (rows.length <= 0){

            return res.status(400).json({message: 'Employee not found'})

        }

        if(employeePassword != password){

            return res.status(400).json({message: 'Password incorrect.'})

        }

        res.json(rows[0]);
        
        

    }
    catch(error){

        return res.status(500).json({message: 'Something went wrong.'})

    }

}