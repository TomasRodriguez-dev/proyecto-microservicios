

<div align="center">

<h1>🚀 Proyecto de Microservicios<br/><sub>Práctica <strong>NestJS</strong> / <strong>Angular</strong></sub></h1>

<p>Este repo es un <strong>proyecto de práctica</strong> para trabajar con una arquitectura de microservicios usando <strong>NestJS</strong> y bases de datos <strong>PostgreSQL</strong>, <strong>MySQL</strong> y <strong>MongoDB</strong>. <br/>
El objetivo es que puedan levantarlo rápido, entender cómo se comunican los servicios y tener una base para iterar.</p>

---

## 📖 Descripción

Este repo es un <strong>proyecto de práctica</strong> para trabajar con una arquitectura de microservicios usando 
<strong>NestJS</strong> y distintas bases de datos (<strong>PostgreSQL</strong>, <strong>MySQL</strong> y <strong>MongoDB</strong>).  

El objetivo es que puedan levantarlo rápido, entender cómo se comunican los servicios y tener una base para iterar.

---

## 🏗️ Arquitectura

<ul>
  <li><code>gateway/</code> – API Gateway (<strong>NestJS</strong>)</li>
  <li><code>usuarios-ms/</code> – Microservicio de Usuarios (<strong>NestJS</strong> + <strong>Prisma</strong> + 🐘 <strong>PostgreSQL</strong>)</li>
  <li><code>products/</code> – Microservicio de Productos (<strong>NestJS</strong> + <strong>TypeORM</strong> + 🐬 <strong>MySQL</strong>)</li>
  <li><code>facturas-ms/</code> – Microservicio de Facturas (<strong>NestJS</strong> + <strong>Prisma/Mongoose</strong> + 🍃 <strong>MongoDB</strong>)</li>
  <li><code>docker-compose.yml</code> – Stack de bases de datos para desarrollo (🐳 <strong>Docker</strong>)</li>
</ul>

---

## 🔧 Requisitos

<ul>
  <li>⚡ <strong>Node.js 20+</strong> (recomendado 20 LTS)</li>
  <li>🐳 <strong>Docker 24+</strong> y Docker Desktop / Docker Engine</li>
  <li>📦 <strong>pnpm</strong> o <strong>npm</strong> (usa el que prefieras)</li>
</ul>

--- 

## ⚙️ Variables de Entorno<

<h3>🌐 Gateway</h3>

<table>
  <tr><th>Variable</th><th>Ejemplo</th><th>Descripción</th></tr>
  <tr><td><code>JWT_SECRET</code></td><td>supersecret</td><td>Clave secreta para firmar JWT</td></tr>
  <tr><td><code>JWT_EXPIRES</code></td><td>2h</td><td>Tiempo de expiración del token</td></tr>
  <tr><td><code>USUARIOS_HOST</code></td><td>localhost</td><td>Host del microservicio de usuarios</td></tr>
  <tr><td><code>USUARIOS_PORT</code></td><td>3001</td><td>Puerto del microservicio de usuarios</td></tr>
  <tr><td><code>PRODUCTS_HOST</code></td><td>localhost</td><td>Host del microservicio de productos</td></tr>
  <tr><td><code>PRODUCTS_PORT</code></td><td>3002</td><td>Puerto del microservicio de productos</td></tr>
  <tr><td><code>FACTURAS_HOST</code></td><td>localhost</td><td>Host del microservicio de facturas</td></tr>
  <tr><td><code>FACTURAS_PORT</code></td><td>3003</td><td>Puerto del microservicio de facturas</td></tr>
  <tr><td><code>PORT</code></td><td>3000</td><td>Puerto del Gateway</td></tr>
</table>

<h3>👤 Usuarios MS</h3>

<table>
  <tr><th>Variable</th><th>Ejemplo</th><th>Descripción</th></tr>
  <tr><td><code>DATABASE_URL</code></td><td>postgresql://app:app@127.0.0.1:5433/usersdb?schema=public</td><td>URL de conexión a PostgreSQL</td></tr>
  <tr><td><code>PORT</code></td><td>3001</td><td>Puerto del servicio</td></tr>
</table>

<h3>🛒 Productos MS</h3>

<table>
  <tr><th>Variable</th><th>Ejemplo</th><th>Descripción</th></tr>
  <tr><td><code>PORT</code></td><td>3002</td><td>Puerto del servicio</td></tr>
  <tr><td><code>MYSQL_HOST</code></td><td>localhost</td><td>Host de MySQL</td></tr>
  <tr><td><code>MYSQL_PORT</code></td><td>3307</td><td>Puerto de MySQL</td></tr>
  <tr><td><code>MYSQL_USER</code></td><td>app</td><td>Usuario de MySQL</td></tr>
  <tr><td><code>MYSQL_PASS</code></td><td>app</td><td>Password de MySQL</td></tr>
  <tr><td><code>MYSQL_DB</code></td><td>productsdb</td><td>Nombre de la base de datos</td></tr>
  <tr><td><code>CART_TTL_DAYS</code></td><td>3</td><td>Días de vida útil del carrito</td></tr>
</table>

<h3>📑 Facturas MS</h3>

<table>
  <tr><th>Variable</th><th>Ejemplo</th><th>Descripción</th></tr>
  <tr><td><code>PORT</code></td><td>3003</td><td>Puerto del servicio</td></tr>
  <tr><td><code>DATABASE_URL</code></td><td>mongodb://localhost:27017/facturasdb?replicaSet=rs0</td><td>Conexión a MongoDB</td></tr>
</table>
