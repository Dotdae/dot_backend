import {Server as SocketServer} from "socket.io";
import { socketAuth } from "./middlewares/socketAuth.js";

export default function configurationChat(server) {

    const io = new SocketServer(server, {
        cors: {
            origin: 'http://localhost:4200', // We have to set the origin to use credentials.
            methods: ['GET', 'POST'],
            credentials: true,
        }
    })

    // Extract user data from JWT.

    io.use(socketAuth);

    // Guardar los usuarios conectados.

    const users = new Map();

    io.on('connection', (socket) => {
        console.log(`Usuario autenticado: ${socket.user.id}`);
    
        // Listening for messages from the client
        socket.on('message', (msg) => {
        console.log('Received message:', msg);
        io.emit('message', msg); // Broadcasting message to all clients
        });
    
        socket.on('disconnect', () => {
        console.log('User disconnected:', socket.user.id);
        });
    });


}