import app from "./app.js";
import { serverTime } from "./config.js"
import './libs/initialSetup.js';

console.log(`[${serverTime()}] Server on port ->`, app.get("port"));