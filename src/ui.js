// funciones del dom
export {mostrarListaPokemones, actualizarPagina, mostrarBotonAnterior, abrirDetalles}

const $detalles = document.querySelector('#detalles-pokemon')  

function mostrarListaPokemones(pokemones) {
    const lista = document.querySelector('#lista')

    lista.innerHTML = ''
    
    pokemones.forEach(pokemon => {
        const item = document.createElement('li');
        item.innerHTML = `
        <button class="btn btn-light w-100 text-start mb-2 text-capitalize" data-url="${pokemon.url}">
            ${pokemon.name}
        </button>
        `;
        lista.appendChild(item);
    })         
}

function actualizarPagina (offset, limit){
    const paginaActual = Math.floor(offset / limit) + 1
    document.querySelector('#pagina').textContent = paginaActual
}

function mostrarBotonAnterior (offset){
    if (offset === 0){
        document.querySelector('#pagina-anterior').classList.add('d-none');
    } else {
        document.querySelector('#pagina-anterior').classList.remove('d-none');
    }
}

function abrirDetalles (data){
    let tipos = []
    data.types.forEach(tipoNombre => {
    tipos.push(tipoNombre.type.name);
    });
    document.querySelector('#volver').classList.remove('d-none')
    document.querySelector('#lista').classList.add('d-none')  
    document.querySelector('#manejo-pagina').classList.add('d-none')      
    $detalles.innerHTML = `
        <div class="card text-center">
        <img src="${data.sprites.front_default}" class="card-img-top mx-auto" style="width: 150px;" alt="${data.name}">
        <div class="card-body">
            <h5 class="card-title">${data.name}</h5>
            <p class="card-text">Tipo: ${tipos}<br>Altura: ${data.height}<br>Peso: ${data.weight}</p>
        </div>
        </div>
    `
}