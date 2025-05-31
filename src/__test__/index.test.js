jest.mock('../api.js', () => ({
    traerListaPokemon: jest.fn(),
    obtenerDetallesPokemon: jest.fn(),
    cargarPagina: jest.fn(),
}));
  
jest.mock('../ui.js', () => ({
    mostrarListaPokemones: jest.fn(),
    actualizarPagina: jest.fn(),
    mostrarBotonAnterior: jest.fn(),
    abrirDetalles: jest.fn(),
}));
  
import { traerListaPokemon, obtenerDetallesPokemon } from '../api.js';
import { mostrarListaPokemones, actualizarPagina, mostrarBotonAnterior, abrirDetalles } from '../ui.js';
import { mostrarPokemones, verDetallesPokemon, cargarPagina } from '../index.js';
import { offset, limit } from '../pagina.js';

describe('mostrarPokemones', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    test('llama a traerListaPokemon y muestra los datos en UI', async () => {
      const mockData = { results: [{ name: 'bulbasaur' }, { name: 'charmander' }] };
      traerListaPokemon.mockResolvedValue(mockData);
  
      await mostrarPokemones();
  
      expect(traerListaPokemon).toHaveBeenCalledWith(limit, offset);
      expect(mostrarListaPokemones).toHaveBeenCalledWith(mockData.results);
      expect(actualizarPagina).toHaveBeenCalledWith(offset, limit);
      expect(mostrarBotonAnterior).toHaveBeenCalledWith(offset);
    });
});

describe('verDetallesPokemon', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    test('llama a obtenerDetallesPokemon y abre detalles con los datos', async () => {
      const mockDetails = { name: 'pikachu', height: 4 };
      obtenerDetallesPokemon.mockResolvedValue(mockDetails);
  
      await verDetallesPokemon('https://pokeapi.co/api/v2/pokemon/25');
  
      expect(obtenerDetallesPokemon).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/25');
      expect(abrirDetalles).toHaveBeenCalledWith(mockDetails);
    });
});

describe('cargarPagina', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    test('carga los pokemones y actualiza la UI', async () => {
      const mockData = { results: [{ name: 'squirtle' }] };
      traerListaPokemon.mockResolvedValue(mockData);
  
      await cargarPagina();
  
      expect(traerListaPokemon).toHaveBeenCalledWith(limit, offset);
      expect(mostrarListaPokemones).toHaveBeenCalledWith(mockData.results);
      expect(actualizarPagina).toHaveBeenCalledWith(offset, limit);
      expect(mostrarBotonAnterior).toHaveBeenCalledWith(offset);
    });
});

describe('mostrarPokemones - error', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    test('muestra error si falla traerListaPokemon', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      traerListaPokemon.mockRejectedValue(new Error('Falló la API'));
  
      await mostrarPokemones();
  
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error al cargar Pokemones',
        expect.any(Error)
      );
  
      consoleErrorSpy.mockRestore();
    });
});


describe('verDetallesPokemon - error', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    test('muestra error si falla obtenerDetallesPokemon', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      obtenerDetallesPokemon.mockRejectedValue(new Error('Falló detalle'));
  
      await verDetallesPokemon('https://pokeapi.co/api/v2/pokemon/1');
  
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error al obtener detalles del Pokémon',
        expect.any(Error)
      );
  
      consoleErrorSpy.mockRestore();
    });
});