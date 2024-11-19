let paso=1;const pasoInicial=1,pasoFinal=3,cita={nombre:"",fecha:"",hora:"",servicios:[]};function iniciarApp(){mostrarSeccion(),tabs(),botonesPaginador(),paginaSiguiente(),paginaAnterior(),consultaAPI(),nombreCliente(),seleccionarFecha(),seleccionarHora(),mostrarResumen()}function mostrarSeccion(){const e=document.querySelector(".mostrar");e&&e.classList.remove("mostrar");const o=`#paso-${paso}`;document.querySelector(o).classList.add("mostrar"),tabAnterior=document.querySelector(".actual"),tabAnterior&&tabAnterior.classList.remove("actual");document.querySelector(`[data-paso="${paso}"]`).classList.add("actual")}function tabs(){document.querySelectorAll(".tabs button").forEach((e=>{e.addEventListener("click",(function(e){paso=parseInt(e.target.dataset.paso),mostrarSeccion(),botonesPaginador()}))}))}function botonesPaginador(){const e=document.querySelector("#anterior"),o=document.querySelector("#siguiente");1===paso?(e.classList.add("ocultar"),o.classList.remove("ocultar")):3===paso?(e.classList.remove("ocultar"),o.classList.add("ocultar"),mostrarResumen()):(e.classList.remove("ocultar"),o.classList.remove("ocultar")),mostrarSeccion()}function paginaAnterior(){document.querySelector("#anterior").addEventListener("click",(function(){paso<=1||(paso--,botonesPaginador())}))}function paginaSiguiente(){document.querySelector("#siguiente").addEventListener("click",(function(){paso>=3||(paso++,botonesPaginador())}))}async function consultaAPI(){try{const e="http://localhost:3000/api/servicios",o=await fetch(e);mostrarServicios(await o.json())}catch(e){console.log(e)}}function mostrarServicios(e){e.forEach((e=>{const{id:o,nombre:t,precio:a}=e,c=document.createElement("P");c.classList.add("nombre-servicio"),c.textContent=t;const n=document.createElement("P");n.classList.add("precio-servicio"),n.textContent=`$${a}`;const r=document.createElement("DIV");r.dataset.idServicio=o,r.classList.add("contenedor-servicio"),r.appendChild(c),r.appendChild(n),r.onclick=function(){seleccionarServicio(e)},document.querySelector("#servicios").appendChild(r)}))}function seleccionarServicio(e){const{id:o}=e,{servicios:t}=cita,a=document.querySelector(`[data-id-servicio="${o}"]`);t.some((e=>e.id===o))?(cita.servicios=t.filter((e=>e.id!==o)),a.classList.remove("seleccionado")):(cita.servicios=[...t,e],a.classList.add("seleccionado"))}function nombreCliente(){cita.nombre=document.querySelector("#nombre").value}function seleccionarFecha(){const e=document.querySelector("#fecha"),o=(new Date).getDate();console.log(o),e.addEventListener("input",(function(e){const o=new Date(e.target.value).getUTCDay();[0,6].includes(o)?(e.target.value="",mostrarAlerta("Fines de semana no permitidos","error",".formulario")):cita.fecha=e.target.value}))}function seleccionarHora(){document.querySelector("#hora").addEventListener("change",(function(e){const o=e.target.value,t=o.split(":")[0];t<8||t>20?mostrarAlerta("Hora no Válida","error",".formulario"):cita.hora=o}))}function mostrarAlerta(e,o,t,a=!0){const c=document.querySelector(".alerta");c&&c.remove();const n=document.createElement("DIV");n.textContent=e,n.classList.add("alerta"),n.classList.add(o),console.log(n);document.querySelector(t).appendChild(n),a&&setTimeout((()=>{n.remove()}),3e3)}function mostrarResumen(){document.querySelector(".contenido-resumen");console.log(cita),Object.values(cita).includes("")||0===cita.servicios.length?mostrarAlerta("hacen falta datos de servicio, fecha u hora","error",".contenido-resumen",!1):console.log("Todo bien")}document.addEventListener("DOMContentLoaded",(function(){iniciarApp()}));