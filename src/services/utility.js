export default function calcTotalPrice(cart) {
  return  cart?.items.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  ) || 0;
}

const formatter = new Intl.NumberFormat("it-IT", {
  style: "currency",
  currency: "EUR",
});

export  function formatPrice(price) {
  return formatter.format(price);
}
