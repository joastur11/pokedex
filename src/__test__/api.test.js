import { traerListaPokemon, obtenerDetallesPokemon } from "../api";

beforeEach (() => {
    global.fetch = jest.fn()
})

describe('traerListaPokemon', () => {
    test('hace un fetch a la pokeapi y devuelve el resultado', async () =>{
        
        const fakeResponse = { results: [ { name: 'pikachu' } ] }

        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => fakeResponse
        })

        const result = await traerListaPokemon(10, 20)

        expect(fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon?limit=10&offset=20')
        expect(result).toEqual(fakeResponse)
    })

    test('lanza un error si la respuesta no es ok', async () => {

        fetch.mockResolvedValueOnce({ ok: false })
    
        await expect(traerListaPokemon(10, 20)).rejects.toThrow()
      })
}) 

describe ('obtenerDetallesPokemon', () =>{
    test ('hace un fetch a la url del pokemon especifico y devuelve sus detalles', async () => {

        const fakeResponse = {
            name: 'bulbasaur',
            type: 'grass',
            height: 7,
            weight: 69
        }
        
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => fakeResponse
        })

        const url = 'https://pokeapi.co/api/v2/pokemon/1'
        const result = await obtenerDetallesPokemon(url)
    
        expect(fetch).toHaveBeenCalledWith(url)
        expect(result).toEqual(fakeResponse)
    })

    test('lanza un error si la respuesta no es ok', async () => {
        const url = 'https://pokeapi.co/api/v2/pokemon/1'
        
        fetch.mockResolvedValueOnce({ ok: false })
    
        await expect(obtenerDetallesPokemon(url)).rejects.toThrow('No se pudieron obtener los detalles del Pokémon')
    })
})