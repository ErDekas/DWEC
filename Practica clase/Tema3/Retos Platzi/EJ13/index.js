export function findMyKey(array) {
    const index =  array.indexOf('myKey');
    return index !== -1 ? index : false
}