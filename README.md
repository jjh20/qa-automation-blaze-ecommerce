# QA Automation - Blaze Demo E-commerce

Este repositorio contiene la automatización de pruebas End-to-End (E2E) para la plataforma de prácticas DemoBlaze, enfocada en validar el flujo crítico de compra de productos.

## Tecnologías y Herramientas
* Framework: Cypress 13+
* Lenguaje: JavaScript
* Patrón de Datos: Fixtures (JSON) para manejo de credenciales y datos de checkout.
* Control de Versiones: Git y GitHub.

## Casos de Prueba Automatizados
El script principal (DM001.cy.js) cubre el siguiente flujo:
1. Autenticación: Login con credenciales válidas desde un fixture.
2. Navegación: Filtrado por categoría (Laptops) y selección de producto específico.
3. Persistencia: Validación de que el producto se agrega correctamente al carrito.
4. Checkout: Completar formulario de pago y validación de mensaje de éxito.

## Cómo ejecutar los tests localmente

1. Clona este repositorio:
   git clone https://github.com/jjh20/qa-automation-blaze-ecommerce.git

2. Instala las dependencias:
   npm install

3. Abre Cypress (Modo Interactivo):
   npx cypress open

4. Ejecución en modo Headless (Consola):
   npx cypress run

---
Autor: Jael J. - Estudiante de Ingeniería de Software (UNAPEC) y Tecnólogo en Desarrollo de Software (ITLA)
