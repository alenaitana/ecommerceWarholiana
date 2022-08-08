const carrito = JSON.parse(localStorage.getItem("carrito"));

let tbody = document.querySelector("#tbody");

function agregarAlCarrito(arrayCarrito){

    for(let producto of arrayCarrito){
        
        let row = document.createElement("tr");

        row.innerHTML = `<td>${producto.nombre}</td><td>$${producto.precio}</td><td>${producto.cantidad}</td><td>${producto.subtotal}</td><td><button id="${producto.id}" class="btn btn-danger eliminarProducto">Eliminar</button></td>`

        tbody.appendChild(row)
    }
    
}

agregarAlCarrito(carrito);

let botonesEliminar = document.querySelectorAll(".eliminarProdcuto");

botonesEliminar.forEach(elemento => {
    elemento.addEventListener("click", eliminarProducto);
});

function eliminarProducto(e){



    let index = carrito.findIndex(producto => producto.id == e.target.id)

    e.target.parentNode.parentNode.remove();

    localStorage.setItem("carrito", JSON.stringify(carrito));


}