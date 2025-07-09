# 🛠️ NestJS Products API

API RESTful construida con NestJS para gestionar productos. Incluye manejo global de excepciones, logging estructurado, validación, seguridad básica, documentación Swagger y paginación de productos.

---

## 🚀 Características

- CRUD completo de productos
- Filtrado por nombre, categoría y estado activo
- Paginación con metadatos
- Swagger para documentación interactiva (`/docs`)
- Logging con Winston (rotación diaria y salida coloreada)
- Seguridad con CORS y Helmet
- Validación global con Zod
- Manejo global de errores y excepciones
- E2E testing habilitado (Jest)

---

## 📦 Tecnologías

<table>
  <tr>
    <td style="border:1px solid #333; height:40px; text-align:center; vertical-align:middle;">
      <img src="https://nestjs.com/img/logo-small.svg" width="32" />
    </td>
    <td style="border:1px solid #333; height:40px; text-align:center; vertical-align:middle;">
      <strong>NestJS</strong> <span style="color:#999;">– Backend Framework</span>
    </td>
  </tr>
  <tr>
    <td style="border:1px solid #333; height:40px; text-align:center; vertical-align:middle;">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" width="32" />
    </td>
    <td style="border:1px solid #333; height:40px; text-align:center; vertical-align:middle;">
      <strong>Express</strong> <span style="color:#999;">– HTTP Layer</span>
    </td>
  </tr>
  <tr>
    <td style="border:1px solid #333; height:40px; text-align:center; vertical-align:middle;">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="32" />
    </td>
    <td style="border:1px solid #333; height:40px; text-align:center; vertical-align:middle;">
      <strong>TypeScript</strong> <span style="color:#999;">– Language</span>
    </td>
  </tr>
  <tr>
    <td style="border:1px solid #333; height:40px; text-align:center; vertical-align:middle;">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" width="32" />
    </td>
    <td style="border:1px solid #333; height:40px; text-align:center; vertical-align:middle;">
      <strong>PostgreSQL</strong> <span style="color:#999;">– Database</span>
    </td>
  </tr>
  <tr>
    <td style="border:1px solid #333; height:40px; text-align:center; vertical-align:middle;">
      <img src="https://raw.githubusercontent.com/swagger-api/swagger.io/wordpress/images/assets/SW-logo-clr.png" width="32" />
    </td>
    <td style="border:1px solid #333; height:40px; text-align:center; vertical-align:middle;">
      <strong>Swagger</strong> <span style="color:#999;">– API Docs</span>
    </td>
  </tr>
  <tr>
    <td style="border:1px solid #333; height:40px; text-align:center; vertical-align:middle;">
      <img src="https://zod.dev/_next/image?url=%2Flogo%2Flogo-glow.png&w=640&q=100" width="32" />
    </td>
    <td style="border:1px solid #333; height:40px; text-align:center; vertical-align:middle;">
      <strong>Zod</strong> <span style="color:#999;">– Validation</span>
    </td>
  </tr>
  <tr>
    <td style="border:1px solid #333; height:40px; text-align:center; vertical-align:middle;">
      <img src="https://avatars.githubusercontent.com/u/9682013" width="32" />
    </td>
    <td style="border:1px solid #333; height:40px; text-align:center; vertical-align:middle;">
      <strong>Winston</strong> <span style="color:#999;">– Logger</span>
    </td>
  </tr>
  <tr>
    <td style="border:1px solid #333; height:40px; text-align:center; vertical-align:middle;">
      <img src="https://jestjs.io/img/jest.svg" width="32" />
    </td>
    <td style="border:1px solid #333; height:40px; text-align:center; vertical-align:middle;">
      <strong>Jest</strong> <span style="color:#999;">– Testing</span>
    </td>
  </tr>
</table>

---

## 📃 Requisitos

<table>
  <tr>
    <td style="border:1px solid #333; height:40px; text-align:center; vertical-align:middle;">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width="32" />
    </td>
    <td style="border:1px solid #333; height:40px; text-align:center; vertical-align:middle;">
      <strong>Node.js</strong> <span style="color:#999;">v18+</span>
    </td>
  </tr>
  <tr>
    <td style="border:1px solid #333; height:40px; text-align:center; vertical-align:middle;">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" width="32" />
    </td>
    <td style="border:1px solid #333; height:40px; text-align:center; vertical-align:middle;">
      <strong>PostgreSQL</strong>
    </td>
  </tr>
</table>

---

## ⚙️ Variables de entorno

```env
PORT=4000
CORS_ORIGIN=http://localhost:3000

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=products_db
DB_SYNC=false
DB_LOGGING=false
```

> ✅ Estas variables son validadas con Zod al iniciar la app.

---

## 📁 Estructura básica

```bash
src/
├── app.module.ts
├── main.ts
├── common/              # Logger, filtros, interceptores y utils
├── config/              # Setup de filtros, seguridad, Swagger, DB, etc.
├── dto/                 # DTOs comunes
├── products/            # Módulo principal con CRUD de productos
│   ├── dto/             # Create, Update, Find, Summary, etc.
│   ├── entities/        # Entidad Product
│   ├── @types/enums/    # Categoría de producto
```

---

## 🧪 Scripts útiles

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run start:dev

# Ejecutar en producción
npm run start:prod

# Ejecutar pruebas E2E
npm run test:e2e
```

---

## 📚 Endpoints básicos

Todos los endpoints están documentados en Swagger. Accede a:

📍 `http://localhost:4000/docs`

Resumen:

- `GET /products` → Listar productos con filtros y paginación
- `GET /products/:id` → Obtener detalle por ID
- `POST /products` → Crear producto
- `PATCH /products/:id` → Actualizar producto
- `DELETE /products/:id` → Eliminar producto

---

## 🛡️ Seguridad y validación

- Helmet y CORS habilitados por defecto
- Validación global con `class-validator` + filtros personalizados
- Excepciones globales controladas con `AllExceptionsFilter`
- Rate limit: 100 req/min globales

---

## 📦 Base de datos

- Conexión a PostgreSQL usando variables de entorno
- Sincronización opcional (`DB_SYNC`)
- Logging SQL opcional (`DB_LOGGING`)
- Entidad `Product` incluye:
  - `id: UUID`
  - `name: string`
  - `description: text`
  - `price: decimal`
  - `category: enum (ProductCategory)`
  - `isActive: boolean`
  - `createdAt`, `updatedAt`

---

## 📄 Notas adicionales

- El logger usa Winston con rotación diaria y salida en consola con colores.
- En caso de errores no manejados (`uncaughtException`, `unhandledRejection`), se registran y se detiene el proceso de forma segura.
- Todos los logs están centralizados usando `logger.info`, `logger.error`, etc.
