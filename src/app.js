import express from "express"
import morgan from "morgan"

// Settings.

const app = express();

const PORT = process.env.PORT || 4000;

app.set("port", PORT);
app.set("json spaces", 4);

// Routes.

import employeesRoutes from './routes/employees.routes.js';


// Middlewares.

app.use(express.json());
app.use(morgan('dev'));


// Routes.

app.use('/api/employee', employeesRoutes);

app.listen(PORT)

export default app;