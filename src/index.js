import {traerListaPokemon, obtenerDetallesPokemon} from './api.js';
import { mostrarListaPokemones, actualizarPagina, mostrarBotonAnterior, abrirDetalles } from './ui.js';
import {clickPokemon, botonVolver, paginaAnterior, paginaSiguiente} from './eventos.js';
import { offset, limit } from './pagina.js';

async function mostrarPokemones() {
    try {
      const data = await traerListaPokemon(limit, offset);
      mostrarListaPokemones(data.results);
      actualizarPagina(offset, limit);
      mostrarBotonAnterior(offset);
    } catch (error) {
      console.error('Error al cargar Pokemones', error);
    }
}

const verDetallesPokemon = async function (url) {
    try {
      const data = await obtenerDetallesPokemon(url);
      abrirDetalles(data);
    } catch (error) {
      console.error('Error al obtener detalles del Pokémon', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    mostrarPokemones();
  
    paginaAnterior(offset, limit);
    paginaSiguiente(offset, limit);
    clickPokemon();
    botonVolver();
    cargarPagina()
});

async function cargarPagina() {
    const data = await traerListaPokemon(limit, offset);
    mostrarListaPokemones(data.results);
    actualizarPagina(offset, limit);
    mostrarBotonAnterior(offset) 
}


export {verDetallesPokemon, cargarPagina}
