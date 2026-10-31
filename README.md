# API REST - Gestión de Películas y Series

## Proyecto Integrado II - Desarrollo de Aplicaciones Web

**Institución:** Institución Universitaria Digital de Antioquia  
**Programa:** Ingeniería de Software y Datos  
**Docente:** Federico Henao Villa  
**Evidencia:** Evidencia de Aprendizaje 1 - API REST con Node.js  
**Año:** 2026

## Descripción

API REST desarrollada con Node.js, Express y MongoDB Atlas para gestionar información de películas y series.

El sistema permite administrar cinco módulos: Género, Director, Productora, Tipo y Media.

## Tecnologías utilizadas

- JavaScript
- Node.js
- Express
- MongoDB Atlas
- Mongoose
- Postman
- Git y GitHub

## Módulos

| Módulo | Funcionalidades |
|---|---|
| Género | Crear, consultar y actualizar géneros |
| Director | Crear, consultar y actualizar directores |
| Productora | Crear, consultar y actualizar productoras |
| Tipo | Crear, consultar y actualizar tipos de contenido |
| Media | Crear, consultar, actualizar y eliminar películas y series |

## Endpoints

La API se ejecuta localmente en:

`http://localhost:4000`

| Módulo | Endpoint |
|---|---|
| Géneros | `/api/generos` |
| Directores | `/api/directores` |
| Productoras | `/api/productoras` |
| Tipos | `/api/tipos` |
| Media | `/api/medias` |

## Reglas de negocio

- Cada película o serie tiene un género, un director principal, una productora y un tipo.
- Solo se pueden asociar géneros, directores y productoras activos.
- El serial y la URL de cada película o serie deben ser únicos.
- Las fechas de creación y actualización se administran automáticamente.
- La API utiliza códigos HTTP para comunicar el resultado de las operaciones.

## Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/Miguel-Mora/peliculas-iud.git
```

### 2. Ingresar al backend

```bash
cd peliculas-iud/backend
```

### 3. Instalar dependencias

```bash
npm install
```

### 4. Configurar variables de entorno

Crear un archivo `.env` dentro de `backend`, tomando como referencia `.env.example`.

Configurar las variables:

```env
PORT=4000
MONGODB_URI=CADENA_DE_CONEXION_MONGODB_ATLAS
```

Se requiere un usuario de MongoDB Atlas con permisos sobre la base de datos y una dirección IP autorizada.

### 5. Ejecutar el servidor

```bash
npm run dev
```

### 6. Probar la API

Abrir Postman e importar la colección JSON disponible en la carpeta `postman`.

## Validaciones implementadas

La API contempla las siguientes respuestas HTTP:

- `200 OK`: consulta o actualización exitosa.
- `201 Created`: registro creado.
- `400 Bad Request`: información inválida o referencias inactivas.
- `404 Not Found`: registro inexistente.
- `409 Conflict`: serial o URL duplicados.

## Estructura del proyecto

```text
peliculas-iud/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── index.js
│   ├── .env.example
│   ├── package.json
│   └── package-lock.json
├── postman/
│   └── API REST - Películas IU Digital.postman_collection.json
├── .gitignore
└── README.md
```

## Nota

Este proyecto corresponde a la primera evidencia de aprendizaje. El frontend y el despliegue en la nube se desarrollarán en las siguientes etapas de la asignatura.