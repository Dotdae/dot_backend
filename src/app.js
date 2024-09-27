import express from "express"
import morgan from "morgan"
import cors from 'cors'

// Settings.

const app = express();

const PORT = process.env.PORT || 4000;

app.set("port", PORT);
app.set("json spaces", 4);

// Routes.

import employeesRoutes from './routes/employees.routes.js';
import authRoutes from './routes/auth.routes.js';


// Middlewares.

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());


// Routes.

app.use('/api', employeesRoutes);
app.use('/api', authRoutes);

app.listen(PORT)

export default app;