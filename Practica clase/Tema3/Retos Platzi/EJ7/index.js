export function filterByTerm(array, term) {
    return array.filter(word => word.includes(term));
}