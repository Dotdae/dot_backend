import {Server as SocketServer} from "socket.io";
import { socketAuth } from "./middlewares/socketAuth.js";
import { Employee } from "./models/Employee.model.js";

export default function configurationChat(server) {

    const io = new SocketServer(server, {
        cors: {
            origin: 'https://dot-front-sigma.vercel.app', // Tu dominio de frontend
            methods: ['GET', 'POST'], // Métodos permitidos
            credentials: true, // Si usas cookies o encabezados personalizados
        }
    })

    const users = {};

    io.on("connection", (socket) => {
    
        console.log(`Usuario conectado: ${socket.id}`)
    
        // Registrar al usuario.
    
        socket.on('register', (username) => {
            users[socket.id] = username;
            io.emit('update-users', users); // Enviar lista de usuarios conectados.
        });
    
        // Mensaje privado.
    
        socket.on('private-message', ({ to , message }) => {
            const sender = users[socket.id];
    
            if(to && sender){
                io.to(to).emit("receive-message", { from: sender, message});
            }
        })
    
        // Desconectar al usuario
    
        socket.on('disconnect', () => {
            delete users[socket.id];
            io.emit("update-users", users);
            console.log(`Usuario desconectado: ${socket.id}`);
        })
    
    })

}