const addToCart = () => {
    const form = document.getElementById("addProductForm");
    const submitButton = document.getElementById("addtocart");
    const cartButton = document.getElementById("cartButton");
    const fields = ['id', 'name', 'size', 'price', 'image', 'qty'];
    let cart = loadCartStorage();
    const submitButtonText = {
      default: submitButton.value,
      adding: "Adding", 
      added: "Added"
    }
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log("Form Submitted!");
      submitButton.value = submitButtonText.adding;
      let checkoutProps = null;

      const props = new FormData(form); // ← pass in the form
      const hasAllProps = checkAllProps(props);

      if(hasAllProps) {
        checkoutProps = {
          id: props.get(fields[0]),
          name: props.get(fields[1]),
          size: props.get(fields[2]),
          price: props.get(fields[3]),
          image: props.get(fields[4]),
          qty: props.get(fields[5]),
        }
        console.log("CheckoutProps: ", checkoutProps);
        addedToCartUI(checkoutProps.qty);
        cart = updateCartStorage(cart, checkoutProps);
      }
    });

    function checkAllProps(data) {
      let proceed = false;
      const allFieldsPresent = fields.every(key => data.get(key)?.trim());

      if (!allFieldsPresent) {
        console.warn('⛔ Missing or empty required fields!');
      } else {
        console.log('✅ All required fields are filled.');
        proceed = true;
      }

      return proceed;
    }

    function addedToCartUI() {
      setTimeout(() => {
        submitButton.value = submitButtonText.added;
      }, 1000)

      setTimeout(() => {
        submitButton.value = submitButtonText.default;
      }, 2000)
    }

    function updateCartUI(cart) {
      let i = 0;
      cart.forEach(item => i += parseInt(item.qty))
      cartButton.textContent = `Cart(${i})`;
    }

    function updateCartStorage(cart, item) {
      cart.push(item);
      const stringifyCart = JSON.stringify(cart); // corrected case
      localStorage.setItem("cart", stringifyCart);
      updateCartUI(cart);
      return cart;
    }

    function loadCartStorage() {
      const existingCart = localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart")) // corrected case
        : [];
      updateCartUI(existingCart);
      return existingCart;
    }
}

export default addToCart;