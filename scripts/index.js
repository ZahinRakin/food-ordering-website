const MOBILE = 600;
const TABLET = 768;
const COMPUTER = 1200;

renderProducts();

function renderProducts(){
  let productHTML = ``;
  fetch("../data.json")
    .then((response) => {
      if(!response.ok){
        throw new Error("HTTP error! status: response.status");
      }
      return response.json();})
    .then((data) => renderProductHTML(data))
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
      } else if(width <= COMPUTER) {
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
            <img src=".${imageUrl}" alt="${elem.category}" class="product-img product-img-${productNo}">
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
    addToCart();
  }
}

function addToCart(){
  const buttonElement = document.querySelectorAll(".js-add-to-cart-button");
  buttonElement.forEach((elem)=>{
    const buttonNo = elem.dataset.buttonNo;
    elem.addEventListener("click", ()=>{
      elem.classList.add("add-to-cart-button-pressed");
      elem.innerHTML = `
        <button class="plus-minus-button js-minus-button-${buttonNo}">
          <img src="../assets/images/icon-decrement-quantity.svg" alt="decrement-icon">
        </button>
        <div class="quantity-render-place-${buttonNo}">1</div>
        <button class="plus-minus-button js-plus-button-${buttonNo}">
          <img src="../assets/images/icon-increment-quantity.svg" alt="increment-icon">
        </button>
      `;
      //increment
      const plusButtonElem = document.querySelector(`.js-plus-button-${buttonNo}`);
      plusButtonElem.addEventListener("click", () => {
        console.log('click plus button'); //testing.
        const quantityElem = document.querySelector(`.quantity-render-place-${buttonNo}`);
        let quantity = Number(quantityElem.innerText);
        quantity++;
        console.log(quantity); //testing
        quantityElem.innerHTML = `${quantity}`; //this isn't updating the quantity?
      });
      //decrement
      const minusButtonElem = document.querySelector(`.js-minus-button-${buttonNo}`);
      minusButtonElem.addEventListener("click", () => {
        console.log('click minus button'); //testing.
        const quantityElem = document.querySelector(`.quantity-render-place-${buttonNo}`);
        let quantity = Number(quantityElem.innerText);
        quantity--;
        //here add the quantity zero logic.
        console.log(quantity); //testing
        quantityElem.innerHTML = `${quantity}`; //this isn't updating the quantity?
      });
    });
  });
}

//if i press the plus button the 1 is getting incremented to 2 but after that nothing happens. and  (quantityElem.innerHTML = `${quantity}`;) line isn't working as intended