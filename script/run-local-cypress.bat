@echo off

cd /d C:\Automation\CYPRESS\cypress-e2e

echo Ejecutando pruebas Cypress...

npm run cy:run:edge -- --spec "cypress/e2e/clase3/input-class.cy.ts"

pause