import {Server as SocketServer} from "socket.io";
import { socketAuth } from "./middlewares/socketAuth.js";
import { Employee } from "./models/Employee.model.js";

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

    io.on('connection', async (socket) => {

        const userId = socket.user.id;

        // Aquí recibimos el nombre del usuario directamente desde el frontend
        socket.on('set-user-name', (userName) => {
            users.set(userId, { socketId: socket.id, userName });
            console.log(`Usuario conectado: ${userName} (ID: ${userId})`);
            io.emit('user-list', Array.from(users.values()));
        });
  

        // Event to handle private messages
        socket.on('private-message', ({ recipientId, msg }) => {
            const recipientSocketId = users.get(recipientId); // Aquí obtenemos el socket.id del destinatario.
            if (recipientSocketId) {
                console.log(`Enviando mensaje a ${recipientId} con socket ID ${recipientSocketId}`);
                io.to(recipientSocketId).emit('private-message', {
                    senderId: socket.user.id, // ID del remitente
                    msg,                       // Mensaje
                });
            } else {
                console.log(`Usuario con ID ${recipientId} no está conectado`);
            }
        });
        socket.on('disconnect', () => {
            users.delete(userId);
            console.log(`Usuario ${userId} desconectado`);
            // Enviar lista actualizada de usuarios conectados al frontend
            io.emit('userListUpdate', Array.from(users.entries())); // Actualiza la lista de usuarios conectados
        });
    });


}