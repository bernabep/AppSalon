let paso = 1;
const pasoInicial = 1;
const pasoFinal = 3;
const cita = {
  nombre: "",
  fecha: "",
  hora: "",
  servicios: [],
};

document.addEventListener("DOMContentLoaded", function () {
  iniciarApp();
});

function iniciarApp() {
  mostrarSeccion(); // Muestra y oculta las secciones
  tabs(); //Cambia las sección cuando se presionen los tabs
  botonesPaginador(); //Agrega o quita los botones del paginador
  paginaSiguiente();
  paginaAnterior();
  consultaAPI(); //Consulta la API
  nombreCliente(); //Añade el nombre del cliente al objeto de cita
  seleccionarFecha(); //Añade la fecha de la cita al objeto de cita
  seleccionarHora(); //Añade la hora de la cita al objeto de cita

  mostrarResumen(); //Muestra el resumen de la cita
}

function mostrarSeccion() {
  //Ocultar las secciones que tienen las clases mostrar
  const seccionAnterior = document.querySelector(".mostrar");
  if (seccionAnterior) {
    seccionAnterior.classList.remove("mostrar");
  }

  //Seleccionar la sección con el paso...
  const pasoSelector = `#paso-${paso}`;
  const seccion = document.querySelector(pasoSelector);
  seccion.classList.add("mostrar");

  //Resalta el tab actual
  tabAnterior = document.querySelector(".actual");
  if (tabAnterior) {
    tabAnterior.classList.remove("actual");
  }

  const tab = document.querySelector(`[data-paso="${paso}"]`);
  tab.classList.add("actual");
}
function tabs() {
  const botones = document.querySelectorAll(".tabs button");
  botones.forEach((boton) => {
    boton.addEventListener("click", function (e) {
      paso = parseInt(e.target.dataset.paso);
      mostrarSeccion();
      botonesPaginador();
    });
  });
}

function botonesPaginador() {
  const paginaAnterior = document.querySelector("#anterior");
  const paginaSiguiente = document.querySelector("#siguiente");

  if (paso === 1) {
    paginaAnterior.classList.add("ocultar");
    paginaSiguiente.classList.remove("ocultar");
  } else if (paso === 3) {
    paginaAnterior.classList.remove("ocultar");
    paginaSiguiente.classList.add("ocultar");
    mostrarResumen();
  } else {
    paginaAnterior.classList.remove("ocultar");
    paginaSiguiente.classList.remove("ocultar");
  }
  mostrarSeccion();
}

function paginaAnterior() {
  const paginaAnterior = document.querySelector("#anterior");
  paginaAnterior.addEventListener("click", function () {
    if (paso <= pasoInicial) return;
    paso--;
    botonesPaginador();
  });
}

function paginaSiguiente() {
  const paginaSiguiente = document.querySelector("#siguiente");
  paginaSiguiente.addEventListener("click", function () {
    if (paso >= pasoFinal) return;
    paso++;
    botonesPaginador();
  });
}

async function consultaAPI() {
  try {
    const url = "http://localhost:3000/api/servicios";
    const resultado = await fetch(url);
    const servicios = await resultado.json();
    mostrarServicios(servicios);
  } catch (error) {
    console.log(error);
  }
}

function mostrarServicios(servicios) {
  servicios.forEach((servicio) => {
    // const id = servicio['id'];
    // const nombre = servicio['nombre'];
    // const precio = servicio['precio'];
    const { id, nombre, precio } = servicio;
    const nombreServicio = document.createElement("P");
    nombreServicio.classList.add("nombre-servicio");
    nombreServicio.textContent = nombre;

    const precioServicio = document.createElement("P");
    precioServicio.classList.add("precio-servicio");
    precioServicio.textContent = `$${precio}`;

    const contenedorDiv = document.createElement("DIV");
    contenedorDiv.dataset.idServicio = id;
    contenedorDiv.classList.add("contenedor-servicio");
    contenedorDiv.appendChild(nombreServicio);
    contenedorDiv.appendChild(precioServicio);
    contenedorDiv.onclick = function () {
      seleccionarServicio(servicio);
    };
    document.querySelector("#servicios").appendChild(contenedorDiv);
  });
}

function seleccionarServicio(servicio) {
  const { id } = servicio;
  const { servicios } = cita;
  const contenedorDiv = document.querySelector(`[data-id-servicio="${id}"]`);

  //Comprobar si un servicio ya fue agregado
  if (servicios.some((agregado) => agregado.id === id)) {
    //Eliminar el servicio
    cita.servicios = servicios.filter((agregado) => agregado.id !== id);
    contenedorDiv.classList.remove("seleccionado");
  } else {
    cita.servicios = [...servicios, servicio];
    contenedorDiv.classList.add("seleccionado");
  }
}

function nombreCliente() {
  cita.nombre = document.querySelector("#nombre").value;
}

function seleccionarFecha() {
  const inputFecha = document.querySelector("#fecha");
  const hoy = new Date().getDate();
  console.log(hoy);
  inputFecha.addEventListener("input", function (e) {
    const dia = new Date(e.target.value).getUTCDay();
    if ([0, 6].includes(dia)) {
      e.target.value = "";
      mostrarAlerta('Fines de semana no permitidos', 'error', '.formulario');
    } else {
      cita.fecha = e.target.value;
    }
  });
}

function seleccionarHora() {
  const inputHora = document.querySelector("#hora");
  inputHora.addEventListener("change", function (e) {
    const horaCita = e.target.value;
    const hora = horaCita.split(":")[0];
    if (hora < 8 || hora > 20) {
      mostrarAlerta('Hora no Válida', 'error', '.formulario');
    } else {
      cita.hora = horaCita;
    }
  });
}

function mostrarAlerta(mensaje, tipo, elemento, desaparece = true) {
  //Previene que se generen más de 1 alerta
  const alertaPrevia = document.querySelector(".alerta");
  if (alertaPrevia){
    alertaPrevia.remove();
  }

  //Scriptin para crear la alerta
  const alerta = document.createElement("DIV");
  alerta.textContent = mensaje;
  alerta.classList.add("alerta");
  alerta.classList.add(tipo);
  console.log(alerta);
  const referencia = document.querySelector(elemento);
  referencia.appendChild(alerta);

  //Eliminamos la alerta tras 3 segundos
  if (desaparece) {
    setTimeout(() => {
      alerta.remove();
    }, 3000);
  }
}

function mostrarResumen() {
  const resumen = document.querySelector(".contenido-resumen");
  console.log(cita);
  if (Object.values(cita).includes("") || cita.servicios.length === 0) {
    mostrarAlerta(
      "hacen falta datos de servicio, fecha u hora",
      "error",
      ".contenido-resumen",
      false
    );
  } else {
    console.log("Todo bien");
  }
}
