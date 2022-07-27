//document.body.children[1].children[0].href = 'https://google.com'

//there are two types of accesing the element of the documnet

document.getElementById('external-link').href='https://youtube.com';

//getElementBy is something if we want to access value by their id or class

document.querySelector('a').href='https://udemy.com';

//querySelector for selecting with css selector like p a h1

//Add an element
//1.create the new element

let newAnchorElement = document.createElement('a');
newAnchorElement.href= 'https://google.com';
newAnchorElement.textContent= 'Google';
//2.Get access to the parent elemtn that should hold the new elemnent

let firstParagraph = document.querySelector('p');

//3.Insert the new element into the parent element content

firstParagraph.append(newAnchorElement);

//Remove Element

//1.Select the element that should be removed
let firstH1Element = document.querySelector('h1');

//2. Remove it

firstH1Element.remove();

//Move ELements

firstParagraph.parentElement.append(firstParagraph);

//innerHtml

firstParagraph.innerHTML = 'This is <strong>Abir</strong>';