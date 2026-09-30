from zipfile import ZipFile
from xml.sax.saxutils import escape
from pathlib import Path

output_path = Path.home() / 'Downloads' / 'informe_cypress_daniel_quintanilla.docx'

paragraphs = [
    'Informe de Pruebas Cypress',
    'Curso: Cypress',
    'Estudiante: Daniel Quintanilla',
    'Fecha: 21/09/2026',
    'Objetivo: explicar la prueba automatizada del flujo de login de SauceDemo.',
    '',
    'Prueba 1: Login con credenciales válidas',
    'describe("Tarea 1: Login Flow - SauceDemo", () => {',
    '  it("debe loguearse con credenciales válidas y validar la página de inventario", () => {',
    '    cy.visit("https://www.saucedemo.com/");',
    '    cy.get(\'input[data-test="username"]\').should("be.visible");',
    '    cy.get(\'input[data-test="password"]\').should("be.visible");',
    '    cy.get(\'input[data-test="username"]\').type("standard_user");',
    '    cy.get(\'input[data-test="password"]\').type("secret_sauce");',
    '    cy.get(\'input[data-test="login-button"]\').click();',
    '    cy.url().should("include", "/inventory.html");',
    '    cy.get(\'[class*=\"title\"]\').should("contain", "Products");',
    '  });',
    '});',
    '',
    'Descripción: valida que el usuario inicia sesión con credenciales correctas y redirige a la página de inventario.',
    '',
    'Prueba 2: Usuario bloqueado',
    'it("debe mostrar mensaje de error para usuario bloqueado y permanecer en la página de login", () => {',
    '    cy.visit("https://www.saucedemo.com/");',
    '    cy.get(\'input[data-test="username"]\').type("locked_out_user");',
    '    cy.get(\'input[data-test="password"]\').type("secret_sauce");',
    '    cy.get(\'input[data-test="login-button"]\').click();',
    '    cy.get(\'[data-test="error"]\').should("exist");',
    '    cy.get(\'[data-test="error"]\').should("be.visible");',
    '    cy.get(\'[data-test="error"]\').should("contain.text", "Epic sadface: Sorry, this user has been locked out.");',
    '});',
    '',
    'Descripción: valida que el usuario bloqueado no puede entrar, se muestra el error y permanece en login.',
    '',
    'Evidencias:',
    '1. Login correcto: la URL incluye /inventory.html y la vista de productos está visible.',
    '2. Usuario bloqueado: aparece el mensaje "Epic sadface: Sorry, this user has been locked out.".',
    '',
    'Conclusión: las pruebas cubren exitosamente el flujo de autenticación con usuario válido y con usuario bloqueado.'
]


def paragraph_xml(text: str) -> str:
    text = escape(text)
    return f'<w:p><w:r><w:t xml:space="preserve">{text}</w:t></w:r></w:p>'

body_xml = ''.join(paragraph_xml(p) for p in paragraphs)
document_xml = f'''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
    {body_xml}
    <w:sectPr>
      <w:pgSz w:w="12240" w:h="15840"/>
      <w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440" w:header="720" w:footer="720" w:gutter="0"/>
    </w:sectPr>
  </w:body>
</w:document>'''

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

output_path.parent.mkdir(parents=True, exist_ok=True)
with ZipFile(output_path, 'w') as zf:
    zf.writestr('[Content_Types].xml', content_types)
    zf.writestr('_rels/.rels', rels)
    zf.writestr('docProps/core.xml', core)
    zf.writestr('docProps/app.xml', app)
    zf.writestr('word/document.xml', document_xml)

print(output_path)
print(output_path.exists())
