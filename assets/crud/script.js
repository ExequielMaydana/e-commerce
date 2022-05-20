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

const baseURL = 'https://e-commerce-api-academlo.herokuapp.com/api/products';
let editingID = null; 

function generateContent(product){

    const container = document.getElementById('product')
    
    let html = '';
    for(let i = 0; i < product.length; i++){
        html += `
                <div class="col-md-3 col-lg-3 mt-3 border-card">
                    <img src="${product[i].image}" class="img-thumbnail" alt="img-producto">
                     <div class="card-body card-elem">
                        <p class="d-inline-block fs-3">${product[i].name}</p>
                        <p class="d-inline-block fs-3">${product[i].price}</p>
                        <div class="elem-button">
                            <button class="btn button" onclick="deleteProduct(${product[i].id})">
                            <i class="fa-solid fa-trash-can"></i>
                            </button>
                        <button class="btn button" onclick="editProduct(${product[i].id})">
                            <i class="fa-solid fa-pen"></i>
                        </button>
                        </div>
                    </div>
                </div>      
                `
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
        generateContent(product);
        getProduct();
    })
    .catch(function (error){ 
        console.log(error) // esto utilizamos para pescar errores, esto recibe un callback
    }) 
}


    /* function para editar productos */
    
    function editProduct(id){
        axios.get(`${baseURL}/${id}`)
        .then(function (response) {
            editingID = id;
            const product =  response.data;
            document.getElementById('image').value = product.image;
            document.getElementById('name').value = product.name;
            document.getElementById('price').value = product.price;
        })
        .catch(function (error) {
            alert('No se pudo cargar la tarea');
        })
    }


    function deleteProduct(id){
        const confirmation = confirm('¿Esta seguro de eliminar el producto?');
        if(!confirmation){
            return
        }
        axios.delete(`${baseURL}/${id}`)
            .then(function () {
                alert('La tarea se eliminó correctamente');
                getProduct();
            })
            .catch(function (error) {
                alert('No se pudo eliminar la tarea');
            })
    }

    function updateProduct() {
        const productEdited = {
            image: document.getElementById('image').value,
            name: document.getElementById('name').value,
            price: document.getElementById('price').value
        }
    
        axios.put(`${baseURL}/${editingID}`, productEdited)
            .then(function (response) {
                alert('Se editó la tarea correctamente');
                getProduct();
            })
            .catch(function (error) {
                alert('No se pudo editar la tarea');
            })
    }


getProduct();