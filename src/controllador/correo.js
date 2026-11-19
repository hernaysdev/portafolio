import transporter from "../configMailer.js";

const DESTINO = "hernays12@gmail.com";
const CORREO_VALIDO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LIMITES = { nombre: 100, correo: 150, mensaje: 3000 };
const VENTANA_MS = 10 * 60 * 1000;
const MAX_POR_VENTANA = 5;
const envios = new Map();

const escapar = (txt) => txt.replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
}[c]));

const texto = (valor, max) => (typeof valor === "string" ? valor.trim().slice(0, max) : "");

const superaLimite = (ip) => {
    const ahora = Date.now();
    if (envios.size > 5000) envios.clear();
    const recientes = (envios.get(ip) || []).filter((t) => ahora - t < VENTANA_MS);
    recientes.push(ahora);
    envios.set(ip, recientes);
    return recientes.length > MAX_POR_VENTANA;
};

const correoController = async (req, res) => {
    const nombre = texto(req.body?.nombre, LIMITES.nombre);
    const correo = texto(req.body?.correo, LIMITES.correo);
    const mensaje = texto(req.body?.mensaje, LIMITES.mensaje);

    // Campo trampa: un humano no lo ve, un bot lo llena.
    if (req.body?.sitio) {
        return res.status(200).json({ msg: "Mensaje Enviado" });
    }
    if (!nombre || !CORREO_VALIDO.test(correo) || !mensaje) {
        return res.status(400).json({ msg: "Faltan datos" });
    }
    const ip = req.headers["cf-connecting-ip"] || req.ip;
    if (superaLimite(ip)) {
        return res.status(429).json({ msg: "Demasiados mensajes, intenta más tarde" });
    }

    try {
        await transporter.sendMail({
            from: DESTINO,
            to: DESTINO,
            replyTo: correo,
            subject: `Portafolio: ${nombre.replace(/[\r\n]+/g, " ")}`,
            text: `De: ${nombre} <${correo}>\n\n${mensaje}`,
            html: `<p><b>De:</b> ${escapar(nombre)} &lt;${escapar(correo)}&gt;</p><hr><p style="white-space:pre-wrap">${escapar(mensaje)}</p>`,
        });
        return res.status(200).json({ msg: "Mensaje Enviado" });
    } catch (err) {
        console.error("error enviando correo:", err.message);
        return res.status(500).json({ msg: "Ocurrio un Error Siga Intentando" });
    }
};

export default correoController;
