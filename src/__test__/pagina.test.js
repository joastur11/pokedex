import {testOffset, testDefinirLimit, testDefinirOffset, aumentarOffset, disminuirOffset, resetOffset} from '../pagina.js'

beforeEach(()=>{
    resetOffset()
})

test ('aumenta el valor del offset en base al valor del limit', () => {
    const offsetInicial = 0
    const limit = 15

    testDefinirOffset (offsetInicial)
    testDefinirLimit (limit)

    aumentarOffset()

    expect(testOffset()).toBe(offsetInicial + limit)
})

test ('disminuye el offset si es mayor o igual al limit', ()=>{
    const offsetInicial = 30
    const limit = 15

    testDefinirOffset (offsetInicial)
    testDefinirLimit (limit)

    disminuirOffset()

    expect(testOffset()).toBe(offsetInicial - limit) 
})

test('no disminuye el offset si offset es menor que limit', () => {
    const offsetInicial = 0
    const limit = 15

    testDefinirOffset (offsetInicial)
    testDefinirLimit (limit)

    disminuirOffset()

    expect(testOffset()).toBe(offsetInicial) 
  })