@echo off

cd /c C:\Users\Barry\Desktop\cypressautomati\cypress-e2e

echo Ejecutando pruebas Cypress...

npm run cy:run:edge -- --spec "cypress/e2e/clase3/input-class.cy.ts" & npm run allure:clean-generate 

pause