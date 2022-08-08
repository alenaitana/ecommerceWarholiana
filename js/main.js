const carrito = [];

class ProductoCarrito{

    constructor(nombre, precio, imagen, cantidad, id, subtotal){
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
        this.cantidad = 1;
        this.id = id;
        this.subtotal = precio; 
    }
}

let divContainer = document.getElementById("row");

function rellenoDePagina(arrayProductos){

    for(let producto of arrayProductos){

        let div = document.createElement("div");
        div.classList = "col-4 mt-3"

        div.innerHTML = `
        <div class="card" style"width: 18rem;">
            <img src="${producto.imagen}" class="card-img-top img-fluid" alt="${producto.id}">
            <div class="card-body">
                <h5 class="card-title">${producto.nombre}</h5>
                <p class="card-text">$<stronge>${producto.precio}<stronge></p>
                <button class="btn btn-primary agregarAlCarrito">Agregar al Carrito</button>
            </div>
        </div>`
        
        divContainer.appendChild(div);

    }

    let carritoLocalStorage = JSON.parse(localStorage.getItem("carrito"));

    if(carritoLocalStorage){
        carritoNav(carritoLocalStorage);
    }
}
rellenoDePagina(productos);

let botones = document.querySelectorAll(".agregarAlCarrito");

botones.forEach(elemento =>{
    elemento.addEventListener("click", agregarAlCarrito)
})

 function agregarAlCarrito(e){
    
    let carritoLocalStorage = JSON.parse(localStorage.getItem(carrito))

    if(carritoLocalStorage){
        carrito = carritoLocalStorage;
    }

    let index = carrito.findIndex(producto => producto.id == e.target.parentNode.parentNode.children[0].alt)


    let nombre = e.target.parentNode.children[0].textcontent;
    let precio = e.target.parentNode.children[1].children[0].textcontent;
    let imagen = e.target.parentNode.parentNode.children[0].src;
    let id = e.target.parentNode.parentNode.children[0].alt;

    if(index == -1){
        const producto = new ProductoCarrito(nombre, precio, imagen, id);
        carrito.push(producto);
    }else{
        carrito[index].cantidad++;
        carrito[index].subtotal = carrito[index].precio * carrito[index].cantidad;
    }


    localStorage.setItem("carrito", JSON.stringify(carrito))
    carritoNav(carrito);
}

function carritoNav(arrayCarrito){
    
    let textoCarrito = document.getElementById("anchor_carrito")

    let totalProdcutos = 0;

    for(let producto of arrayCarrito){
        totalProdcutos += producto.cantidad
    }

    textoCarrito.innerHTML = "";
    textoCarrito.innerHTML = `<p>Carrito (${totalProdcutos})</p>`
}