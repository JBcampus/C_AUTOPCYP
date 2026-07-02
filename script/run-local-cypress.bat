@echo off

cd /d D:\Cursos\Cypress\taller1\grupo1\cypress-e2e

echo Ejecutando pruebas Cypres...

npm run cy:run:edge -- --spec "cypress/e2e/clase3/inputs-class.cy.ts"

pause