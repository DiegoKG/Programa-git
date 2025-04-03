# API de Rewear

Esta API maneja la autenticación de usuarios, búsqueda de productos.

## Endpoints

### 1️ **Registro de usuario**
- **URL:** `/api/register`
- **Método:** `POST`
- **Descripción:** Crea una nueva cuenta de usuario.
- **Ejemplo de petición:**
  ```json
  {
    "nombre": "Juan Pérez",
    "email": "juan@example.com",
    "password": "password123"
  }

- **Ejemplo de respuesta:**
  {
  "message": "Usuario registrado exitosamente",
  "userId": 5
}


### 2 Inicio de sesión
- **URL:** `/api/login`
- **Método:** `POST`
- **Descripción:** Recibe el correo y contraseña del usuario y devuelve un token si son correctos.
- **Ejemplo de petición:**
  ```json
  {
    "email": "usuario@example.com",
    "password": "123456"
  }

- **Ejemplo de respuesta:**
{
  "message": "Inicio de sesión exitoso",
  "token": "eyJhbGciOiJIUzI1Ni..."
}

### 3 Busqueda de productos
- **URL:** `/api/products`
- **Método:** `GET`
- **Parametros:** search (opcional)
- **Descripción:** Devuelve una lista de productos que coincidan con el término de búsqueda.
- **Ejemplo de petición:**
/api/products?search=camiseta

- **Ejemplo de respuesta:**
{
  "products": [
    {
      "id": 1,
      "nombre": "Camiseta Negra",
      "precio": 25.00
    }
  ]
}

### 4 Busqueda de productos
- **URL:** `/api/products`
- **Método:** `POST`
- **Descripción:**  Permite a un usuario autenticado subir un producto.
- **Ejemplo de petición:**
{
  "nombre": "Zapatos deportivos",
  "marca": "Nike",
  "talla": "42",
  "color": "Negro",
  "condicion": "Nuevo",
  "precio": 80.000,
  "imagen": "zapatos.jpg"
}
- **Ejemplo de respuesta:**
{
  "mensaje": "Producto agregado exitosamente",
  "productoId": 12
}

--------------------------------------------------------------
Actualmente, la API permite realizar el registro de usuarios, el inicio de sesión y la subida de productos con los atributos básicos. Sin embargo, aún hay funcionalidades por desarrollar y mejorar. Este es un proyecto en evolución, por lo que se seguirán agregando mejoras y nuevas funcionalidades.




