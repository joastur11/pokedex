export { }

export let offset = 0
export let limit = 15

export function aumentarOffset() {
    offset += limit;
}
  
export function disminuirOffset() {
    if (offset >= limit) {
      offset -= limit;
    }
}

export function resetOffset() {
  offset = 0;
}

export function testOffset() {
  return offset
}
export function testDefinirOffset(value) {
  offset = value
}
export function testDefinirLimit(value) {
  limit = value
}