jest.mock('../index.js', () => ({
    verDetallesPokemon: jest.fn(),
    cargarPagina: jest.fn(),
}));
  
jest.mock('../pagina.js', () => ({
    aumentarOffset: jest.fn(),
    disminuirOffset: jest.fn(),
}));

import { cargarPagina, verDetallesPokemon } from "../index.js";
import { paginaAnterior, paginaSiguiente, clickPokemon, botonVolver } from "../eventos";
import { aumentarOffset, disminuirOffset } from "../pagina";


describe ('paginaAnterior', () => {
    beforeEach(() => {
        document.body.innerHTML = '<button id="pagina-anterior"></button>'
        jest.clearAllMocks(); 
    })

    test ('el boton pasa a la pagina anterior', () => {
        paginaAnterior()

        const btn = document.querySelector('#pagina-anterior');
        btn.click();

        expect(disminuirOffset).toHaveBeenCalled();
        expect(cargarPagina).toHaveBeenCalled();
    })
})

describe ('paginaSiguiente', () => {
    beforeEach(() => {
        document.body.innerHTML = '<button id="pagina-siguiente"></button>'
        jest.clearAllMocks(); 
    })

    test ('el boton pasa a la pagina siguiente', () => {
        paginaSiguiente()

        const btn = document.querySelector('#pagina-siguiente');
        btn.click();

        expect(aumentarOffset).toHaveBeenCalled();
        expect(cargarPagina).toHaveBeenCalled();
    })
})

describe('botonVolver', () =>{
    beforeEach(() => {
        document.body.innerHTML =`
            <section id="detalles-pokemon"></section>
            <ul id="lista"></ul>
            <div id="manejo-pagina"></div>
            <button id="volver" class="d-none"></button>
        `
        jest.clearAllMocks(); 
    })

    test ('el boton volver oculta los detalles y vuelve a mostrar la lista y los botones de pagina', () =>{
        botonVolver()

        const btn = document.querySelector('#volver');
        btn.click();

        const detalles = document.querySelector('#detalles-pokemon')
        expect(detalles.innerHTML).toBe('')

        const lista = document.querySelector('#lista')
        expect(lista.classList.contains('d-none')).toBe(false)

        const manejoPagina = document.querySelector('#manejo-pagina')
        expect(manejoPagina.classList.contains('d-none')).toBe(false)
    })
})

describe ('clickPokemon', () => {
    beforeEach(() => {
        document.body.innerHTML =  `
            <ul id="lista">
                <li><button data-url="https://pokeapi.co/api/v2/pokemon/25">Pikachu</button></li>
            </ul>
        `
        jest.clearAllMocks(); 
    })

    test ('abre los detalles del pokemon clickeado con la URL correcta', () => {
        clickPokemon()

        const btn = document.querySelector('button')
        btn.click()

        expect(verDetallesPokemon).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/25')
    })

    test('no llama a verDetallesPokemon si se clickea otro elemento que no es botón', () => {
        document.querySelector('#lista').innerHTML += `<li><span>Not a button</span></li>`;
        clickPokemon();
      
        const span = document.querySelector('span');
        span.click();
      
        expect(verDetallesPokemon).not.toHaveBeenCalled();
      });
})


