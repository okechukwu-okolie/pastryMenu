let card = document.getElementsByClassName('card');
let cardGrid = document.querySelector('#cardGrid')
let removeAddCart = document.querySelector('.removeAddCart');
let itemList = document.querySelector('.itemList');
let carts =document.querySelector('.cart'); 
let cartDiv =document.querySelector('.cartDiv'); 
let cartItemNumber = document.querySelector('.cartItemNumber');
let emptyCart = document.querySelector('.itemList img');
let cartContainer = document.querySelector('.cartContainer');
let cartFlexDiv = document.querySelector('.cartFlexDiv');
let addCart = document.querySelector('.addCart');





let listProducts = [];
let cart = [];

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
                    <button class="addCartDetailsOff" ><span>-</span><span>0</span><span>+</span></button>
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



const addCartToHtml = ()=>{
    
    let totalQuantity = 0;
    cartDiv.innerHTML = '';
    if(cart.length > 0){
        cart.forEach(cart =>{
            totalQuantity = totalQuantity + cart.quantity
            let newCart = document.createElement('div');
            newCart.classList.add('cart');
            let positionOfThisProductInCart = listProducts.findIndex((value)=>value.id == cart.product_id);
            let info = listProducts[positionOfThisProductInCart];
            
            newCart.innerHTML = `
                    <div>
                      <h3>${info.name}</h3>
                      <span id="span1">${cart.quantity}x</span><span id="span2">@$${info.price.toFixed(2)}</span><span id="span3">$${(info.price * cart.quantity).toFixed(2)}</span>
                    </div>
                    
                    <div class='cartFlexDiv'>
                      <img onclick = 'removeItem(${cart.product_id})' src="./assets/images/icon-remove-item.svg" alt="">
                    </div>
            `;
            cartDiv.appendChild(newCart);
        }
    
        )
        cartItemNumber.textContent = totalQuantity;
    }
}





let removeItem = (positionOfThisProductInCart)=>{
    let selectedItem = positionOfThisProductInCart
    console.log(selectedItem)



    cart = cart.filter((x)=>{x.product_id !== selectedItem})

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


