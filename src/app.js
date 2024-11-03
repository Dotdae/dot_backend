import express from "express"
import morgan from "morgan"
import cors from 'cors'
import cookieParser from "cookie-parser";

// Settings.

const app = express();

const PORT = process.env.PORT || 4000;

app.set("port", PORT);
app.set("json spaces", 4);

// Routes.

import employeesRoutes from './routes/employees.routes.js';
import authRoutes from './routes/auth.routes.js';
import tasksRoutes from './routes/tasks.routes.js';
import sectorsRoutes from './routes/sectors.routes.js';


// Middlewares.

app.use(express.json());
app.use(morgan('dev'));
app.use(cors({
    origin: 'http://localhost:4200', // We have to set the origin to use credentials.
    credentials: true,                // Allow sends cookies.
    allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin'], // Allow custom headers.
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific methods.
}));
app.use(cookieParser());


// Routes.

app.use('/api', employeesRoutes);
app.use('/api', authRoutes);
app.use('/api', tasksRoutes);
app.use('/api', sectorsRoutes);

app.listen(PORT)

export default app;