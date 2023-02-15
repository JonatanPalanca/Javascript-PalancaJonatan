const menu = document.querySelector(".hamburguesa");
const navegacion = document.querySelector(".navegacion");
const imagenes = document.querySelectorAll("img");
const btnTodos = document.querySelector(".todos");
const btnDesayuno = document.querySelector(".Desayuno");
const btnPastel = document.querySelector(".Pastel");
const btnTarta = document.querySelector(".Tarta");
const btnPostres = document.querySelector(".postres");
const contenedorPlatillos = document.querySelector(".platillos");
document.addEventListener("DOMContentLoaded", () => {
  eventos();
  platillos();
});

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

  // while(navegacion.children[5]){
  //     navegacion.removeChild(navegacion.children[5]);
  // }
  navegacion.appendChild(btnCerrar);
  cerrarMenu(btnCerrar, overlay);
};

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

function platillos() {
  let platillosArreglo = [];
  const platillos = document.querySelectorAll(".platillo");

  platillos.forEach(
    (platillo) => (platillosArreglo = [...platillosArreglo, platillo])
  );

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
