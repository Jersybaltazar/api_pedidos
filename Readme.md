# API de Pedidos

API REST para gestión de pedidos con autenticación JWT. Permite a los usuarios registrarse, autenticarse y gestionar sus pedidos de forma segura.

## Requisitos Previos

- Node.js v18+
- npm v9+
- SQLite3
- Cliente HTTP (Postman/Insomnia/curl)

## Instalación

1. Clonar repositorio:
```bash
git clone [https://github.com/Jersybaltazar/api_pedidos.git]
cd APIS
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
```bash
cp .env.example .env
```

Editar `.env` con tus valores:
```env
JWT_SECRET=ZtsfVH8bljq7XkxaxPCEEy+FTSErw52ML/U0zo9kU8c=
DATABASE_URL="file:./dev.db"
NODE_ENV=development
```

## Configuración de la Base de Datos
```bash
npx prisma generate
npx prisma migrate dev --name init
```

## Ejecución

* Modo desarrollo (con recarga automática):
```bash
npm run dev
```

* Modo producción:
```bash
npm build
npm start
```

Accesible en: `http://localhost:3000`

## Endpoints

### Autenticación

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | /api/auth/register | Registro de nuevo usuario |
| POST | /api/auth/login | Inicio de sesión |

### Pedidos

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | /api/order | Listar todos los pedidos |
| POST | /api/order | Crear nuevo pedido |
| PUT | /api/order/:id | Actualizar pedido |
| DELETE | /api/order/:id | Eliminar pedido |
| GET | /api/order/:id/status | Obtener estado del pedido |

## Ejemplos de Uso

### Registro de Usuario
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email": "usuario@ejemplo.com", "password": "Password123"}'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "usuario@ejemplo.com", "password": "Password123"}'
```

### Crear Pedido (usar token obtenido en login)
```bash
curl -X POST http://localhost:3000/api/order \
  -H "Authorization: Bearer TU_JWT_AQUI" \
  -H "Content-Type: application/json" \
  -d '{"description": "Laptop Gamer", "quantity": 1,"status": "EN_CAMINO"}'
```

## Variables de Entorno

| Variable | Propósito | Ejemplo |
|----------|-----------|---------|
| JWT_SECRET | Secreto para firmar tokens JWT | mi_secreto_ultra_seguro |
| DATABASE_URL | URL de conexión a la base de datos | file:./dev.db |
| PORT | Puerto de escucha del servidor | 3000 |


## Documentación Adicional

* **Prisma Studio**: Visualizar datos en la base de datos:
```bash
npx prisma studio
```

* **Health Check**:
```bash
curl http://localhost:3000/ping
```