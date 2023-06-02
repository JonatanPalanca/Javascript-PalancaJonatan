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
  changePhotoButton.innerText = "Cambiar Foto";
  changePhotoButton.addEventListener("click", changePhoto);

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");
  buttonContainer.appendChild(changePhotoButton);

  const gallery = document.querySelector(".gallery");
  gallery.parentNode.insertBefore(buttonContainer, gallery.nextSibling);

  // Obtener las 10 fotos cuando la página se carga por primera vez
  fetchPhotos();
});
