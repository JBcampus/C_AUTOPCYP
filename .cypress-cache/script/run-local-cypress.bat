@echo off

cd /d ...

echo Ejecutando pruebas Cypress...

npm run cy:run:edge -- --spec "cypress/e2e/clase3/input-class.cy.ts"

pause