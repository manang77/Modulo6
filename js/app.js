// Constantes.
const REGULAR_TYPE = 21;
const LOWER_TYPE = 4;
const EXEMPT_TYPE = 0;

// Entrada.
const products = [
    {description: "Goma de borrar", price: 0.25, tax: LOWER_TYPE, stock: 2, units: 0,},
    {description: "Lápiz H2", price: 0.4, tax: LOWER_TYPE, stock: 5, units: 0,},
    {description: "Cinta rotular", price: 9.3, tax: REGULAR_TYPE, stock: 2, units: 0,},
    {description: "Papelera plástico", price: 2.75, tax: REGULAR_TYPE, stock: 5, units: 0,},
    {description: "Escuadra", price: 8.4, tax: REGULAR_TYPE, stock: 3, units: 0,},
    {description: "Pizarra blanca", price: 5.95, tax: REGULAR_TYPE, stock: 2, units: 0,},
    {description: "Afilador", price: 1.2, tax: LOWER_TYPE, stock: 10, units: 0,},
    {description: "Libro ABC", price: 19, tax: EXEMPT_TYPE, stock: 2, units: 0,},
];

//Comprobar si el carrito esta vacio
var noProductsInCart = () => {
    var emptyCart = true;
    for (i = 0; i < products.length && emptyCart; i++) {
        emptyCart = products[i].units == 0;
    }
    return emptyCart;
}

//Calcula los totales del carrito 
var getCartTotals = (productList) => {
    var cartTotals = {
        subTotal: 0, 
        taxes: 0, 
        total:0}
        
    for (product of productList) {
        var subTotalProduct;
        var taxesProduct;
        subTotalProduct = product.price * product.units;
        taxesProduct = subTotalProduct * product.tax / 100;
        cartTotals.subTotal += subTotalProduct;
        cartTotals.taxes += taxesProduct;
        cartTotals.total += subTotalProduct + taxesProduct;
    }
    return cartTotals;
}

//Añade contenedor div al elemento recibido como parametro con la clase
var addContainer = (element, divClass) => {
    var elementContainer = document.createElement("div");
    elementContainer.setAttribute("class", divClass);
    elementContainer.appendChild(element)
    return elementContainer
}

//Añadir columna orden del producto
var createOrderElement = order => {
    var orderTag = document.createElement("span");
    orderTag.innerText = order + 1;
    return addContainer(orderTag, "product-order");
}

//Añadir columna descripcion + precio del producto
var createElementDescription = (product) => {
    var descriptionTag = document.createElement("span");
    descriptionTag.innerText = product.description + " - " + product.price + "€/ud"; 
    return addContainer(descriptionTag, "product-description");
}

//Añadir input de cantidad del producto
var createProductQuantity = (product) => {
    var quantityInput = document.createElement("input");
    quantityInput.setAttribute("value", "0");
    quantityInput.setAttribute("type", "number");
    quantityInput.setAttribute("min","0");
    quantityInput.setAttribute("max",product.stock);

    quantityInput.addEventListener("change", (event) => {
        //Actualizar cantidad pedida del producto en el array de productos
        if (event.target.valueAsNumber <= product.stock) {
            product.units = event.target.valueAsNumber;
        } else {
            product.units = product.stock;
            event.target.value = product.units;
        }

        //Desactivar boton calcular si el carrito está vacio
        var btnCalculate = document.getElementById("calculate");
        btnCalculate.disabled = noProductsInCart();
        
    });
    return addContainer(quantityInput, "product-quantity");
}

var createProductLine = product => {
    //Crear contenedor para cada linea de producto
    var productContainer = document.createElement("div");
    productContainer.setAttribute("class", "product-container");
    //Añadir a la linea del producto las columnas orden, descripcion + precio e input de cantidad 
    productContainer.appendChild(createOrderElement(products.indexOf(product)));
    productContainer.appendChild(createElementDescription(product));
    productContainer.appendChild(createProductQuantity(product));
    return productContainer;
}

var displayCartProducts = productList => {
    var container = document.getElementById("product-list-container");
    for (product of productList) {
        container.appendChild(createProductLine(product));
    }
}

document.getElementById("calculate").addEventListener("click", () => {
    var cartTotals = getCartTotals(products);
    for (cartTotal in cartTotals) {
        var totalField = document.getElementById(cartTotal);
        totalField.innerText = cartTotals[cartTotal].toFixed(2);
    }
});

displayCartProducts(products);
document.getElementById("calculate").disabled = true;