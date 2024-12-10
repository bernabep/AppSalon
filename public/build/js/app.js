let paso=1;const pasoInicial=1,pasoFinal=3,cita={id:"",nombre:"",fecha:"",hora:"",servicios:[]};function iniciarApp(){mostrarSeccion(),tabs(),botonesPaginador(),paginaSiguiente(),paginaAnterior(),consultaAPI(),idCliente(),nombreCliente(),seleccionarFecha(),seleccionarHora(),mostrarResumen()}function mostrarSeccion(){const e=document.querySelector(".mostrar");e&&e.classList.remove("mostrar");const t=`#paso-${paso}`;document.querySelector(t).classList.add("mostrar"),tabAnterior=document.querySelector(".actual"),tabAnterior&&tabAnterior.classList.remove("actual");document.querySelector(`[data-paso="${paso}"]`).classList.add("actual")}function tabs(){document.querySelectorAll(".tabs button").forEach((e=>{e.addEventListener("click",(function(e){paso=parseInt(e.target.dataset.paso),mostrarSeccion(),botonesPaginador()}))}))}function botonesPaginador(){const e=document.querySelector("#anterior"),t=document.querySelector("#siguiente");1===paso?(e.classList.add("ocultar"),t.classList.remove("ocultar")):3===paso?(e.classList.remove("ocultar"),t.classList.add("ocultar"),mostrarResumen()):(e.classList.remove("ocultar"),t.classList.remove("ocultar")),mostrarSeccion()}function paginaAnterior(){document.querySelector("#anterior").addEventListener("click",(function(){paso<=1||(paso--,botonesPaginador())}))}function paginaSiguiente(){document.querySelector("#siguiente").addEventListener("click",(function(){paso>=3||(paso++,botonesPaginador())}))}async function consultaAPI(){try{const e=`${location.origin}/api/servicios`,t=await fetch(e);mostrarServicios(await t.json())}catch(e){console.log(e)}}function mostrarServicios(e){e.forEach((e=>{const{id:t,nombre:o,precio:n}=e,a=document.createElement("P");a.classList.add("nombre-servicio"),a.textContent=o;const c=document.createElement("P");c.classList.add("precio-servicio"),c.textContent=`$${n}`;const r=document.createElement("DIV");r.dataset.idServicio=t,r.classList.add("servicio"),r.appendChild(a),r.appendChild(c),r.onclick=function(){seleccionarServicio(e)},document.querySelector("#servicios").appendChild(r)}))}function seleccionarServicio(e){const{id:t}=e,{servicios:o}=cita,n=document.querySelector(`[data-id-servicio="${t}"]`);o.some((e=>e.id===t))?(cita.servicios=o.filter((e=>e.id!==t)),n.classList.remove("seleccionado")):(cita.servicios=[...o,e],n.classList.add("seleccionado"))}function idCliente(){cita.id=document.querySelector("#id").value}function nombreCliente(){cita.nombre=document.querySelector("#nombre").value}function seleccionarFecha(){const e=document.querySelector("#fecha");(new Date).getDate();e.addEventListener("input",(function(e){const t=new Date(e.target.value).getUTCDay();[0,6].includes(t)?(e.target.value="",mostrarAlerta("Fines de semana no permitidos","error",".formulario")):cita.fecha=e.target.value}))}function seleccionarHora(){document.querySelector("#hora").addEventListener("change",(function(e){const t=e.target.value,o=t.split(":")[0];o<8||o>20?mostrarAlerta("Hora no Válida","error",".formulario"):cita.hora=t}))}function mostrarAlerta(e,t,o,n=!0){const a=document.querySelector(".alerta");a&&a.remove();const c=document.createElement("DIV");c.textContent=e,c.classList.add("alerta"),c.classList.add(t);document.querySelector(o).appendChild(c),n&&setTimeout((()=>{c.remove()}),3e3)}function mostrarResumen(){const e=document.querySelector(".contenido-resumen");for(;e.firstChild;)e.removeChild(e.firstChild);if(Object.values(cita).includes("")||0===cita.servicios.length)return void mostrarAlerta("hacen falta datos de servicio, fecha u hora","error",".contenido-resumen",!1);const{nombre:t,fecha:o,hora:n,servicios:a}=cita,c=document.createElement("H3");c.textContent="Resumen de Servicios",e.appendChild(c),a.forEach((t=>{const{id:o,nombre:n,precio:a}=t,c=document.createElement("DIV");c.classList.add("contenedor-servicio");const r=document.createElement("P");r.textContent=n;const i=document.createElement("P");i.innerHTML=`<span>Precio:</span> $${a}`,c.appendChild(r),c.appendChild(i),e.appendChild(c)}));const r=document.createElement("H3");r.textContent="Resumen de Cita",e.appendChild(r);const i=document.createElement("P");i.innerHTML=`<span>Nombre:</span> ${t}`;const s=new Date(o),d=s.getDate(),l=s.getMonth(),u=s.getFullYear(),m=new Date(Date.UTC(u,l,d)).toLocaleString("es-ES",{weekday:"long",year:"numeric",month:"long",day:"numeric"}),p=document.createElement("P");p.innerHTML=`<span>Fecha:</span> ${m}`;const v=document.createElement("P");v.innerHTML=`<span>Hora:</span> ${n} Horas`;const h=document.createElement("BUTTON");h.classList.add("boton"),h.textContent="Reservar Cita",h.onclick=reservarCita,e.appendChild(i),e.appendChild(p),e.appendChild(v),e.appendChild(h)}async function reservarCita(){const{nombre:e,fecha:t,hora:o,servicios:n,id:a}=cita,c=n.map((e=>e.id)),r=new FormData;r.append("usuarioId",a),r.append("fecha",t),r.append("hora",o),r.append("servicios",c);try{const e=`${location.origin}/api/citas`,t=await fetch(e,{method:"POST",body:r}),o=await t.json();console.log(o.resultado),o.resultado&&Swal.fire({icon:"success",title:"Cita Creada",text:"Tu cita fue creada correctamente",button:"OK"}).then((()=>{setTimeout((()=>{window.location.reload()}),2e3)}))}catch(e){Swal.fire({icon:"error",title:"Error",text:"Hubo un error"})}}document.addEventListener("DOMContentLoaded",(function(){iniciarApp()}));