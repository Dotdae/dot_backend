import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import { Employee } from "./Employee.model.js";

export const Message = sequelize.define("Message", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    EmployeeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Employee, // Modelo al que referencia
            key: "id",       // Llave primaria del modelo Employee
        },
        onUpdate: "CASCADE", // Opcional: Mantener integridad referencial
        onDelete: "CASCADE", // Opcional: Eliminar mensajes si se elimina el empleado
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
   
},
{
    timestamps: true,
    tableName: 'empleados'
})