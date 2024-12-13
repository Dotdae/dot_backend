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
    
        // Recibir el nombre del usuario desde el frontend y guardarlo en el Map
        socket.on('set-user-name', (userName) => {
          users.set(userId, { socketId: socket.id, userName });
          console.log(`Usuario conectado: ${userName} (ID: ${userId})`);
    
          // Emitir la lista de usuarios conectados
          io.emit('user-list', Array.from(users.values()));
        });
    
        // Manejar la desconexión de usuarios
        socket.on('disconnect', () => {
          const user = users.get(userId);  // Usar el userId para obtener el usuario
          if (user) {
            console.log(`Usuario ${user.userName} desconectado`);
            users.delete(userId);  // Eliminar al usuario usando su userId
    
            // Emitir la lista de usuarios actualizada después de la desconexión
            io.emit('user-list', Array.from(users.values()));
          } else {
            console.log(`El usuario con ID ${userId} no se encontraba en la lista.`);
          }
        });
      });

}