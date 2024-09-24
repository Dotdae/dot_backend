// Database connection.

import mysql from "mysql2"
import "dotenv/config"
import { serverTime } from "./config.js"


const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,

})

connection.connect((error) => {

    if(error) console.error(error)
    else{

        console.log(`[${serverTime()}] Databese ${process.env.DB_NAME} is connected!`);

    }


})


