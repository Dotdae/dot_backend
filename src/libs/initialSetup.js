import { Employee } from "../models/Employee.model.js";
import { Log } from "../models/Log.model.js";
import { Notification } from "../models/Notification.models.js";
import { Sector } from "../models/Sector.model.js";
import { Task } from "../models/Task.model.js"

export const startDB = async () => {
    
    try {
        
        await Employee.sync();
        await Log.sync();
        await Notification.sync();
        await Sector.sync();
        await Task.sync();
        console.log("Tablas sincronizadas correctamente");


    }
    catch(error){

        console.error("Error al sincronizar las tablas: " ,error)

    }

}

startDB();

