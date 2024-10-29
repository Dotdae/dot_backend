import { where } from "sequelize";
import { Task } from "../models/Task.model.js";


// All tasks.

export const getAllTasks = async (req, res) => {

    try {

        const data = await Task.findAll();
        res.json(data);

    }
    catch (error){

        return res.status(500).json({message: 'Something goes wrong.'})
    }

}

// Single task.

export const getTask = async (req, res) => {

    try{

        const { id } = req.params;

        const task = await Task.findOne({
            where: {
                id
            }
        });

        if (!task) return res.status(400).json({ message: 'Task not found'});

        res.json(task);


    }
    catch (error){

        return res.status(500).json({message: 'Something goes wrong.'})

    }

}

// Create new task.

export const createTask = async (req, res) => {

    try{


        // Name, Category, Worker, Priority, Limit_Date, Time, Description

        const {titulo, categoria, empleado_id, prioridad, fecha_limite,  hora_limite, descripcion}  = req.body;

        // TB validate prio and category.

        const newTask = await Task.create({
            titulo,
            categoria,
            empleado_id,
            prioridad,
            fecha_limite,
            hora_limite,
            descripcion
        });


        if(newTask) res.status(201).json({message: 'Task created!'})


    }
    catch (error){

        return res.status(500).json({ message: "Something goes wrong."});

    }

}

// Update task.

export const updateTask = async (req, res) =>{


    try{


        const {id } = req.params;

        const {titulo, categoria, prioridad, fecha_limite,  hora_limite, descripcion}  = req.body;
        
        const taskData = await Task.update(
            {titulo, categoria, prioridad, fecha_limite, hora_limite, descripcion},
            {
                where: {
                    id
                }
            }
        );

        if(taskData[0] === 0){
            return res.status(404).json({message: 'Task not found.'})
        }

        const taskUpdated = await Task.findOne({
            where: {
                id
            }
        });

        res.json(taskUpdated);


    }
    catch(error){

        return res.status(500).json({message: "Something goes wrong."})

    }

}

// Delete task.

export const deleteTask = async (req, res) => {


    try{

        const {id } = req.params;

        const taskData = await Task.destroy({
            where: {
                id
            }
        })

        if(taskData === 0) return res.status(404).json({ message: 'Task not found'});

        res.status(204).json({ message: 'Task deleted.' });

    }
    catch (error){

        return res.status(500).json({message: 'Something goes wrong.'})

    }

}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}