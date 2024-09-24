// Database connection.

import {createPool} from "mysql2/promise"
import "dotenv/config"

export const pool = createPool({

    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,

})


