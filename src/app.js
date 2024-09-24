import express from "express"
import morgan from "morgan"

// Settings.

const app = express();

const PORT = process.env.PORT || 4000;

app.set("port", PORT);
app.set("json spaces", 4);

// Routes.

import userRoutes from './routes/user.routes.js';


// Middlewares.

app.use(express.json());
app.use(morgan('dev'));


// Routes.

app.use('/api/users', userRoutes);

app.listen(PORT)

export default app;