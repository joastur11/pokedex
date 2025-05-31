import {mostrarListaPokemones, actualizarPagina, mostrarBotonAnterior, abrirDetalles} from '../ui.js'


describe('mostrarListaPokemones', () => {
    beforeEach(() => {
      document.body.innerHTML = '<ul id="lista"></ul>'
    })
  
    afterEach(() => {
      document.body.innerHTML = ''
    })
  
    test('agrega un elemento por cada pokemon y limpia la lista antes', () => {
      const pokemones = [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' }
      ]
  
      const lista = document.querySelector('#lista')
      lista.innerHTML = '<li>algo viejo</li>' 
  
      mostrarListaPokemones(pokemones)
  
      const items = lista.querySelectorAll('li')
      expect(items.length).toBe(2)
  
      const primerBoton = items[0].querySelector('button')
      expect(primerBoton.textContent.trim()).toBe('bulbasaur')
      expect(primerBoton.getAttribute('data-url')).toBe(pokemones[0].url)
    })
})

describe ('actualizarPagina', () => {
    beforeEach(()=>{
        document.body.innerHTML = '<span id="pagina"></span>'
    })

    test ('calcula el numero de pagina', () => {
        let offset = 0
        let limit = 15

        actualizarPagina(offset, limit)
        
        const span = document.querySelector('#pagina')
        expect(span.textContent).toBe('1')
    })    
})

describe ('mostrarBotonAnterior', () => {
    beforeEach(()=>{
        document.body.innerHTML = '<button id="pagina-anterior" class="d-none"> Anterior </button>'
    })

    test ('aparece el boton anterior', () => {
        let offset = 15

        mostrarBotonAnterior(offset)

        const button = document.querySelector('#pagina-anterior')
        expect(button.classList.contains('d-none')).toBe(false)
    })

    test ('desaparece el boton anterior', () => {
        let offset = 0
        
        mostrarBotonAnterior(offset)
        
        const button = document.querySelector('#pagina-anterior')
        expect(button.classList.contains('d-none')).toBe(true)
    })
})

describe ('abrirDetalles', ()=>{
    const fakeDetalles = {
        name: 'bulbasaur',
        types: [
            { type: { name: 'grass' } },
            { type: { name: 'poison' } }
        ],
        height: 7,
        weight: 69,
        sprites: {
            front_default: 'https://fakeurl.com/bulbasaur.png'
        }
    }
    
    beforeEach(() => {
        document.body.innerHTML = `
            <section id="detalles-pokemon"></section>
            <ul id="lista"></ul>
            <div id="manejo-pagina"></div>
            <button id="volver" class="d-none"></button>
        `
    })
  
    test ('oculta la lista', () => {
        abrirDetalles(fakeDetalles)

        const lista = document.querySelector('#lista')
        expect(lista.classList.contains('d-none')).toBe(true)
    })

    test ('oculta  botones pagina', () => {
        abrirDetalles(fakeDetalles)

        const botonesPaginas = document.querySelector('#manejo-pagina')
        expect(botonesPaginas.classList.contains('d-none')).toBe(true)
    })

    test ('aparece boton volver', () => {
        abrirDetalles(fakeDetalles)

        const botonVolver = document.querySelector('#volver')
        expect(botonVolver.classList.contains('d-none')).toBe(false)
    })


    
    test ('muestra los detalles del pokemon', () =>{
        abrirDetalles(fakeDetalles)

        const sectionDetalles = document.querySelector('#detalles-pokemon')
        expect(sectionDetalles.innerHTML).toContain('bulbasaur')
        expect(sectionDetalles.innerHTML).toContain('https://fakeurl.com/bulbasaur.png')
        expect(sectionDetalles.innerHTML).toContain('grass,poison')
        expect(sectionDetalles.innerHTML).toContain('Altura: 7')
        expect(sectionDetalles.innerHTML).toContain('Peso: 69')
    })    
})