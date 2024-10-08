export function filterOrders(array) {
    return array.filter(order => order.total >= 100 && order.delivered == true);
}