# 📘 Convenciones de Nomenclatura en TypeScript para Backend

Este documento establece las convenciones de nomenclatura para proyectos backend en TypeScript (por ejemplo, con NestJS), con el objetivo de mantener un código limpio, coherente y fácil de mantener a lo largo del tiempo.

---

## 1. Clases, Interfaces, Tipos y Enums → `PascalCase`

Se utiliza `PascalCase` para los siguientes elementos:

- Clases (`class`)
- Interfaces (`interface`)
- Tipos (`type`)
- Enumeraciones (`enum`)

✅ Correcto:

```ts
class ProductService {}
interface ProductDto {}
type PaginationOptions = { limit: number; offset: number };
enum OrderStatus { Pending, Paid, Cancelled }
```

❌ Incorrecto:

```ts
class productService {}
interface product_dto {}
enum order_status { pending, paid, cancelled }
```

---

## 2. Funciones, Métodos y Variables → `camelCase`

- Se usa `camelCase` para funciones, métodos, variables locales, propiedades y parámetros de funciones.

✅ Correcto:

```ts
function calculateTotalPrice() {}
const totalPrice = 100;
let isAvailable = true;

class OrderService {
  getOrderById(id: string) {
    return id;
  }
}
```

❌ Incorrecto:

```ts
function CalculateTotalPrice() {}
const TotalPrice = 100;
let is_available = true;
```

---

## 3. Constantes Globales / Inmutables → `SCREAMING_SNAKE_CASE`

- Para constantes que no cambian durante la ejecución del programa (valores de configuración, tokens, claves, límites, etc.).

✅ Correcto:

```ts
const MAX_UPLOAD_SIZE = 10485760;
const JWT_SECRET = process.env.JWT_SECRET;
```

❌ Incorrecto:

```ts
const MaxUploadSize = 10485760;
const jwtSecret = process.env.JWT_SECRET;
```

---

## 4. Archivos → `kebab-case`

- Todos los nombres de archivo deben ir en minúsculas, separados por guiones (`-`).

✅ Correcto:

```
product.service.ts
create-product.dto.ts
order-status.enum.ts
```

❌ Incorrecto:

```
ProductService.ts
CreateProductDTO.ts
orderStatusEnum.ts
```

---

## 5. DTOs (Data Transfer Objects)

- Sufijo `Dto`, usando `PascalCase`.
- Nombres descriptivos del propósito: `CreateProductDto`, `UpdateUserDto`, etc.

✅ Correcto:

```ts
export class CreateOrderDto {
  productId: string;
  quantity: number;
}
```

❌ Incorrecto:

```ts
export class createorderdto {}
```

---

## 6. Enumeraciones → `PascalCase` en el nombre, `PascalCase` o `SCREAMING_SNAKE_CASE` en los valores

- Preferimos `PascalCase` si los valores se usarán como identificadores.
- `SCREAMING_SNAKE_CASE` si se exportan como valores de base de datos o claves fijas.

✅ Correcto:

```ts
enum UserRole {
  Admin = 'Admin',
  Operator = 'Operator',
  SuperAdmin = 'SuperAdmin',
}

enum StatusCode {
  SUCCESS = 200,
  NOT_FOUND = 404,
}
```

---

## 7. Convenciones para Base de Datos → `snake_case`

- Las columnas y nombres de tabla en base de datos deben seguir `snake_case`.
- En el código (DTOs, entidades), se usan `camelCase` para los atributos.
- Si se usa TypeORM, mapear explícitamente el campo si difiere.

✅ Correcto:

```ts
// Entidad en código
@Column({ name: 'product_id' })
productId: string;

// En base de datos: "product_id"
```

❌ Incorrecto:

```ts
@Column()
product_id: string;
```

---

## 8. Servicios, Repositorios, Controladores

- Sufijo obligatorio: `Service`, `Repository`, `Controller`.
- `PascalCase`.

✅ Correcto:

```ts
ProductService
OrderRepository
UserController
```

❌ Incorrecto:

```ts
productservice
order_repo
controllerUser
```

---

## 9. Carpeta y módulos → `kebab-case`

- Las carpetas de módulos y submódulos deben usar `kebab-case`.

✅ Correcto:

```
src/
  products/
    product.controller.ts
    product.service.ts
    product.module.ts
```

---

## 10. Interfaces específicas de base de datos → Prefijo `I` (opcional)

Si usas interfaces que representan estructuras puramente técnicas (como payloads de librerías o resultados raw de queries), puede usarse `I`.

✅ Correcto:

```ts
interface IRawProductRecord {
  product_id: string;
  price: number;
}
```

---

## 11. Naming consistente entre entidades y DTOs

- Las propiedades en código deben ser `camelCase`, pero mapear los campos `snake_case` con el decorador si difieren.

```ts
// DTO
export class CreateUserDto {
  firstName: string;
  lastName: string;
}

// Entidad
@Column({ name: 'first_name' })
firstName: string;
```

---

## 12. Scripts, seeds y tests → `kebab-case` con contexto

✅ Correcto:

```
create-admin.seed.ts
products.e2e-spec.ts
```

---

## 🧠 Tips adicionales

- Evita usar abreviaciones poco comunes: usa `customerOrder` en lugar de `custOrd`.
- Usa nombres descriptivos y específicos: `getProductsByCategoryId` > `getProducts`.
- Prefiere nombres consistentes entre capas (DTO → Servicio → Entidad).

---

## 📋 Resumen

| Elemento                     | Convención           | Ejemplo                         |
|-----------------------------|----------------------|----------------------------------|
| Clases                      | `PascalCase`         | `ProductService`                |
| Interfaces                  | `PascalCase`         | `UserDto`, `IRawData`           |
| Tipos (`type`)              | `PascalCase`         | `PaginationParams`              |
| Enums                       | `PascalCase`         | `OrderStatus.Paid`              |
| Variables                   | `camelCase`          | `totalAmount`                   |
| Funciones / Métodos         | `camelCase`          | `getOrderDetails()`             |
| Constantes inmutables       | `SCREAMING_SNAKE_CASE`| `MAX_RETRIES`                  |
| Archivos / carpetas         | `kebab-case`         | `product.service.ts`            |
| DTOs                        | `PascalCase + Dto`   | `CreateProductDto`              |
| Campos DB (snake_case)      | `snake_case`         | `product_id`                    |
| Propiedades en código       | `camelCase`          | `productId`                     |
| Controladores / Servicios   | `PascalCase`         | `ProductController`             |
