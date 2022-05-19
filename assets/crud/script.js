"use strict"
// LEER DOCUMENTACION DE AXIOS

// puntos a tener en cuenta para el ejercicio
/* 
    Opción 1: Hacer el crud de productos - el equipo de 3 personas máximo
    Opción 2: Hacer la interfaz para el e-commerce - el equipo de 3 personas máximo
	        Listado de productos con funcionalidad para agregar producto al carrito de compras
		    Página para ver productos que se agregaron al carrito
    Opción 3: Hacer las opciones 1 y 2 - máximo personas

*/

function generateContent(product){

    const container = document.getElementById('product')
    
    let html = '';
    for(let i = 0; i < product.length; i++){
        html += `
        <div class="col-md-6 col-lg-4 mt-3">
        <img src="${product[i].image}" class="card-img-top" alt="img-producto">
        <div class="card-body">
        <p class="card-text fs-5">${product[i].name}</p>
        <a href="#" class="btn btn-primary me-3">Enviar al carrito</a>
        <p class="d-inline-block fs-3">${product[i].price}</p>
        </div>
        </div>`
    }

    container.innerHTML = html;
}
/*
function cbResponse(response){ // este es el callback que recibe .then
    const product = response.data;
    generateContent(product)
}
*/
/*
function cbError(error){ // este es el callback que recibe .cath
    console.log(error)
}
*/

// en esta funcion vamos a comenzar a utilizar AXIOS 
function getProduct(){
    axios.get('https://e-commerce-api-academlo.herokuapp.com/api/products') // aqui estoy haciendo la peticion.
    .then(function (response){
        const product = response.data; // aqui es donde recibo la respuesta, esto recibe un callback
        generateContent(product)
    })
    .catch(function (error){ 
        console.log(error) // esto utilizamos para pescar errores, esto recibe un callback
    }) 
}




// crear nuevo producto
function createCard(){
    const image = document.getElementById('image').value;
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;

    const newCard = {
        image: image,
        name: name,
        price: price
    }

    axios.post('https://e-commerce-api-academlo.herokuapp.com/api/products', newCard)
    .then(function (response){
        const product = response.data; // aqui es donde recibo la respuesta, esto recibe un callback
        generateContent(product)
        getProduct()
    })
    .catch(function (error){ 
        console.log(error) // esto utilizamos para pescar errores, esto recibe un callback
    }) 
}

getProduct()