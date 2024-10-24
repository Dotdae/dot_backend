import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Log = sequelize.define(
    'Log',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_empleado: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Empleados',
                key: 'id'
            }
        },
        tipo_actividad: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    },
    {
        timestamps: true,
        tableName: 'registro_actividades'
    }
);
