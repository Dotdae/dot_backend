import 'dotenv/config';
import jwt from 'jsonwebtoken';

export async function createAccessToken(payload){

    return new Promise((resolve, rejected) => {

        jwt.sign(payload,process.env.SECRET, {expiresIn: '1d'}, (err, token) =>{

            if(err) rejected(err)

            resolve(token)

        })

    })

}