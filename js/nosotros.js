//---MENU--//

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

document.addEventListener("DOMContentLoaded", () => {
  let currentPhotoIndex = 0;
  const perPage = 10;
  let photos = [];

  function fetchPhotos() {
    const apiKey = "rDkiE3lwKqlJbjnNOFoK4FU0UnpNKcvssMK94Dyn6wgiT0pP26p1z4Tb";
    fetch(`https://api.pexels.com/v1/search?query=cake&per_page=${perPage}`, {
      headers: {
        Authorization: apiKey,
        "Set-Cookie": "SameSite=None; Secure",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        photos = data.photos;
        updatePhoto();
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }

  function updatePhoto() {
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = ""; // Limpiar la imagen existente antes de agregar la nueva

    const imgElement = document.createElement("img");
    imgElement.src = photos[currentPhotoIndex].src.medium;
    imgElement.alt = photos[currentPhotoIndex].photographer;
    gallery.appendChild(imgElement);
  }

  function changePhoto() {
    currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
    updatePhoto();
  }

  const changePhotoButton = document.createElement("button");
  changePhotoButton.classList.add("change-photo-button");
  changePhotoButton.innerText = "Fotos";
  changePhotoButton.addEventListener("click", changePhoto);

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");
  buttonContainer.appendChild(changePhotoButton);

  const gallery = document.querySelector(".gallery");
  gallery.parentNode.insertBefore(buttonContainer, gallery.nextSibling);

  // Obtener las 10 fotos cuando la página se carga por primera vez
  fetchPhotos();
});

//recetas

document.addEventListener("DOMContentLoaded", async () => {
  // Cargar las recetas desde el archivo JSON
  const response = await fetch("../recetas.json");
  const data = await response.json();
  const recetas = data.recetas;

  // Obtener los elementos del DOM
  const btnRecetas = document.getElementById("btnRecetas");
  const recetasOverlay = document.getElementById("recetasOverlay");
  const recetaContainer = document.getElementById("recetaContainer");
  const btnCerrar = document.getElementById("btnCerrar");
  const btnAnterior = document.getElementById("btnAnterior");
  const btnSiguiente = document.getElementById("btnSiguiente");

  // Mostrar el overlay de recetas al hacer clic en el botón "Recetas"
  btnRecetas.addEventListener("click", () => {
    recetasOverlay.style.display = "block";
    recetaContainer.classList.add("fixed"); // Agregar la clase "fixed" al contenedor
    mostrarRecetas();
  });

  // Cerrar el overlay de recetas al hacer clic en el botón "Cerrar"
  btnCerrar.addEventListener("click", () => {
    recetasOverlay.style.display = "none";
    recetaContainer.classList.remove("fixed"); // Eliminar la clase "fixed" del contenedor
    recetaContainer.innerHTML = "";
  });

  // Variables para realizar el seguimiento de la receta actual
  let recetaActual = 0;

  // Función para mostrar las recetas en el overlay
  function mostrarRecetas() {
    const receta = recetas[recetaActual];
    recetaContainer.innerHTML = "";

    const recetaHTML = `
      <div class="receta">
        <h2>${receta.nombre}</h2>
        <p>${receta.descripcion}</p>
        <h4>Ingredientes:</h4>
        <ul>
          ${receta.ingredientes
            .map((ingrediente) => `<li>${ingrediente}</li>`)
            .join("")}
        </ul>
        <h4>Instrucciones:</h4>
        <p>${receta.instrucciones}</p>
      </div>
    `;

    // Agregar la receta al contenedor
    recetaContainer.innerHTML += recetaHTML;
  }

  // Función para mostrar la receta anterior
  function mostrarRecetaAnterior() {
    recetaActual--;
    if (recetaActual < 0) {
      recetaActual = recetas.length - 1;
    }
    mostrarRecetas();
  }

  // Función para mostrar la siguiente receta
  function mostrarRecetaSiguiente() {
    recetaActual++;
    if (recetaActual >= recetas.length) {
      recetaActual = 0;
    }
    mostrarRecetas();
  }

  // Navegar a la receta anterior
  btnAnterior.addEventListener("click", () => {
    mostrarRecetaAnterior();
  });

  // Navegar a la siguiente receta
  btnSiguiente.addEventListener("click", () => {
    mostrarRecetaSiguiente();
  });
});
