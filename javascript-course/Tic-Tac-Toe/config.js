function openPlayerConfig(event){
        const selectedPlayer = +event.target.dataset.playerid;
        editedPlayer = selectedPlayer;
        playerConfigElement.style.display = 'block';
        backDropElement.style.display = 'block';
}

function closePlayerConfig(){
    playerConfigElement.style.display = 'none';
    backDropElement.style.display = 'none';
    formElement.firstElementChild.classList.remove('error');
    errorElement.textContent='';
    formElement.firstElementChild.lastElementChild.value = '';
}

function savePlayerConfig(event){
    event.preventDefault();
    const formData = new FormData(event.target)
    const enteredPlayerName =formData.get('player_name').trim();

    if(!enteredPlayerName){
        event.target.firstElementChild.classList.add('error')
        errorElement.textContent = 'Please Enter a Valid Name';
        return;
    }
    const updatedPlayerDataEleement = document.getElementById('player-'+editedPlayer+'-id');
    updatedPlayerDataEleement.children[1].textContent = enteredPlayerName;

    players[editedPlayer-1].name = enteredPlayerName;

    closePlayerConfig();
}