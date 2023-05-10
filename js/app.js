// Obtener las referencias a los elementos relevantes del DOM //
const menu = document.querySelector(".hamburguesa");
const navegacion = document.querySelector(".navegacion");
const imagenes = document.querySelectorAll("img");
const btnTodos = document.querySelector(".todos");
const btnDesayuno = document.querySelector(".Desayuno");
const btnPastel = document.querySelector(".Pastel");
const btnTarta = document.querySelector(".Tarta");
const btnPostres = document.querySelector(".postres");
const contenedorPlatillos = document.querySelector(".platillos");

// Agregar un evento de escucha que se ejecuta cuando el DOM ha cargado //
document.addEventListener("DOMContentLoaded", () => {
  // Inicializar los eventos //
  eventos();
  // Filtrar los platillos //
  platillos();
});

//"lazy loading" mejora la velocidad de carga de la página y reduce el uso de ancho de banda//
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const imagen = entry.target;
      imagen.src = imagen.dataset.src;
      observer.unobserve(imagen);
    }
  });
});

imagenes.forEach((imagen) => {
  observer.observe(imagen);
});
// fin "lazy loading" // lo agregue en el curso de html sacado de internet investigar más!!

// Filtrar los platillos según su tipo //
function platillos() {
  // Crear un arreglo con los platillos //
  let platillosArreglo = [];
  const platillos = document.querySelectorAll(".platillo");

  platillos.forEach(
    (platillo) => (platillosArreglo = [...platillosArreglo, platillo])
  );

  // Filtrar los platillos según su tipo //
  const Desayuno = platillosArreglo.filter(
    (Desayuno) => Desayuno.getAttribute("data-platillo") === "Desayuno"
  );
  const Pastel = platillosArreglo.filter(
    (Pastel) => Pastel.getAttribute("data-platillo") === "Pastel"
  );
  const Tarta = platillosArreglo.filter(
    (Tarta) => Tarta.getAttribute("data-platillo") === "Tarta"
  );
  const postres = platillosArreglo.filter(
    (postre) => postre.getAttribute("data-platillo") === "postre"
  );

  // Mostrar los platillos según el botón que se presiona //
  mostrarPlatillos(Desayuno, Pastel, Tarta, postres, platillosArreglo);
}
const mostrarPlatillos = (Desayuno, Pastel, Tarta, postres, todos) => {
  btnDesayuno.addEventListener("click", () => {
    limpiarHtml(contenedorPlatillos);
    Desayuno.forEach((Desayuno) => contenedorPlatillos.appendChild(Desayuno));
  });

  btnPastel.addEventListener("click", () => {
    limpiarHtml(contenedorPlatillos);
    Pastel.forEach((Pastel) => contenedorPlatillos.appendChild(Pastel));
  });

  btnTarta.addEventListener("click", () => {
    limpiarHtml(contenedorPlatillos);
    Tarta.forEach((Tarta) => contenedorPlatillos.appendChild(Tarta));
  });
  btnPostres.addEventListener("click", () => {
    limpiarHtml(contenedorPlatillos);
    postres.forEach((postre) => contenedorPlatillos.appendChild(postre));
  });
  btnTodos.addEventListener("click", () => {
    limpiarHtml(contenedorPlatillos);
    todos.forEach((todo) => contenedorPlatillos.appendChild(todo));
  });
};

const limpiarHtml = (contenedor) => {
  while (contenedor.firstChild) {
    contenedor.removeChild(contenedor.firstChild);
  }
};
// Inicializar el carrito vacío //
let carrito = [];

// Recuperar el carrito del almacenamiento local al cargar la página
if (localStorage.getItem("carrito")) {
  carrito = JSON.parse(localStorage.getItem("carrito"));
  actualizarCarrito();
}

// Obtener referencia al botón de agregar al carrito //
const botonesAgregar = document.querySelectorAll(".platillo .precio button");

// Agregar un listener de click a cada botón de agregar al carrito //
botonesAgregar.forEach(function (boton) {
  boton.addEventListener("click", function (event) {
    // Obtener el platillo asociado al botón
    const platillo = event.target.closest(".platillo");

    // Crear un objeto que represente el platillo y agregarlo al carrito //
    const platilloAgregado = {
      nombre: platillo.querySelector("h2").textContent,
      precio: parseInt(
        platillo.querySelector(".precio p").textContent.slice(1)
      ),
    };
    carrito.push(platilloAgregado);

    // Actualizar el carrito en la interfaz de usuario //
    actualizarCarrito();
  });
});

