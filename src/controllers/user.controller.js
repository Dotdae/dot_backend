import {pool} from "../db.js";

export const signUp = async (req, res) => {

    try{

        const {nombre, password, edad, direccion, salario} = req.body;

        const [rows] = await pool.query(
            "INSERT INTO employees (nombre, password, edad, direccion, salario) VALUE (?, ?, ?, ?, ?)",
            [nombre, password, edad, direccion, salario]
        )

        res.status(201).json({"Número de empleado": rows.insertId, nombre})

    }
    catch(error){

        return res.status(500).json({message: "Something goes wrong"})

    }
   

}