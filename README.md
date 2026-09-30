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

## Crear nuevo proyecto

mkdir cypress-e2e && cd cypress-e2e
git init
git config --global user.name "Nombre"
git config --global user.email "correo"
git branch -M main
git switch -c alumno/alias
mkdir cypress artifacts playground
mkdir cypress\e2e cypress\fixtures cypress\pages cypress\helpers cypress\support

## dependencias

npm i -D typescript @types/node tsx
npx tsc --init

## intala cypress

npm install -D cypress --verbose

## es para que se intale las dependencias de cypress

## nota el tsconfig.json debe estar ogual para llevarnos la librerias que neceistamos

npm run cy:open

## editamos cypress.config.ts

le colocaremos la ruta donde vamos a trabajar

baseUrl: "https://practice.expandtesting.com",
viewportWidth: 1280,
