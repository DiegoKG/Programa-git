const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3001;

// Configuración de CORS y JSON
app.use(cors());
app.use(express.json());

// Conexión con MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ALLhope2024',  // Cambia esto si tienes otra contraseña
    database: 'rewear'
});

db.connect((err) => {
    if (err) {
        console.error('Error al conectar con la base de datos:', err.stack);
        return;
    }
    console.log('✅ Conectado a la base de datos');
});

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('Servidor corriendo correctamente');
});

// Ruta para registrar usuario
app.post("/register", (req, res) => {
    const { nombre, email, contraseña, direccion, telefono } = req.body;
    const query = 'INSERT INTO usuario (nombre, email, contraseña, direccion, telefono) VALUES (?, ?, ?, ?, ?)';
    
    db.query(query, [nombre, email, contraseña, direccion, telefono], (err, result) => {
        if (err) {
            console.error('❌ Error al registrar usuario:', err);
            return res.status(500).json({ error: 'Error al registrar el usuario' });
        }
        res.json({ message: '✅ Usuario registrado correctamente' });
    });
});

// Iniciar servidor
app.listen(3001, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:3001`);
});

// Ruta para el inicio de sesión
app.post("/login", (req, res) => {
    const { email, contraseña } = req.body;

    const query = 'SELECT * FROM usuario WHERE email = ? AND contraseña = ?';
    db.query(query, [email, contraseña], (err, results) => {
        if (err) {
            console.error('Error al buscar usuario: ', err);
            return res.status(500).json({ error: 'Error en el servidor' });
        }

        if (results.length > 0) {
            res.json({ message: 'Inicio de sesión exitoso', user: results[0] });
        } else {
            res.status(401).json({ error: 'Credenciales incorrectas' });
        }
    });
});
