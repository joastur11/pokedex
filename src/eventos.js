// funciones que hagan eventos
export {paginaAnterior, paginaSiguiente, clickPokemon, botonVolver}

import {verDetallesPokemon,cargarPagina} from './index.js'
import {aumentarOffset, disminuirOffset} from './pagina.js'

const $detalles = document.querySelector('#detalles-pokemon')  

function paginaAnterior (){
    document.querySelector('#pagina-anterior').addEventListener('click', () => {
        disminuirOffset()
        cargarPagina()
        }
)}

function paginaSiguiente (){
    document.querySelector('#pagina-siguiente').addEventListener('click', () => {
        aumentarOffset()
        cargarPagina()
    });
}

function clickPokemon (){
    document.querySelector('#lista').addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {            
            const url = e.target.dataset.url;
            verDetallesPokemon(url);
        }
    });
}

function botonVolver (){
    document.querySelector('#volver').addEventListener('click', () => {
        $detalles.innerHTML = ''
        document.querySelector('#volver').classList.add('d-none')
        document.querySelector('#lista').classList.remove('d-none')
        document.querySelector('#manejo-pagina').classList.remove('d-none')      
    })
}


