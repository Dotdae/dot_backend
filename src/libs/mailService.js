import nodemailer from "nodemailer";
import "dotenv/config";


export const mailService = (employeeName, employeeEmail, employeeNumber, employeePassword) => {


    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.USER,
            pass: process.env.PASS
        }
    });

    let messageHTML = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>¡Bienvenido a [Tu Empresa]!</title>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
          color: #333;
        }
        .container {
          max-width: 650px;
          margin: 20px auto;
          background-color: #ffffff;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }
        .header {
          background: linear-gradient(90deg, #00C6FF 0%, #0072FF 100%);
          color: white;
          padding: 40px;
          text-align: center;
          position: relative;
        }
        .header img {
          width: 50px;
          height: 50px;
          position: absolute;
          top: 20px;
          left: 20px;
        }
        .header h1 {
          margin: 0;
          font-size: 28px;
          font-weight: bold;
        }
        .header p {
          margin: 5px 0 0;
          font-size: 16px;
          color: #eee;
        }
        .content {
          padding: 40px;
        }
        .content h2 {
          font-size: 24px;
          color: #0072FF;
        }
        .content p {
          font-size: 16px;
          line-height: 1.6;
          color: #555;
        }
        .content .highlight {
          background-color: #0072FF;
          color: white;
          padding: 12px 20px;
          display: inline-block;
          border-radius: 5px;
          margin: 20px 0;
          font-size: 18px;
        }
        .content .cta-button {
          background-color: #FF6B6B;
          color: white;
          padding: 15px 30px;
          text-decoration: none;
          display: inline-block;
          border-radius: 8px;
          font-size: 16px;
          margin: 20px 0;
        }
        .credentials {
          background-color: #f9f9f9;
          border: 1px solid #ddd;
          padding: 20px;
          border-radius: 8px;
          margin-top: 30px;
        }
        .credentials h3 {
          font-size: 18px;
          color: #0072FF;
        }
        .credentials p {
          font-size: 16px;
          color: #333;
          margin: 5px 0;
        }
        .features {
          display: flex;
          justify-content: space-between;
          margin-top: 40px;
        }
        .feature {
          width: 30%;
          text-align: center;
        }
        .feature img {
          width: 80px;
          height: 80px;
          margin-bottom: 20px;
        }
        .feature h3 {
          font-size: 18px;
          color: #333;
          margin-bottom: 10px;
        }
        .feature p {
          font-size: 14px;
          color: #777;
        }
        .footer {
          background-color: #f4f4f4;
          padding: 20px;
          text-align: center;
          font-size: 12px;
          color: #999;
          margin-top: 40px;
        }
        .footer a {
          color: #0072FF;
          text-decoration: none;
        }
        .footer a:hover {
          text-decoration: underline;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="https://example.com/logo.png" alt="Logo de la Empresa">
          <h1>¡Bienvenido a Taikyo Flow!</h1>
          <p>Nos alegra tenerte con nosotros</p>
        </div>
        <div class="content">
          <h2>Hola ${ employeeName },</h2>
          <p>
            ¡Estamos encantados de darte la bienvenida a TaikyoFlow! A partir de ahora, podrás disfrutar de nuestras exclusivas características y servicios que te ayudarán a alcanzar tus objetivos.
          </p>
          <div class="credentials">
            <h3>Tus credenciales de acceso:</h3>
            <p><strong>Número de empleado:</strong> ${ employeeNumber }</p>
            <p><strong>Contraseña:</strong> ${ employeePassword }</p>
            <p>
              Utiliza estas credenciales para iniciar sesión en nuestro portal de empleados. 
              Te recomendamos cambiar tu contraseña en cuanto inicies sesión por primera vez.
            </p>
          </div>
        <div class="footer">
          <p>© 2024 TaikyoFlow. Todos los derechos reservados.</p>
        </div>
      </div>
    </body>
    </html>
    `;

    // Email config.

    const mailOptions = {

        from: '"TaikyoFlow" <chriswho@gmail.com',
        to: employeeEmail,
        subject: "¡Bienvenido a TaikyoFlow!",
        html: messageHTML,

    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) return console.error(error);
      
      });

}