// Actualizar la interfaz de usuario del carrito //
function actualizarCarrito() {
  // Obtener referencia a la lista del carrito y el total //
  const listaCarrito = document.querySelector(".carrito-lista");
  const totalCarrito = document.querySelector(".total-precio");

  // Vaciar la lista del carrito //
  listaCarrito.innerHTML = "";

  //Agrega cada platillo en el carrito a la lista con boton eliminar platillo en el carrito//
  carrito.forEach(function (platillo) {
    const li = document.createElement("li");
    li.innerHTML = `${platillo.nombre} - $${platillo.precio} <button class="eliminar" data-nombre="${platillo.nombre}" data-precio="${platillo.precio}">Eliminar</button>`;
    listaCarrito.appendChild(li);
  });

  // elimina el platillo correspondiente de la lista y actualiza//
  const botonesEliminar = document.querySelectorAll(".eliminar");
  botonesEliminar.forEach(function (botonEliminar) {
    botonEliminar.addEventListener("click", function (event) {
      const nombre = event.target.getAttribute("data-nombre");
      const precio = parseFloat(event.target.getAttribute("data-precio"));
      carrito = carrito.filter(function (platillo) {
        return !(platillo.nombre === nombre && platillo.precio === precio);
      });
      actualizarCarrito();
    });
  });

  // Guardar el carrito en el almacenamiento local
  localStorage.setItem("carrito", JSON.stringify(carrito));

  // Actualizar el total //
  const total = carrito.reduce(function (total, platillo) {
    return total + platillo.precio;
  }, 0);
  totalCarrito.textContent = "$" + total;
}

// Vaciar el carrito //
const botonVaciar = document.querySelector(".carrito-vaciar");
botonVaciar.addEventListener("click", function () {
  carrito = [];
  actualizarCarrito();
});

// Obtener referencias a los botones "Agregar al carrito", la lista del carrito y el total //
let botonesAgregarCarrito = document.querySelectorAll(".agregar-carrito");
let carritoLista = document.querySelector(".carrito-lista");
let totalPrecio = document.querySelector(".total-precio");

// Agregar listener de click a cada botón "Agregar al carrito" //
botonesAgregarCarrito.forEach(function (botonAgregarCarrito) {
  botonAgregarCarrito.addEventListener("click", function (evento) {
    let producto = evento.target.parentElement;
    let productoNombre = producto.querySelector("h2").innerText;
    let productoPrecio = parseInt(
      producto.querySelector("p").innerText.replace("$", "")
    );

    // Crear un nuevo elemento <li> con el nombre y precio del producto y agregarlo a la lista del carrito //
    let nuevoElementoCarrito = document.createElement("li");
    nuevoElementoCarrito.innerHTML = `${productoNombre} - $${productoPrecio}`;
    carritoLista.appendChild(nuevoElementoCarrito);
    // Actualizar el total del precio del carrito sumando el precio del producto recién agregado //
    let totalActual = parseInt(totalPrecio.innerText.replace("$", ""));
    totalPrecio.innerText = `$${totalActual + productoPrecio}`;
  });
});

//---MENU--//  lo agregue en el curso de html, sacado de internet revisar a futuro!!!!
const eventos = () => {
  menu.addEventListener("click", abrirMenu);
};

const abrirMenu = () => {
  navegacion.classList.remove("ocultar");
  botonCerrar();
};

const botonCerrar = () => {
  const btnCerrar = document.createElement("p");
  const overlay = document.createElement("div");
  overlay.classList.add("pantalla-completa");
  const body = document.querySelector("body");
  if (document.querySelectorAll(".pantalla-completa").length > 0) return;
  body.appendChild(overlay);
  btnCerrar.textContent = "x";
  btnCerrar.classList.add("btn-cerrar");

  navegacion.appendChild(btnCerrar);
  cerrarMenu(btnCerrar, overlay);
};
const cerrarMenu = (boton, overlay) => {
  boton.addEventListener("click", () => {
    navegacion.classList.add("ocultar");
    overlay.remove();
    boton.remove();
  });

  overlay.onclick = function () {
    overlay.remove();
    navegacion.classList.add("ocultar");
    boton.remove();
  };
};

//--FIN MENU--//
