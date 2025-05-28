// funciones que hagan fetch

export {traerListaPokemon, obtenerDetallesPokemon}

async function traerListaPokemon (limit, offset){
    const respuesta = await fetch (`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`) 
    if (!respuesta.ok) throw new Error
    return await respuesta.json()   
}

async function obtenerDetallesPokemon(url) {
    const respuesta = await fetch(url);
    if (!respuesta.ok) throw new Error('No se pudieron obtener los detalles del Pokémon');
    return await respuesta.json();
  }