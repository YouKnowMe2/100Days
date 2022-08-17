function validateInput(enteredTitle,enteredContent){

   return  !enteredTitle &&
    !enteredContent &&
    enteredTitle.trim() !== '' ||
    enteredContent.trim() !== ''
}

module.exports = {
    validateInput: validateInput,
}