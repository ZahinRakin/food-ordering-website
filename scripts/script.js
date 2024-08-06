const MOBILE = 600;
const TABLET = 768;
const COMPUTER = 1200;
let cart = [];
let allProducts = null;

renderProducts();
window.addEventListener('resize', renderProducts);

function renderProducts(){
  let productHTML = ``;
  fetch("../data.json")
    .then((response) => {
      if(!response.ok){
        throw new Error("HTTP error! status: response.status");
      }
      return response.json();})
    .then((data) => {
      allProducts = data;
      renderProductHTML(data);
    })
    .catch((error) => {
      console.error(error);}); //got the data from the json file. there are three ways to fetch data. see geekforgeeks


  function renderProductHTML(data) {
    let productNo = 0;
    data.forEach((elem) => {
      let imageUrl = '';
      const width = window.innerWidth;
      if(width <= MOBILE) {
        imageUrl = elem.image.mobile;
      } else if(width <= TABLET) {
        imageUrl = elem.image.tablet;
      } else {
        imageUrl = elem.image.desktop;
      }
      productHTML += `
        <div class="product">
          <div class="product-img-holder">
            <button class="add-to-cart-button js-add-to-cart-button" data-button-no="${productNo}">
              <img src="assets/images/icon-add-to-cart.svg" alt="cart.svg">
              <div class="add-to-cart">
                Add to Cart
              </div>
            </button>
            <img src=".${imageUrl}" alt="${elem.category}" class="product-img js-product-img-${productNo}">
          </div>
          <div class="product-name">
            ${elem.category}
          </div>
          <div class="product-description">
            ${elem.name}
          </div>
          <div class="product-price">
            $${elem.price}
          </div>
        </div> 
      `;
      productNo++;
    });
    
    document.querySelector(".js-product-holder")
      .innerHTML = productHTML; // here the product html is generated.
    renderEmptyCheckout();
    addToCart();
  }
}

function addToCart() {
  const buttonElements = document.querySelectorAll(".js-add-to-cart-button");

  buttonElements.forEach((elem) => {
    const buttonWidth = elem.clientWidth;
    const buttonHeight = elem.clientHeight;
    const buttonNo = elem.dataset.buttonNo;
    const originalButtonContent = elem.innerHTML; // Store the original button content

    elem.addEventListener("click", () => {
      const productImg = document.querySelector(`.js-product-img-${buttonNo}`);
      if (!productImg.classList.contains("product-img-pressed")) {
        productImg.classList.add("product-img-pressed");
      }
      if (!elem.classList.contains("add-to-cart-button-pressed")) {
        elem.classList.add("add-to-cart-button-pressed");
      }
      elem.innerHTML = `
        <button class="plus-minus-button js-minus-button-${buttonNo}">
          <img src="../assets/images/icon-decrement-quantity.svg" alt="decrement-icon">
        </button>
        <div class="quantity-render-place-${buttonNo}">1</div>
        <button class="plus-minus-button js-plus-button-${buttonNo}">
          <img src="../assets/images/icon-increment-quantity.svg" alt="increment-icon">
        </button>
      `;
      elem.style.width = `${buttonWidth}px`;
      elem.style.height = `${buttonHeight}px`;

      // Initialize quantity
      const product = {
        id: Number(buttonNo),
        quantity: 1
      };
      cart.push(product);
      renderCheckout();
      // Increment
      const plusButtonElem = document.querySelector(`.js-plus-button-${buttonNo}`);
      plusButtonElem.addEventListener("click", event => {
        event.stopPropagation();
        product.quantity++;
        const quantityElem = document.querySelector(`.quantity-render-place-${buttonNo}`);
        quantityElem.innerHTML = `${product.quantity}`;
        renderCheckout();
      });
      // Decrement
      const minusButtonElem = document.querySelector(`.js-minus-button-${buttonNo}`);
      minusButtonElem.addEventListener("click", event => {
        event.stopPropagation();
        product.quantity--;
        const quantityElem = document.querySelector(`.quantity-render-place-${buttonNo}`);
        quantityElem.innerHTML = `${product.quantity}`;

        if (product.quantity === 0) {
          productImg.classList.remove("product-img-pressed");
          elem.innerHTML = originalButtonContent;
          elem.classList.remove("add-to-cart-button-pressed");
          cart = cart.filter(item => item.id !== product.id);
          renderEmptyCheckout();
        }
        renderCheckout();
      });
      
    });
  });
}

function renderCheckout(){
  const checkoutElem = document.querySelector(".checkout");
  checkoutElem.innerHTML = `
    <div class="cart-quantity">
        Your Cart (<span class="totalCartQuantity">0</span>)
    </div>
    <div class="render-order-summary js-render-order-summary">
      <!--here the cart item's html generated inshallah-->
    </div>

    <div class="order-total-section">
      <div class="order-total-text">
        Order Total
      </div>
      <div class="js-render-total render-total">

      </div>
    </div>

    <div class="carbon-neutral">
      <img src="assets/images/icon-carbon-neutral.svg" alt="carbon neutral img" class="carbon-neutral-img">
      <div>This is a <strong>carbon-neutral</strong> delivery</div>
    </div>

    <button class="confirm-order-button">
      Confirm Order
    </button>
  `;

  let totalCartQuantity = 0;
  let totalPrice = 0;
  cart.forEach(item => {
    const product = allProducts[item.id];
    const productCount = item.quantity;
    totalCartQuantity += productCount;
    const productTotal = product.price * productCount;
    totalPrice += productTotal;
    const renderCheckoutElem = document.querySelector(".js-render-order-summary");
    renderCheckoutElem.innerHTML += `
      <div class="order-summary">
        <div class="product-info">
          <div class="ordered-product-name">
            ${product.name}
          </div>
          <div class="count-price-total">
            <div class="product-count">
              ${productCount}x
            </div>
            <div class="individual-product-price">
              @ $${product.price}
            </div>
            <div class="product-total">
              $${productTotal}
            </div>
          </div>
        </div>
        <button class="cross-button">
          <img src="../assets/images/icon-remove-item.svg" alt="cross">
        </button>
      </div>
    `;
  });
  document.querySelector(".totalCartQuantity")
    .innerText = `${totalCartQuantity}`;
  document.querySelector(".js-render-total")
    .innerText = `$${totalPrice}`;
}

function renderEmptyCheckout(){
  const checkoutElem = document.querySelector(".checkout");
  checkoutElem.innerHTML = `
      <div class="cart-quantity">
        Your Cart (<span class="totalCartQuantity">0</span>)
      </div>
      <div class="render-place">
        <img src="../assets/images/illustration-empty-cart.svg" alt="empty-cart" class="empty-cart-img">
        <div class="render-here">
          Your added items will appear here
        </div>
      </div>
  `;
}
