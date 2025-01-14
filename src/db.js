// Database connection.

import "dotenv/config"
import { Sequelize } from "sequelize"

export const sequelize = new Sequelize(
    process.env.DB_URL,{
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
