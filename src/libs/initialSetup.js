import { Employee } from "../models/Employee.model.js";

export const createTables = async () => {
    

    await Employee.sync();

}

createTables();

