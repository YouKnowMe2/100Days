function validateInput(enteredTitle,enteredContent){

   return  !enteredTitle &&
    !enteredContent &&
    enteredTitle.trim() !== '' ||
    enteredContent.trim() !== ''
}

function userCredentialsAreValid(email, confirmEmail, password) {
    return (
        email &&
        confirmEmail &&
        password &&
        password.trim().length >= 6 &&
        email === confirmEmail &&
        email.includes('@')
    );
}

module.exports = {
    validateInput: validateInput,
    userCredentialsAreValid: userCredentialsAreValid,
};
