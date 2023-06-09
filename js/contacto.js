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
  const nombreInput = document.getElementById("nombre");
  const apellidosInput = document.getElementById("apellidos");
  const correoInput = document.getElementById("correo");
  const telefonoInput = document.getElementById("telefono");
  const mensajeTextarea = document.querySelector(".formulario textarea");
  const formulario = document.querySelector(".formulario");

  formulario.addEventListener("submit", (e) => {
    e.preventDefault(); // Evita que el formulario se envíe de forma predeterminada

    // Valida los campos del formulario antes de enviarlo
    if (validarCampos()) {
      // Aquí puedes agregar la lógica para enviar el formulario
      formulario.reset(); // Reiniciar el formulario
      console.log("Mensaje enviado");
    }
  });

  function validarCampos() {
    let isValid = true;

    // Restablecer mensajes de error y éxito
    const mensajesError = document.querySelectorAll(".mensaje-error");
    const contenedores = document.querySelectorAll(".input-formulario");

    mensajesError.forEach((mensaje) => {
      mensaje.textContent = "";
    });

    contenedores.forEach((contenedor) => {
      contenedor.classList.remove("error");
      contenedor.classList.remove("exito");
    });

    // Validar campos individualmente
    if (nombreInput.value.trim() === "") {
      mostrarError(nombreInput, "El campo Nombre es requerido");
      isValid = false;
    } else {
      mostrarExito(nombreInput);
    }

    if (apellidosInput.value.trim() === "") {
      mostrarError(apellidosInput, "El campo Apellido es requerido");
      isValid = false;
    } else {
      mostrarExito(apellidosInput);
    }

    if (correoInput.value.trim() === "") {
      mostrarError(correoInput, "El campo Correo es requerido");
      isValid = false;
    } else if (!esCorreoValido(correoInput.value.trim())) {
      mostrarError(correoInput, "El correo ingresado no es válido");
      isValid = false;
    } else {
      mostrarExito(correoInput);
    }

    if (telefonoInput.value.trim() === "") {
      mostrarError(telefonoInput, "El campo Teléfono es requerido");
      isValid = false;
    } else {
      mostrarExito(telefonoInput);
    }

    if (mensajeTextarea.value.trim() === "") {
      mostrarError(mensajeTextarea, "El campo Mensaje es requerido");
      isValid = false;
    } else {
      mostrarExito(mensajeTextarea);
    }

    return isValid;
  }
  function esCorreoValido(correo) {
    return correo.includes("@");
  }

  function mostrarError(elemento, mensaje) {
    const contenedor = elemento.parentElement;
    const mensajeError = contenedor.querySelector(".mensaje-error");
    mensajeError.textContent = mensaje;
    contenedor.classList.add("error");
  }

  function mostrarExito(elemento) {
    const contenedor = elemento.parentElement;
    contenedor.classList.remove("error");
    contenedor.classList.remove("exito"); // Agrega esta línea para eliminar la clase "exito" si existe
    contenedor.classList.add("exito");
  }
});
