import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const socketAuth = (socket, next) => {

    const cookies = socket.handshake.headers.cookie;

    if(!cookies){
        return next (new Error('No cookies provided'));
    }

    const parsedCookies = Object.fromEntries(
        cookies.split("; ").map(c => c.split("=").map(decodeURIComponent)) 
    );


    const token = parsedCookies.token;

    if(!token){
        return next(new Error("Authentication token not found"));
    }

    jwt.verify(token, process.env.SECRET, (err, user) => {

        if(err) return next(new Error("Invalid token"));

        socket.user = user;

        next();

    })

}