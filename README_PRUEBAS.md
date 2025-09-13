# 🧪 Guía de Pruebas (Swagger) – Roles Admin vs User

Este documento describe **qué flujos probar en Swagger UI (`/docs`)** para verificar los permisos por rol.  
> **Nota:** No incluye payloads ni respuestas de ejemplo; solo el **paso a paso** para ejecutar en `Swagger UI`.

---

## ✅ Pre-requisitos

- Bases de datos levantadas con Docker.
- Microservicios corriendo.
- Seed ejecutado en `usuarios-ms` para crear cuentas iniciales (admin y user).
- Swagger disponible en **`/docs`** de cada servicio:
  - Usuarios → `http://localhost:3001/docs`
  - Productos → `http://localhost:3002/docs`
  - Facturas → `http://localhost:3003/docs`
  - Gateway → `http://localhost:3000/docs`

---

## 👑 Flujo ADMIN (checklist)

- [ ] Autenticarse y **Authorize** con token de **Admin**.
- **Productos**
  - [ ] Crear producto (POST).
  - [ ] Listar productos (GET).
  - [ ] Actualizar producto (PATCH).
- **Usuarios**
  - [ ] Listar usuarios (GET).
  - [ ] Obtener usuario por ID (GET).
  - [ ] Actualizar usuario (PATCH) incluyendo `roles` / `isActive`.
- **Facturas**
  - [ ] Listar facturas (GET).
- **Seguridad (negativas)**
  - [ ] Quitar autorización y ejecutar una operación protegida → debe devolver 401/403.

---

## 👤 Flujo USER (checklist)

- [ ] Registrarse (o autenticarse) y **Authorize** con token de **User**.
- **Productos**
  - [ ] Listar productos (GET).
  - [ ] Ver detalle por ID (GET).
- **Carrito**
  - [ ] Agregar ítem (POST).
  - [ ] Ver carrito (GET).
  - [ ] Actualizar cantidad de un ítem (PATCH).
  - [ ] Eliminar ítem del carrito (DELETE).
  - [ ] Vaciar carrito (DELETE).
- **Checkout**
  - [ ] Confirmar carrito (POST).
- **Facturas**
  - [ ] Ver “mis facturas” (GET).
- **Seguridad (negativas)**
  - [ ] Intentar crear/actualizar producto → debe devolver 403.
  - [ ] Intentar listar usuarios → debe devolver 403.
  - [ ] Intentar listar facturas globales → debe devolver 403.
