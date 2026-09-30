import os
import zipfile
from datetime import datetime
from xml.sax.saxutils import escape

OUTPUT_FILE = os.path.join(os.getcwd(), "informe_cypress_daniel_quintanilla.docx")


def para_xml(text, bold=False, size=None, font=None):
    text = escape(text)
    runs = []
    for line in text.split("\n"):
        if not line:
            runs.append('<w:p><w:r><w:t xml:space="preserve"> </w:t></w:r></w:p>')
            continue
        style = ''
        if bold:
            style += '<w:b/>'
        if size:
            style += f'<w:sz w:val="{size}"/><w:szCs w:val="{size}"/>'
        if font:
            style += f'<w:rPr><w:rFonts w:ascii="{font}" w:hAnsi="{font}"/></w:rPr>'
        runs.append(f'<w:p><w:r><w:rPr>{style}</w:rPr><w:t xml:space="preserve">{line}</w:t></w:r></w:p>')
    return '\n'.join(runs)


def build_document_xml():
    cover = (
        '<w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:rPr><w:b/><w:sz w:val="32"/><w:szCs w:val="32"/></w:rPr><w:t>Informe de Pruebas Cypress</w:t></w:r></w:p>'
        '<w:p/>'
        '<w:p><w:r><w:t>Curso: Cypress</w:t></w:r></w:p>'
        '<w:p><w:r><w:t>Estudiante: Daniel Quintanilla</w:t></w:r></w:p>'
        '<w:p><w:r><w:t>Fecha: 21/09/2026</w:t></w:r></w:p>'
    )

    intro = (
        '<w:p><w:r><w:t>Objetivo:</w:t></w:r></w:p>'
        '<w:p><w:r><w:t>Este informe explica la prueba automatizada de Cypress para validar el flujo de login de SauceDemo.</w:t></w:r></w:p>'
    )

    codigo1 = '''describe("Tarea 1: Login Flow - SauceDemo", () => {
  it("debe loguearse con credenciales válidas y validar la página de inventario", () => {
    cy.visit("https://www.saucedemo.com/");
    cy.get('input[data-test="username"]').should("be.visible");
    cy.get('input[data-test="password"]').should("be.visible");
    cy.get('input[data-test="username"]').type("standard_user");
    cy.get('input[data-test="password"]').type("secret_sauce");
    cy.get('input[data-test="login-button"]').click();
    cy.url().should("include", "/inventory.html");
    cy.get('[class*="title"]').should("contain", "Products");
  });
'''

    codigo2 = '''  it("debe mostrar mensaje de error para usuario bloqueado y permanecer en la página de login", () => {
    cy.visit("https://www.saucedemo.com/");
    cy.get('input[data-test="username"]').should("be.visible");
    cy.get('input[data-test="password"]').should("be.visible");
    cy.get('input[data-test="username"]').type("locked_out_user");
    cy.get('input[data-test="password"]').type("secret_sauce");
    cy.get('input[data-test="login-button"]').click();
    cy.url().should("include", "/");
    cy.get('[data-test="error"]').should("exist");
    cy.get('[data-test="error"]').should("be.visible");
    cy.get('[data-test="error"]').should(
      "contain.text",
      "Epic sadface: Sorry, this user has been locked out.",
    );
  });
});
'''

    body = (
        cover +
        '<w:p><w:r><w:t> </w:t></w:r></w:p>' +
        intro +
        '<w:p><w:r><w:t>Prueba 1: Login con credenciales válidas</w:t></w:r></w:p>' +
        para_xml(codigo1, bold=False, size=18, font='Consolas') +
        '<w:p><w:r><w:t>Descripción:</w:t></w:r></w:p>' +
        '<w:p><w:r><w:t>Se valida que el usuario accede con credenciales correctas, la app redirige a la página de inventario y el título "Products" es visible.</w:t></w:r></w:p>' +
        '<w:p><w:r><w:t>Prueba 2: Usuario bloqueado</w:t></w:r></w:p>' +
        para_xml(codigo2, bold=False, size=18, font='Consolas') +
        '<w:p><w:r><w:t>Descripción:</w:t></w:r></w:p>' +
        '<w:p><w:r><w:t>Se valida que el usuario bloqueado recibe un mensaje de error y la aplicación permanece en la pantalla de login.</w:t></w:r></w:p>' +
        '<w:p><w:r><w:t>Evidencias:</w:t></w:r></w:p>' +
        '<w:p><w:r><w:t>1. Login correcto: se observa que la URL incluye /inventory.html y la pantalla muestra la sección de productos.</w:t></w:r></w:p>' +
        '<w:p><w:r><w:t>2. Usuario bloqueado: se observa el error "Epic sadface: Sorry, this user has been locked out." y la app se queda en login.</w:t></w:r></w:p>' +
        '<w:p><w:r><w:t>Conclusión:</w:t></w:r></w:p>' +
        '<w:p><w:r><w:t>Las pruebas cubren los dos escenarios principales del flujo de autenticación: acceso exitoso y acceso rechazado.</w:t></w:r></w:p>'
    )

    return '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:wpc="http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:wp14="http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" xmlns:w10="urn:schemas-microsoft-com:office:word" xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:w14="http://schemas.microsoft.com/office/word/2010/wordml" xmlns:w15="http://schemas.microsoft.com/office/word/2012/wordml" xmlns:wpg="http://schemas.microsoft.com/office/word/2010/wordprocessingGroup" xmlns:wpi="http://schemas.microsoft.com/office/word/2010/wordprocessingInk" xmlns:wne="http://schemas.microsoft.com/office/word/2006/wordml" xmlns:wps="http://schemas.microsoft.com/office/word/2010/wordprocessingShape" mc:Ignorable="w14 w15 wp14">
  <w:body>
    %s
    <w:sectPr>
      <w:pgSz w:w="12240" w:h="15840"/>
      <w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440" w:header="720" w:footer="720" w:gutter="0"/>
    </w:sectPr>
  </w:body>
</w:document>
''' % body


def create_docx(path):
    content_types = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
  <Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
  <Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>
</Types>'''

    rels = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>
</Relationships>'''

    core = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:dcmitype="http://purl.org/dc/dcmitype/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <dc:title>Informe de Pruebas Cypress</dc:title>
  <dc:creator>Daniel Quintanilla</dc:creator>
  <cp:lastModifiedBy>Daniel Quintanilla</cp:lastModifiedBy>
  <dcterms:created xsi:type="dcterms:W3CDTF">2026-09-21T00:00:00Z</dcterms:created>
  <dcterms:modified xsi:type="dcterms:W3CDTF">2026-09-21T00:00:00Z</dcterms:modified>
</cp:coreProperties>'''

    app = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">
  <Application>Microsoft Office Word</Application>
</Properties>'''

    with zipfile.ZipFile(path, 'w', zipfile.ZIP_DEFLATED) as zf:
        zf.writestr('[Content_Types].xml', content_types)
        zf.writestr('_rels/.rels', rels)
        zf.writestr('docProps/core.xml', core)
        zf.writestr('docProps/app.xml', app)
        zf.writestr('word/document.xml', build_document_xml())


if __name__ == '__main__':
    create_docx(OUTPUT_FILE)
    print(f'Word generado correctamente: {OUTPUT_FILE}')
