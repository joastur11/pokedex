//opcional mio: pagina principal titulo y boton abrir para mostrar ahi las listas, estilo bootstrap
//ocultar lista cuando se abran los detalles y boton de atras para volver a la lista

let offset = 0
const limit = 30

function mostrarListaPokemones (){
    fetch (`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`) 
        .then (respuesta => respuesta.json())
        .then (data => {
            const lista = document.querySelector('#lista')
            lista.innerHTML = ''
            data.results.forEach (pokemon=> {
                const item = document.createElement('li');
                item.textContent = pokemon.name;
                item.dataset.url = pokemon.url;
                lista.appendChild(item);
            })
        })
        .catch (error => console.error ('FALLO', error))

    const paginaActual = Math.floor(offset / limit) + 1
    document.querySelector('#pagina').textContent = paginaActual

    if (offset === 0){
        document.querySelector('#pagina-anterior').classList.add('hidden');
    } else {
        document.querySelector('#pagina-anterior').classList.remove('hidden');
    }
}

mostrarListaPokemones()

document.querySelector('#pagina-anterior').addEventListener('click', () => {
  if (offset >= limit) {
    offset -= limit;
    mostrarListaPokemones();
  }
});

document.querySelector('#pagina-siguiente').addEventListener('click', () => {
  offset += limit;
  mostrarListaPokemones();
});

document.querySelector('#lista').addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {            //o LI
        const url = e.target.dataset.url;
        verDetallesPokemon(url);
    }
});

function verDetallesPokemon (url){
    fetch(url)
        .then (respuesta => respuesta.json())
        .then (data => {
            let tipos = []
            data.types.forEach(tipoNombre => {
            tipos.push(tipoNombre.type.name);
            }); 
            const $detalles = document.querySelector('#detalles-pokemon')           
            $detalles.innerHTML = ''
            $detalles.innerHTML = `
                <h2>${data.name}</h2>
                <ul>
                    <label> Tipos </label>
                    ${tipos}
                    <label> Altura </label>
                    ${data.height}
                    <label> Peso </label>
                    ${data.weight}
                </ul>
                <img src="${data.sprites.front_default}" alt="${data.name}" />
            `            
        })
}
