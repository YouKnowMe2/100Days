const addToCartElement = document.querySelector('#product-details button');
const badgeElement = document.querySelector('.nav-items .badge');

async function addToCart(){
    let response;
    try{
        const productId = addToCartElement.dataset.productid;
        const csrfToken = addToCartElement.dataset.csrf;
        response = await fetch('/cart/items',{
            method: 'POST',
            body: JSON.stringify({
                productId: productId,
                _csrf: csrfToken,
            }),
            headers: {
                'Content-type': 'application/json'
            }
        });

    }catch(error){
        alert('Something Went Wrong');
        return;
    }

   if(!response.ok){
       alert('Something Went wrong');
       return;
   }
   const responseData = await response.json();

   const newTotalQuantity = responseData.newTotalItem;

   badgeElement.textContent = newTotalQuantity;

}

addToCartElement.addEventListener('click',addToCart);