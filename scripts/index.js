const MOBILE = 600;
const TABLET = 768;
const COMPUTER = 1200;

let productHTML = ``;
fetch("../data.json")
  .then((response) => {
    if(!response.ok){
      throw new Error("HTTP error! status: response.status");
    }
    return response.json();
  }).then((data) => renderProductHTML(data)
  ).catch((error) => {
    console.error(error);
  }); //got the data from the json file. there are three ways to fetch data. see geekforgeeks


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
}


let orderQuantity = 1;

function addToCart(){
  const buttonElement = document.querySelectorAll(".js-add-to-cart-button");
  
  buttonElement.forEach((elem)=>{
    elem.addEventListener("click", ()=>{
      elem.classList.add("add-to-cart-button-pressed");
      renderInButton(elem);
    });
  });
}

function renderInButton(elem){
  elem.innerHTML = `
    <button class="plus-minus-button js-minus-button">
      <img src="../assets/images/icon-decrement-quantity.svg" alt="decrement-icon">
    </button>
    <div>${orderQuantity}</div>
    <button class="plus-minus-button js-plus-button">
      <img src="../assets/images/icon-increment-quantity.svg" alt="increment-icon">
    </button>
  `;
}

function decrement(){
  const minusButtonElem = document.querySelectorAll(".js-minus-button");
  minusButtonElem.forEach((elem)=>{
    elem.addEventListener("click", () => {
      orderQuantity--;

    });
  });
}

function increment(){
  const plusButtonElem = document.querySelectorAll(".js-plus-button");
  plusButtonElem.forEach((elem)=>{
    elem.addEventListener("click", () => {

    });
  });
}