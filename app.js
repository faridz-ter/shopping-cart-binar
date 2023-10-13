const productButtons = document.querySelectorAll('.add-to-cart');
const cart = document.getElementById('cart');
const cartSubtotal = document.getElementById('cart-subtotal');
const cartTotal = document.getElementById('cart-total');
const inputPromoCode = document.getElementById('promo-code');
const discount = document.getElementById('discount');
inputPromoCode.addEventListener('input', displayCart)
const cartItems = [];

// promo
const promo = [
  {
    label: 'DISC10',
    value: 0.1,
  },
  {
    label: 'DISC50',
    value: 0.5,
  },
  {
    label: 'DISC75',
    value: 0.75,
  },
];

productButtons.forEach((button) => {
  button.addEventListener('click', addToCart);
});

function addToCart(event) {
  const nameProduct = event.target.getAttribute("data-name");
  const priceProduct = parseInt(event.target.getAttribute("data-price"));
  const itemProduct = {
    name: nameProduct,
    price: priceProduct,
  };
  cartItems.push(itemProduct);
  displayCart();
}

function displayCart() {
  cart.innerHTML = '';
  let subTotal = 0;
  if (cartItems.length === 0) {
    cart.innerHTML = '<p>Cart is empty</p>';
  } else {
    cartItems.forEach((itemProduct) => {
      const item = document.createElement('div');
      item.innerHTML = `<p> ${itemProduct.name} : Rp. ${itemProduct.price} </p>`;
      cart.appendChild(item);
      subTotal += itemProduct.price;
    })
  }
  cartSubtotal.innerHTML = `Rp. ${subTotal}`;

  const inputPromo = inputPromoCode.value;
  let discValue = 0;
  for (let i = 0; i < promo.length; i++) {
    if (inputPromo == promo[i].label) {
      discValue = promo[i].value;
      break;
    };
  };
  const discPrice = subTotal * discValue;
  const totalPrice = subTotal - discPrice;
  discount.innerHTML = `Potongan : Rp. ${discPrice}`;
  cartTotal.innerHTML = `Rp. ${totalPrice}`;
}