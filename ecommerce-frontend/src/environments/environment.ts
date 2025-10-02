const $BASE_REST = "http://localhost:3000";

export const environment = {
    production: false,
    baseRest: $BASE_REST,
    api: {
        auth: {
            login: `${$BASE_REST}/auth/login`, // POST
            register: `${$BASE_REST}/auth/register`, // POST
            perfil: `${$BASE_REST}/auth/perfil`, // GET
            refresh: `${$BASE_REST}/auth/refresh` // POST
        },
        usuarios: `${$BASE_REST}/users`, // POST, GET, PATCH
        productos: `${$BASE_REST}/products`, // POST, GET, PATCH
        gestion_carrito: {
            carrito: `${$BASE_REST}/cart`, // GET, DELETE
            add_item_carrito: `${$BASE_REST}/cart/add`, // POST
            item_carrito: `${$BASE_REST}/cart/item`, // PATCH, DELETE
            confirmar_carrito: `${$BASE_REST}/checkout` // POST
        },
        gestion_facturas: {
            facturas: `${$BASE_REST}/invoices` // GET
        }
    }
}