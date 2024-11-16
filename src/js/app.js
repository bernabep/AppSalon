let paso = 1;

document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
});


function iniciarApp(){
    mostrarSeccion()
    tabs();
}
function mostrarSeccion(){


//Ocultar las secciones que tienen las clases mostrar
const seccionAnterior = document.querySelector('.mostrar');
if (seccionAnterior){
    seccionAnterior.classList.remove('mostrar');
}   

//Seleccionar la sección con el paso...
const pasoSelector = `#paso-${paso}`;
const seccion = document.querySelector(pasoSelector);
seccion.classList.add('mostrar');

//Resalta el tab actual 
tabAnterior = document.querySelector('.actual')
if(tabAnterior){
    tabAnterior.classList.remove('actual')
}
 
const tab = document.querySelector(`[data-paso="${paso}"]`)
tab.classList.add('actual')
}
function tabs(){
    const botones = document.querySelectorAll('.tabs button');
    botones.forEach(boton=>{boton.addEventListener('click', function(e){
        paso = parseInt(e.target.dataset.paso);
        mostrarSeccion();

    })});
}

