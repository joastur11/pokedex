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

const $detalles = document.querySelector('#detalles-pokemon')  

function verDetallesPokemon (url){                                 
    fetch(url)
        .then (respuesta => respuesta.json())
        .then (data => {
            let tipos = []
            data.types.forEach(tipoNombre => {
            tipos.push(tipoNombre.type.name);
            });
            document.querySelector('#volver').classList.remove('hidden')
            document.querySelector('#lista').classList.add('hidden')  
            document.querySelector('#manejo-pagina').classList.add('hidden')      
            $detalles.innerHTML = ''
            $detalles.innerHTML = `
                <div class="card text-center">
                <img src="${data.sprites.front_default}" class="card-img-top mx-auto" style="width: 150px;" alt="${data.name}">
                <div class="card-body">
                    <h5 class="card-title">${data.name}</h5>
                    <p class="card-text">Tipo: ${tipos}<br>Altura: ${data.height}<br>Peso: ${data.weight}</p>
                </div>
                </div>
            `
        })
}

document.querySelector('#volver').addEventListener('click', (e) => {
    $detalles.innerHTML = ''
    document.querySelector('#volver').classList.add('hidden')
    document.querySelector('#lista').classList.remove('hidden')
    document.querySelector('#manejo-pagina').classList.remove('hidden')      
})
