const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = 3001;
const multer = require("multer");
const path = require("path"); 
const fs = require("fs");

// configuracion middlewires
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Crear la carpeta "uploads" si no existe
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// configuracion del multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); 
        // Carpeta donde se guardarán las imágenes
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname); // Nombre único para cada imagen
    }
});

const upload = multer({ storage });

app.use("/uploads", express.static(uploadDir));

// Conexión con MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ALLhope2024', 
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

// Ruta para buscar productos
app.get('/buscar', (req, res) => {
    const { query } = req.query;

    const sql = `
      SELECT id_producto, nombre, talla, descripcion, condicion, precio, imagenes 
      FROM producto 
      WHERE nombre LIKE ? OR descripcion LIKE ? OR condicion LIKE ?
    `;
    const values = [`%${query}%`, `%${query}%`, `%${query}%`];

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error('❌ Error en la consulta:', err);
            return res.status(500).json({ error: 'Error en la búsqueda' });
        }

        const productosConImagenes = results.map(producto => ({
            ...producto,
            imagenes: producto.imagenes 
                ? `http://localhost:3001/uploads/${producto.imagenes}`  
                : "images/default-image.jpg"  
        }));

        res.json(productosConImagenes);
    });
});



  // Ruta para subir producto
  app.post("/subir-producto", upload.single('imagen'), (req, res) => {

    const { nombre, talla, descripcion, condicion, precio, color } = req.body;
    const imagen = req.file ? req.file.filename : null;

    if (!nombre || !talla || !descripcion || !condicion || !precio || !imagen || !color) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    const query = "INSERT INTO producto (nombre, talla, descripcion, condicion, precio, imagenes, color) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.query(query, [nombre, talla, descripcion, condicion, precio, imagen, color], (err, result) => {
        if (err) {
            console.error('❌ Error al subir producto:', err);
            return res.status(500).json({ error: "Error al subir el producto" });
        }
        res.status(201).json({ message: "✅ Producto subido correctamente" });
    });
});

  app.listen(3001, () => {
    console.log('🚀 Servidor corriendo en http://localhost:3001');
  });


