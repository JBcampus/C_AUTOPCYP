# Automatización E2E con Cypress y TypeScript
Proyecto independiente para automatización de pruebas End-to-End usando
Cypress y TypeScript.

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