# Automatización E2E con Cypress y TypeScript

Proyecto independiente para automatización de pruebas End-to-End usando Cypress y TypeScript.

## Estructura

- cypress/e2e/: specs de pruebas E2E.
- cypress/fixtures/: datos estáticos de prueba.
- cypress/pages/: Page Objects.
- cypress/helpers/: funciones reutilizables.
- cypress/support/: configuración global de Cypress.
- playground/: ejemplos académicos del curso.
- artifacts/: evidencias, videos, screenshots y reportes.

## Scripts iniciales

Ejecutar ejemplo TypeScript:  
npm run dev

Validar tipos:  
npm run typecheck

Ejecución del runner cypress:
npm run cy:open

Ejecución en terminal con navegador:
npm run cy:run:headed

Ejecución del taller 2:
npm run cy:run:taller2

## Reporte Mochawesome

Generar el reporte y sus videos ejecutando Cypress en modo run:

npm run cy:run

Después abrir `artifacts\mochawesome-report\index.html`. El reporte se actualiza
en esa ruta en cada ejecución; los videos de la ejecución actual se copian junto
al HTML para que sus enlaces funcionen.
