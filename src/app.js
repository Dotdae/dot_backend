import express from "express"

// Settings.

const app = express();

const PORT = process.env.PORT || 4000;

app.set("port", PORT);
app.set("json spaces", 4);

// Middlewares.

app.use(express.json());

app.listen(PORT)

export default app;