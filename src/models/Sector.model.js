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
        }
    },
    {
        timestamps: true,
        tableName: 'Sectores'
    }
); 