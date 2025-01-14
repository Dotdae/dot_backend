import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Sector = sequelize.define(
    'Sector',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descripcion: {
            type: DataTypes.TEXT
        },
        empleado_id:{
            type: DataTypes.INTEGER,
            allowNull: true
        },
        numero_empleados:{
            type: DataTypes.INTEGER,
            allowNull: true
        },
        status: {
            type: DataTypes.ENUM('Abierto', 'Cerrado'),
            defaultValue: 'Abierto',
            allowNull: false
        }
    },
    {
        timestamps: true,
        tableName: 'sectores'
    }
); 