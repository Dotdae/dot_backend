import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Task = sequelize.define(
    'Task',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        empleado_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Empleados',
                key: 'id'
            }
        },
        sector_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Sectores',
                key: 'id'
            }
        },
        titulo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('Pendiente', 'En proceso', 'Completada'),
            defaultValue: 'Pendiente',
            allowNull: false
        },
        fecha_limite: {
            type: DataTypes.DATE,
            allowNull: false
        }
    },
    {
        timestamps: true,
        tableName: 'Tareas'
    }
);