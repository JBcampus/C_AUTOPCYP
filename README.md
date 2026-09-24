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

- Ejecutar ejemplo TypeScript:  
  npm run dev

- Validar tipos:  
  npm run typecheck

## Tarea 1

npm run tarea1

## Clase 3:

npm run cy:run:headed -- --spec "cypress/e2e/clase3/inputs-hooks.cy.ts"
npm run cy:run:headed -- --spec 'cypress/e2e/clase3/inputs-fixture.cy.ts'

## Tarea 2

npm run tarea2

## Clase 4

npm run cy:run:headed -- --spec 'cypress/e2e/clase4/inputs-estabilidad.cy.ts'
npm run cy:run:headed -- --spec 'cypress/e2e/clase4/dropdown-colecciones.cy.ts'
npm run cy:run:headed -- --spec 'cypress/e2e/clase4/login-pom-intercept.cy.ts'
