# 🚀 Proyecto App de Comercio con Node.js

## *IFTS 29*
##  Materia: Desarrollo BackEnd
- **Profesor: Emir Quinteros**

## 📜 Integrantes
- **Ezequiel Rodolfo Garriga**
- **Carlos Fernando Maciel**
- **Cristian Gabriel Sivila**

## 🛠 Tecnología Utilizada
- **Lenguajes de Programación:**
  - JavaScript (Node.js)
- **Frameworks y Librerías:**
  - **Express.js:** Framework para la creación de la API.
  - **Mongoose:** ODM para MongoDB.
  - **Pug:** Motor de plantillas.
- **Gestión de Autenticación y Seguridad:**
  - **bcrypt:** Para el hash de contraseñas.
  - **jsonwebtoken:** Para la creación y verificación de tokens JWT.
  - **passport:** Middleware de autenticación.
  - **passport-jwt:** Estrategia de autenticación para JWT.
  - **passport-local:** Estrategia de autenticación local.
  - **express-session:** Para gestionar sesiones.
- **Utilidades:**
  - **dotenv:** Para la gestión de variables de entorno.
  - **cookie-parser:** Middleware para analizar cookies.
  - **http-errors:** Para manejar errores HTTP.
  - **morgan:** Logger de solicitudes HTTP.
  - **debug:** Utilidad para debugging.
  - **tar:** Para gestión de archivos tar.
- **Servicios y Herramientas:**
  - **Postman:** Para pruebas de API.
  - **GitHub:** Para control de versiones.

## 📦 Ejecución del Proyecto
Para ejecutar el proyecto localmente, sigue los siguientes pasos:

1. **Clonar el Repositorio:**
   
   git clone https://github.com/EzeGar91/AppComercio.git
   cd api-rest-nodejs

2. **Instalar Dependencias:** Instala las dependencias necesarias ejecutando:

   pnpm install

3. **Configuración de Variables de Entorno:** Crea un archivo .env en la raíz del proyecto y añade las siguientes variables de entorno según sea necesario:

   PORT=3001
=> DATABASE_URL=mongodb://localhost:3001/nombre_de_tu_base_de_datos

4. **Iniciar el Servidor:** Para iniciar el servidor en modo desarrollo, ejecuta:

   pnpm run dev
   El servidor se ejecutará en http://localhost:3001

5. **Pruebas de la API:** Utiliza ThunderClient o cualquier otra herramienta de pruebas de API para interactuar con los endpoints definidos en la API.

## 🔗 Endpoints de la API

Aquí puedes listar los endpoints disponibles en tu API, por ejemplo:

GET /api/users - Obtener todos los usuarios (clientes o administradores)

POST /api/users - Crear un nuevo usuario

GET /api/products - Obtener un productos por ID

POST /api/products - Crear un nuevo producto

DELETE /api/users/:id - Eliminar un cliente por ID

## 🔗 Enlace del proyecto en VERCEL

https://
