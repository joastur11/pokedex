export { }

export let offset = 0
export const limit = 15

export function aumentarOffset() {
    offset += limit;
}
  
export function disminuirOffset() {
    if (offset >= limit) {
      offset -= limit;
    }
}
