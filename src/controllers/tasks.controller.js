import { Task } from "../models/Task.model.js";
import { Employee } from "../models/Employee.model.js";
import { Sector } from "../models/Sector.model.js";


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

export const getTaskByEmployee = async (req, res) => {

    try{

        const { empleado_id } = req.params;

        const task = await Task.findAll({
            where: {
                empleado_id
            }
        });

        if (!task) return res.status(400).json({ message: 'No se han encontrado tareas para este empleado.'});

        res.json(task);


    }
    catch (error){

        return res.status(500).json({message: 'Something goes wrong.'})

    }

}

export const getDoneTasks = async (req, res) => {

    try{

        const tasks = await Task.findAll({
            where: {
                status: 'Completada'
            }
        })

        if (!tasks) return res.status(400).json({ message: 'No se han encontrado tareas para este empleado.'});

        res.json(tasks);


    }
    catch (error){

        return res.status(500).json({message: 'Something goes wrong.'})

    }

}


// Create new task.

export const createTask = async (req, res) => {

    try{

        const { empleado_id } = req.params

        // Name, Category, Worker, Priority, Limit_Date, Time, Description

        const {titulo, categoria, prioridad, fecha_limite,  hora_limite, descripcion, sector}  = req.body.task;

        await Sector.increment('numero_empleados', { where: { nombre: sector }});

        // TB validate prio and category.

        const newTask = await Task.create({
            titulo,
            categoria,
            empleado_id,
            prioridad,
            fecha_limite,
            hora_limite,
            descripcion,
            sector,
            status: 'Pendiente'
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


        const { id } = req.params;

        const {titulo, categoria, prioridad, fecha_limite, hora_limite, descripcion}  = req.body;
        
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

export const updateTaskStatus = async (req, res) => {

    try{

        const { id } = req.params; 

        const { status } = req.body;

        const taskData = await Task.update(
            { status },
            {
                where: {
                    id
                }
            }
        )

        if(taskData[0] === 0){
            return res.status(404).json({message: 'Task not found.'})
        }

      
        res.status(200);


    }
    catch(error){

        return res.status(500).json({message: "Something goes wrong."})

    }

}

export const updateTaskTime = async (req, res) => {

    try{

        const { id } = req.params; 

        const { hora_limite } = req.body;

        const taskData = await Task.update(
            { hora_limite },
            {
                where: {
                    id
                }
            }
        )

        if(taskData[0] === 0){
            return res.status(404).json({message: 'Task not found.'})
        }

      
        res.status(200);
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
