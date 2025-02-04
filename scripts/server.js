require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt"); // Para encriptar contraseñas
const connection = require("./db"); // Conexión a MySQL

const app = express();
app.use(cors());
app.use(express.json()); // Ya no necesitas body-parser

const port = process.env.PORT || 3000;

// Ruta para registrar usuarios
app.post("/register", async (req, res) => {
    try {
        const { nombre, email, contraseña, direccion, telefono } = req.body;

        if (!nombre || !email || !contraseña || !direccion || !telefono) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" });
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(contraseña, 10);

        const sql = "INSERT INTO usuario (nombre, email, contraseña, direccion, telefono) VALUES (?, ?, ?, ?, ?)";
        connection.query(sql, [nombre, email, hashedPassword, direccion, telefono], (err, result) => {
            if (err) {
                console.error("Error al registrar usuario:", err);
                return res.status(500).json({ error: "Error al registrar usuario" });
            }
            res.status(201).json({ message: "Usuario registrado exitosamente" });
        });
    } catch (error) {
        console.error("Error en el servidor:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
