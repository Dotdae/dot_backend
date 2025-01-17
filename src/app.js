import express from "express"
import http from "http";
import morgan from "morgan"
import cors from 'cors'
import cookieParser from "cookie-parser";
import { Server } from "socket.io";

// Settings.

const app = express();
const server = http.createServer(app);

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
const allowedOrigins = ['https://dot-front-sigma.vercel.app'];
app.use(cors({
    origin: allowedOrigins, // Permite solo tu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
    credentials: true, // Si necesitas enviar cookies o encabezados de autenticación
}));
app.use(cookieParser());

// Socket io.

import configurationChat from "./io.js";

configurationChat(server);

// Routes.

app.use('/api', employeesRoutes);
app.use('/api', authRoutes);
app.use('/api', tasksRoutes);
app.use('/api', sectorsRoutes);

server.listen(PORT)


export default app;