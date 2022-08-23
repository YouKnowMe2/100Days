const mobileMenuBtnElement = document.getElementById('mobile-menu-btn');

const mobileMenuelement = document.getElementById('mobile-menu');

function toggleMenu(){
    mobileMenuelement.classList.toggle('open');
}
mobileMenuBtnElement.addEventListener('click',toggleMenu);