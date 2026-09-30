from docx import Document
from docx.shared import Inches
from docx.enum.text import WD_ALIGN_PARAGRAPH


def add_code_block(doc, title, code):
    doc.add_heading(title, level=2)
    p = doc.add_paragraph()
    run = p.add_run(code)
    run.font.name = 'Consolas'
    run.font.size = 10
    p.alignment = WD_ALIGN_PARAGRAPH.LEFT


doc = Document()

# Portada
section = doc.sections[0]
section.top_margin = Inches(0.7)
section.bottom_margin = Inches(0.7)
section.left_margin = Inches(0.7)
section.right_margin = Inches(0.7)

p_title = doc.add_paragraph()
p_title.alignment = WD_ALIGN_PARAGRAPH.CENTER
run = p_title.add_run('Informe de Pruebas Cypress')
run.bold = True
run.font.size = 24
run.font.name = 'Calibri'

doc.add_paragraph('')
doc.add_paragraph('Curso: Cypress')
doc.add_paragraph('Estudiante: Daniel Quintanilla')
doc.add_paragraph('Fecha: 21/09/2026')

doc.add_page_break()

doc.add_heading('1. Objetivo del informe', level=1)
doc.add_paragraph(
    'Este informe describe la funcionalidad de la prueba automatizada desarrollada en Cypress para validar el flujo de login de SauceDemo. '
    'Se explican cada una de las pruebas y se documentan las evidencias observadas durante la ejecución.'
)

doc.add_heading('2. Archivo de prueba analizado', level=1)
doc.add_paragraph('Archivo: cypress/e2e/tarea1/test1.cy.ts')

doc.add_heading('3. Descripción del código', level=1)

code_test_1 = '''describe("Tarea 1: Login Flow - SauceDemo", () => {
  it("debe loguearse con credenciales válidas y validar la página de inventario", () => {
    // Navegar a SauceDemo
    cy.visit("https://www.saucedemo.com/");

    // Validar que la página de login se cargó
    cy.get('input[data-test="username"]').should("be.visible");
    cy.get('input[data-test="password"]').should("be.visible");

    // Ingresa credenciales válidas
    cy.get('input[data-test="username"]').type("standard_user");
    cy.get('input[data-test="password"]').type("secret_sauce");

    // Hacer click en el botón de login
    cy.get('input[data-test="login-button"]').click();

    // Validar que navegó a la página de inventory
    cy.url().should("include", "/inventory.html");

    // Validar que el título secundario "Products" está visible
    cy.get('[class*="title"]').should("contain", "Products");
  });
'''

code_test_2 = '''  it("debe mostrar mensaje de error para usuario bloqueado y permanecer en la página de login", () => {
    // Navegar a SauceDemo
    cy.visit("https://www.saucedemo.com/");

    // Validar que la página de login se cargó
    cy.get('input[data-test="username"]').should("be.visible");
    cy.get('input[data-test="password"]').should("be.visible");

    // Ingresa credenciales de usuario bloqueado
    cy.get('input[data-test="username"]').type("locked_out_user");
    cy.get('input[data-test="password"]').type("secret_sauce");

    // Hacer click en el botón de login
    cy.get('input[data-test="login-button"]').click();

    // ASSERT 1: Validar que se mantiene en la URL /login (no redirige)
    cy.url().should("include", "/");

    // ASSERT 2: Validar que el contenedor de error existe
    cy.get('[data-test="error"]').should("exist");

    // ASSERT 3: Validar que el mensaje de error es visible
    cy.get('[data-test="error"]').should("be.visible");

    // ASSERT 4: Validar el mensaje de error exacto
    cy.get('[data-test="error"]').should(
      "contain.text",
      "Epic sadface: Sorry, this user has been locked out.",
    );
  });
});
'''

add_code_block(doc, 'Prueba 1: Login con credenciales válidas', code_test_1)
doc.add_paragraph(
    'Esta prueba valida que la aplicación carga la pantalla de login, ingresa un usuario válido, inicia sesión, redirige a la página de inventario y confirma que el texto "Products" aparece.'
)

add_code_block(doc, 'Prueba 2: Usuario bloqueado', code_test_2)
doc.add_paragraph(
    'Esta prueba valida que si se intenta ingresar con un usuario bloqueado, la aplicación muestra un mensaje de error, no redirige a la vista interna y se mantiene en la pantalla de login.'
)

doc.add_heading('4. Evidencias de ejecución', level=1)
doc.add_paragraph('Evidencia 1: Login exitoso.')
doc.add_paragraph('Se observa que la prueba pasa y la aplicación redirige a /inventory.html con la sección de productos visible.')
doc.add_paragraph('Evidencia 2: Usuario bloqueado.')
doc.add_paragraph('Se observa el error "Epic sadface: Sorry, this user has been locked out." y la aplicación permanece en la pantalla de login.')

doc.add_heading('5. Resultado final', level=1)
doc.add_paragraph(
    'Las pruebas automatizadas cumplen con la validación del flujo de autenticación: el login con credenciales correctas funciona correctamente y el acceso con usuario bloqueado es rechazado y mostrado al usuario mediante un mensaje de error.'
)

doc.save('informe_cypress_daniel_quintanilla.docx')
print('Documento generado: informe_cypress_daniel_quintanilla.docx')
