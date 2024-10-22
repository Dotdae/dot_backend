// Database connection.

import {createPool} from "mysql2/promise"
import "dotenv/config"
import { Sequelize } from "sequelize"

export const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER,
    process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
    }
);

try{

    await sequelize.authenticate()
    .then(() => {

        console.log('Database connected!')

    })
}
catch(error){

    console.error(error);

}

export const pool = createPool({

    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,

})


