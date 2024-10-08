let card = document.getElementsByClassName('card');
let cardGrid = document.querySelector('#cardGrid')
// let removeItemInCart = document.querySelector('.removeItemInCart');
// let itemList = document.querySelector('.itemList');
let carts =document.querySelector('.carts'); 
let cartDiv =document.querySelector('.cartDiv'); 
let cartItemNumber = document.querySelector('.cartItemNumber');
let emptyCart = document.querySelector('.img1');
let cartContainer = document.querySelector('.cartContainer');
let cartFlexDiv = document.querySelector('.cartFlexDiv');
let addCart = document.getElementsByClassName('addCart');
let changedBtn = document.getElementsByClassName('changedBtn');
let sumTotal = document.getElementById('sumTotal');
let newCart = document.getElementsByClassName('cart')





let listProducts = [];
let cart = [];



//logic to change the button style
let cartBtnSwitch = (id) => {
    let cardId = id;
  console.log(cardId);
  for (let i = 1; i < addCart.length + 1; i++) {
   
   console.log(cardId)
   console.log(addCart[i]);
   
    
              addCart[i].innerHTML = `<span class='minus'>-</span><span class='count'>0</span><span class='addition'>+</span>`;
              addCart[i].classList.replace('addCart', 'changedBtn');
    
  
  }
};
//this function creates and hold the template that will be populated with information from the array from the json file.
const addDataToHtml = ()=>{

cardGrid.innerHTML = ''
if(listProducts.length > 0){
        listProducts.forEach(product=>{
            let newCard = document.createElement('div');
            newCard.classList.add('card');
            newCard.dataset.id = product.id;//this creats an dataset id attribute in the element
            newCard.innerHTML = `
                    <img src="${product.image.desktop}" alt="">
                    <button class="addCart" ><img src="./assets/images/icon-add-to-cart.svg" alt=""><span>Add to Cart</span></button>
                    <h4 class = 'nameLocator'>${product.category}</h4>
                    <h2>${product.name}</h2>
                    <h3>$${product.price.toFixed(2)}</h3>
    
    `;
    cardGrid.appendChild(newCard);
   
    })
     
}
}



//this code adds items to the cart
cardGrid.addEventListener('click', (event)=>{
    let positionClicked = event.target;
    
    if(positionClicked.classList.contains('addCart')){
        let product_id = positionClicked.parentElement.dataset.id;
    
        // cartBtnSwitch(product_id)
        addToCart(product_id);
    }

})


const addToCart =(product_id)=>{
    let positionOfThisProductInCart = cart.findIndex((value)=>value.product_id == product_id);//here if true the value is 1
if(cart.length <= 0){
    cart = [{
        product_id : product_id,
        quantity : 1
    }]
    
}else if(positionOfThisProductInCart < 0){
    cart.push({
        product_id : product_id,
        quantity : 1
    })
}else{
    cart[positionOfThisProductInCart].quantity++;
   
}
addCartToHtml();
}


//this block of code holds the template for populating the cart section of the app.
const addCartToHtml = ()=>{
    
    let totalQuantity = 0;
    let totalPrice = 0;
    cartDiv.innerHTML = '';
    if(cart.length > 0){
        cart.forEach(cart =>{
            totalQuantity = totalQuantity + cart.quantity
            
            let newCart = document.createElement('div');
            newCart.classList.add('cart');
            let positionOfThisProductInCart = listProducts.findIndex((value)=>value.id == cart.product_id);
            let info = listProducts[positionOfThisProductInCart];
            totalPrice = totalPrice +(info.price *cart.quantity)
            newCart.innerHTML = `
                    <div class = 'carts'>
                      <h3>${info.name}</h3>
                      <span id="span1">${cart.quantity}x</span><span id="span2">@$${info.price.toFixed(2)}</span><span id="span3">$${(info.price * cart.quantity).toFixed(2)}</span>
                    </div>
                    
                    <div class='cartFlexDiv'>
                      <img onclick = 'removeItem()'  src="./assets/images/icon-remove-item.svg" alt="">
                    </div>
            `;
            cartDiv.appendChild(newCart);
            cartItemNumber.textContent = totalQuantity;
            sumTotal.textContent = '$'+totalPrice.toFixed(2);
        }
    
        )
        // cartItemNumber.textContent = totalQuantity;
        // sumTotal.textContent = '$'+totalPrice.toFixed(2);

    }
}



const removeItem = ()=>{
    
    let positionClicked = event.target;
    let product_id = positionClicked.parentElement.parentElement.parentElement.dataset.id;
    console.log(product_id);
    
    let positionOfThisProductInCart = cart.findIndex((value)=>value.product_id == product_id);
    cart.splice(positionOfThisProductInCart, 1);
    console.log(positionOfThisProductInCart)
    addCartToHtml();
}




const initApp = ()=>{
   
    fetch('data.json')
    .then(response => response.json())
    .then(data =>{//listProduct is an array holder to collect the json objects.
        listProducts = data;
        //console.log(listProducts);
//this function holds the template of the product card that populates the webpage
        addDataToHtml()     
    })

}

initApp()


