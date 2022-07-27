let wordName = document.getElementById('product-name');
let remainingCharsElement = document.getElementById('remaining-chars');

let maxAllowedChars = wordName.maxLength;
function numberReamin(event)
{

    let enteredtext = event.target.value;
    let enteredTextLength = enteredtext.length;
    let remainingCharacters = maxAllowedChars -enteredTextLength;
    remainingCharsElement.textContent = remainingCharacters;
    if(remainingCharacters<=10){
       remainingCharsElement.classList.add('warning');
       wordName.classList.add('warning');
    }else{
        remainingCharsElement.classList.remove('warning');
        wordName.classList.remove('warning');
    }

}

wordName.addEventListener('input',numberReamin);
