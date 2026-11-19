# Portafolio · Hernays Gonzalez

**🌐 [hernays.dubenails.com](https://hernays.dubenails.com)**

![Portafolio](docs/captura.jpg)

Mi portafolio personal: experiencia, proyectos propios, tecnologías, CV descargable y formulario de contacto.

## Qué tiene

- Una sola página, responsiva y en **español e inglés** (recuerda el idioma elegido).
- Experiencia en línea de tiempo y tarjetas de proyectos con enlaces en vivo.
- **Formulario de contacto** que envía el mensaje por correo, con validación del lado del servidor, HTML escapado, campo trampa contra bots y límite de envíos por IP.
- Sin frameworks en el frontend: HTML, CSS y JavaScript puros, cero dependencias en el navegador.

## Stack

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![Nodemailer](https://img.shields.io/badge/Nodemailer-22B573)

## Correr en local

```bash
npm install
cp .env.example .env   # completar las variables
node src/app.js        # http://localhost:1020 (o el PORT del .env)
```

| Variable | Para qué |
|---|---|
| `PORT` | Puerto del servidor |
| `correo` | Cuenta de Gmail que envía |
| `CLAVEEMAIL` | Contraseña de aplicación de Gmail |

## Despliegue

Node + pm2 en un VPS Linux, publicado detrás de un túnel de Cloudflare.
