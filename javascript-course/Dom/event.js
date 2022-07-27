let paragraphElement = document.querySelector('p');
function changeParagraphpText(){
        paragraphElement.textContent='Clicked';
}
paragraphElement.addEventListener('click',changeParagraphpText);



let inputElement = document.querySelector('input');
function detectText(event){
    console.log(inputElement.value);//using document to get all data
    console.log(event.target.value);//event to get all data
    console.log(event.data);//event to single data

}
inputElement.addEventListener('input',detectText);