export function addNewAttr(array) {
    return array.map(product => {
      const taxes = Math.floor(product.price * 0.19);
      return {
        ...product,
        taxes: taxes
      };
    })
}