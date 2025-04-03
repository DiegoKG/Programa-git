# Proyecto Rewear Módulos de Inicio de Sesión y Registro

Este proyecto forma parte del desarrollo del sistema **Rewear**, incluyendo la implementación de los módulos de **inicio de sesión y registro de usuarios** utilizando **Node.js, Express y MySQL**.

## Módulos desarrollados

### 1. Registro de usuarios
Permite a los nuevos usuarios crear una cuenta proporcionando información básica como nombre, correo electrónico y contraseña.  
- La contraseña se encripta con `bcrypt` antes de ser almacenada en la base de datos.  
- Se validan los datos para evitar registros duplicados.  

### 2. Inicio de sesión
Los usuarios pueden acceder con su correo y contraseña.  
- Se verifica la contraseña en la base de datos.  
- Si las credenciales son correctas, se inicia sesión y se almacena la sesión del usuario.  

## Tecnologías utilizadas
- **Node.js** - Servidor backend  
- **Express.js** - Framework para manejar rutas y peticiones  
- **MySQL** - Base de datos  
- **bcrypt** - Encriptación de contraseñas  
- **dotenv** - Manejo de variables de entorno  

## Estructura del proyecto
/rewear  
│── /public        → Archivos estáticos como CSS y JavaScript  
│── /routes        → Definición de rutas para registro e inicio de sesión  
│── /controllers   → Lógica de negocio de los módulos  
│── /models        → Interacción con la base de datos  
│── .env           → Configuración de credenciales y entorno  
│── server.js      → Archivo principal del backend  
│── package.json   → Dependencias del proyecto  
│── README.md      → Este documento  


## Instalación y uso

1. Clonar el repositorio:

git clone [(https://github.com/DiegoKG/Programa-git.git)] cd rewear

2. Instalar dependencias:

npm install

3. Configurar variables de entorno (`.env`):

DB_HOST=localhost DB_USER=root DB_PASSWORD=ALLhope2025 DB_NAME=rewear PORT=3001

4. Iniciar el servidor:

node server.js

5. Acceder en el navegador a:

http://localhost:3001

## Contacto
Para más información, puedes comunicarte a [312 275 9192 o diegokg1990@gmail.com].




