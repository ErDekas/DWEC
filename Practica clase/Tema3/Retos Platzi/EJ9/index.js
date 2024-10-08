export function calcTotal(orders) {
    return orders.reduce((sum, order) => sum + order.total, 0);
}