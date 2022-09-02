const cartItemUpdateFormElement = document.querySelectorAll('.cart-item-management');
async function updateCartItem(event){
    event.preventDefault();

    let form = event.target;
    const productId = form.dataset.productid;
    const csrfToken = form.dataset.csrf;
    const newQuantity = form.firstElementChild.value;
    let response;
    try{
        response=await fetch('/cart/items',{
            method: 'PATCH',
            body: JSON.stringify({
                productId: productId,
                quantity: newQuantity,
                _csrf: csrfToken
            }),
            headers: {
                'Content-type': 'application/json'
            }

        });

    }catch(error){
        alert('Something WEnt wrong');
        return;
    }
    if(!response.ok){
        alert('Something WEnt wrong');
        return;
    }
    const responseData = await response.json();

    if (responseData.updatedCartData.newTotalQuantity === 0) {
        form.parentElement.parentElement.remove();
    }else{
        const cartItemTotalPriceElement = form.parentElement.querySelector('.cart-item-price');
        cartItemTotalPriceElement.textContent = responseData.updatedCartData.updateItemPrice.toFixed(2);
    }



    const cartTotalPriceElement  = document.getElementById('cart-total-price');
    cartTotalPriceElement.textContent = responseData.updatedCartData.newTotalPrice.toFixed(2);

    const cartBadge = document.querySelector('.nav-items .badge');

    cartBadge.textContent = responseData.updatedCartData.newTotalQuantity;

}

for(const formElement of cartItemUpdateFormElement){
    formElement.addEventListener('submit',updateCartItem);
}