interface CasesFixture {
  casos_agregar_producto: {
    caso: string;
    orden: string;
    indice_producto: number;
    producto_esperado: string;
    cantidad_esperada: string;
  };
}

describe("Web Inputs con fixture", () => {
  beforeEach(() => {
    //abrir pagina principal con variable de entorno
    cy.visit(Cypress.expose("baseUrl_SD"));
    cy.url().should("include", "saucedemo.com");

    //guardamos la data en FIXTURE
    cy.fixture("tarea2/data_cases.json").as("dataCases");
  });

  it("Test 01: Compra Producto Exitosa", () => {
    //PASO 1: Navega a la pagina SauceDemo.com
    //cy.visit(Cypress.expose("baseUrl_SD"));

    //PASO 2: Autenticarse con credenciales válidas
    //Almacenar variables con alias
    cy.get('input[type="text"]').as("Campo_Usuario");
    cy.get('input[type="password"]').as("Campo_Password");
    cy.get('input[type="submit"]').as("boton_Login");

    //Completar inputs de tipo texto
    cy.get("@Campo_Usuario").type("standard_user");
    cy.get("@Campo_Password").type("secret_sauce");

    //Validar elementos por su alias
    cy.get("@Campo_Usuario").should("have.value", "standard_user");
    cy.get("@Campo_Password").should("have.value", "secret_sauce");

    //Presionar Login
    cy.get("@boton_Login").click();

    //PASO 3: Validar url ‘/inventory.html’ y título secundario ‘Products’
    cy.url().should("include", "/inventory.html");
    cy.get('[data-test="title"]').should("be.visible");

    //PASO 4: Ordenar Productos por Nombre A-Z
    //cy.get('[data-test="product-sort-container"]').select()
    cy.get("@dataCases").then((fixture) => {
      const data: CasesFixture = fixture;

      //validamos que la data haya cargado correctamente
      expect(data.casos_agregar_producto.caso).to.equal("orden_az_agregar_tercer_producto");
      expect(data.casos_agregar_producto.orden).to.equal("az");
      expect(data.casos_agregar_producto.indice_producto).to.equal(2);
      expect(data.casos_agregar_producto.producto_esperado).to.equal(
        "Sauce Labs Bolt T-Shirt",
      );
      expect(data.casos_agregar_producto.cantidad_esperada).to.equal("1");

      /*
      //ingresamos la data al formulario web
      cy.contains("h1", data.expected.titleContains).should("be.visible");
      cy.get('input[type="number"]').type(data.validInput.number);
      cy.get('input[type="text"]').type(data.validInput.text);
      cy.get('input[type="password"]').type(data.validInput.password);
      cy.get('input[type="date"]').type(data.validInput.date);

      //validamos el comportamiento del formulario web
      cy.get('input[type="number"]').should(
        "have.value",
        data.validInput.number,
      );
      cy.get('input[type="text"]').should("have.value", data.validInput.text);
      cy.get('input[type="password"]').should(
        "have.value",
        data.validInput.password,
      );
      cy.get('input[type="date"]').should("have.value", data.validInput.date);
      */
    });
  });
});
