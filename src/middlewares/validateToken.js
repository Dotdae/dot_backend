import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const authRequired = (req, res, next) => {

    const { token } = req.cookies;

    if(token) console.log('Auth')

    if(!token) return res.status(401).json(
        {
            message: "No token, authorization denied"
        }
    )

    jwt.verify(token, process.env.SECRET, (err, user) => {

        if(err) return res.status(403).json({
            message: "Invalid token"
        });

        req.user = user;

        next();

    })

}