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
        titulo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        
        categoria:{
            type: DataTypes.ENUM('Reparación', 'Mantenimiento'),
            allowNull: false
        },
        empleado_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Empleados',
                key: 'id'
            }
        },
        prioridad: {
            type: DataTypes.ENUM('Alta', 'Media', 'Baja'),
            allowNull: false
        },
        fecha_limite: {
            type: DataTypes.DATE,
            allowNull: false
        },
        hora_limite: {
            type: DataTypes.TIME,
            allowNull: false
        },
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        sector: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('Pendiente', 'En proceso', 'Completada'),
            defaultValue: 'Pendiente',
            allowNull: false
        },
    },
    {
        timestamps: false,
        tableName: 'tareas'
    }
);