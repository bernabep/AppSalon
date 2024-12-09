let paso = 1;
const pasoInicial = 1;
const pasoFinal = 3;
const cita = {
  id: "",
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
  idCliente(); //Añade el nombre del cliente al objeto de cita
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
    const url = "/api/servicios";
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
    contenedorDiv.classList.add("servicio");
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

function idCliente() {
  cita.id = document.querySelector("#id").value;
}
function nombreCliente() {
  cita.nombre = document.querySelector("#nombre").value;
}

function seleccionarFecha() {
  const inputFecha = document.querySelector("#fecha");
  const hoy = new Date().getDate();
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

  //Limpiar el contenido Resumen
  while(resumen.firstChild){
    resumen.removeChild(resumen.firstChild);
  }

  
  if (Object.values(cita).includes("") || cita.servicios.length === 0) {
    mostrarAlerta(
      "hacen falta datos de servicio, fecha u hora",
      "error",
      ".contenido-resumen",
      false
    );
    return;
  } 

  //Formatear el div de Resumen 
  const {nombre,fecha,hora,servicios} = cita;
  //Creo encabezado de resumen servicios
  const headingServicios = document.createElement('H3');
  headingServicios.textContent = "Resumen de Servicios"

  resumen.appendChild(headingServicios);

  servicios.forEach(servicio=>{
    const {id,nombre,precio} = servicio;
    const contenedorServicio = document.createElement('DIV');
    contenedorServicio.classList.add('contenedor-servicio');

    const textoServicio = document.createElement('P');
    textoServicio.textContent = nombre;

    const precioServicio = document.createElement('P');
    precioServicio.innerHTML = `<span>Precio:</span> $${precio}`;

    contenedorServicio.appendChild(textoServicio);
    contenedorServicio.appendChild(precioServicio);
    resumen.appendChild(contenedorServicio);
  })

  //Creo encabezado 
  const headingCita = document.createElement('H3');
  headingCita.textContent = "Resumen de Cita"

  resumen.appendChild(headingCita);
  const nombreCliente = document.createElement('P');
  nombreCliente.innerHTML = `<span>Nombre:</span> ${nombre}`;

  //Formatemos fecha
  const fechaObj = new Date(fecha);
  const dia = fechaObj.getDate();
  const mes = fechaObj.getMonth();
  const anno = fechaObj.getFullYear();
  const fechaUTC = new Date(Date.UTC(anno,mes,dia));
  const opciones = {weekday:'long',year:'numeric',month:'long',day:'numeric'};
  const fechaFormateada = fechaUTC.toLocaleString('es-ES',opciones)

  const fechaCita = document.createElement('P');
  fechaCita.innerHTML = `<span>Fecha:</span> ${fechaFormateada}`;
  const horaCita = document.createElement('P');
  horaCita.innerHTML = `<span>Hora:</span> ${hora} Horas`;

  //Añadiendo boton reservar cita
  const botonReservar = document.createElement('BUTTON');
  botonReservar.classList.add('boton');
  botonReservar.textContent = 'Reservar Cita';
  botonReservar.onclick = reservarCita;

  resumen.appendChild(nombreCliente);
  resumen.appendChild(fechaCita);
  resumen.appendChild(horaCita);
  resumen.appendChild(botonReservar);
  
}

async function reservarCita(){
  const {nombre,fecha,hora,servicios,id} = cita;
  const idServicios = servicios.map(servicio=>servicio.id)
  const datos = new FormData();
  datos.append('usuarioId',id);
  datos.append('fecha',fecha);
  datos.append('hora',hora);
  datos.append('servicios',idServicios);
  
  try {
    //Petición hacia la API
  const url = '/api/citas';
  const respuesta = await fetch(url,{
    method:'POST',
    body: datos
  });

  const resultado = await respuesta.json();
  console.log(resultado.resultado);

  if(resultado.resultado){
    Swal.fire({
      icon: "success",
      title: "Cita Creada",
      text: "Tu cita fue creada correctamente",
      button: "OK"
    }).then(()=>{
      setTimeout(() => {
        window.location.reload();        
      }, 2000);
    } );
  }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Hubo un error"
    });
  }
  

  


  // console.log([...datos])
}
