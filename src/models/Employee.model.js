import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Employee = sequelize.define(
    'Employee',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,

        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        edad: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        direccion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        salario:{
            type: DataTypes.FLOAT,
            allowNull: false
        },
        rol: {
            type: DataTypes.ENUM('Empleado', 'Supervisor'),
            defaultValue: 'Empleado',
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('Activo', 'Inactivo'),
            defaultValue: 'Activo',
            allowNull: false
        },
        user_image: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        timestamps: true,
        tableName: 'Empleados'
    }
);