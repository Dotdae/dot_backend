import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Notification = sequelize.define(
    'Notification',
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
        mensaje: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        leido: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        }
    },
    {
        timestamps: true,
        tableName: 'Notificaciones'
    }
);