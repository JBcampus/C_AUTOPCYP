@echo off

cd /d D:\Desktop\JB\2026\Cypress\taller\grupo2\cypress-e2e

echo Ejecutando pruebas Cypress...

npm run cy:run:edge -- --spec "cypress/e2e/clase3/input-class.cy.ts"

pause