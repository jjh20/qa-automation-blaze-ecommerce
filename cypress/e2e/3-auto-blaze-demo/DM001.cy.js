describe("Test E2E BLAZE-DEMO", () => {
    
    beforeEach(() => {
        // Entro a la página antes de cada prueba
        cy.visit("https://www.demoblaze.com/")
    })

    it("DM001 - Test sobre compra exitosa", () => {
        // Cargo los datos del fixture para no dejar credenciales quemadas
        cy.fixture("users").then((data) => {
            
            // --- PASO 1: LOGIN ---
            // Uso login para evitar el error de "usuario ya existe" del registro
            cy.get('#login2').click() 
            cy.get('#loginusername').type(data.validUser.username)
            cy.get('#loginpassword').type(data.validUser.password)
            cy.get('#logInModal .btn-primary').click() 

            // Espero que el modal de login se cierre para que no bloquee los clics
            cy.get('#logInModal').should('not.be.visible')

            // --- PASO 2: SELECCIÓN DE PRODUCTO ---
            // Navego por categorías y elijo la laptop del criterio de aceptación
            cy.contains('a', "Laptops").click()
            cy.contains("a", "Sony vaio i5").click()

            // --- PASO 3: AGREGAR AL CARRITO ---
            // Hago clic en agregar. Como la alerta nativa es inestable en esta web, 
            // Cypress la acepta automáticamente y yo me enfoco en el resultado final.
            cy.contains('a', 'Add to cart').click() 

            // --- PASO 4: VALIDACIÓN EN EL CARRITO (CRITERIO REAL) ---
            // Me muevo a la página del carrito para confirmar que el producto llegó
            cy.get('#cartur').click()
            
            // Valido que la URL sea la correcta
            cy.url().should('include', 'cart.html')

            // Verifico que el nombre del producto aparezca en la tabla de resultados
            cy.get('.success').should('be.visible')
              .and('contain', 'Sony vaio i5')

            // Verifico que el total no esté vacío para asegurar que el precio cargó
            cy.get('#totalp').should('not.be.empty')

            //Oprimo sobre el boton place order para pagar
            cy.get('.col-lg-1 > .btn').click()

            //Llenamos el formulario de pago
            cy.get('#name').type(data.checkoutData.name)
            cy.get('#country').type(data.checkoutData.country)
            cy.get('#city').type(data.checkoutData.city)
            cy.get("#card").type(data.checkoutData.card)
            cy.get("#month").type(data.checkoutData.month)
            cy.get("#year").type(data.checkoutData.year)

            //confirmamos pago
            cy.get('#orderModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click()

            // --- PASO 5: VALIDACIÓN FINAL DE COMPRA (FIX DE VELOCIDAD) ---
            // Le doy 10 segundos de margen porque el modal de éxito a veces tarda en renderizar el texto
            cy.get('.sweet-alert', { timeout: 10000 }).should('be.visible')
            
            // Valido el título principal
            cy.get('.sweet-alert h2').should('have.text', 'Thank you for your purchase!')

            // --- VALIDACIÓN DEL TICKET ---
            // En lugar de un 'should' directo, extraigo el texto del elemento .lead
            // Esto es más seguro cuando la página va lenta
            cy.get('.lead').should('be.visible').then(($el) => {
                const textoTicket = $el.text()
                
                // Valido que el nombre que puse en mi fixture esté dentro del texto del ticket
                // RECUERDA: Que en tu fixture diga "Juan Gonzale" exactamente como en la foto
                expect(textoTicket).to.include(data.checkoutData.name)
            })

            // --- CIERRE DEL FLUJO ---
            // Hago clic en OK para terminar el proceso de compra
            cy.get('.confirm').click()

            // Me aseguro de que el modal se haya quitado antes de dar el test por terminado
            cy.get('.sweet-alert').should('not.be.visible')
        })
    })
})