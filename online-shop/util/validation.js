function isEmpty(value){
    return !value && value.trim() === '';
}
function userCredentialsAreValid(email,password){
    return(  email && email.includes('@') && password && password.trim().length>5
    );
}

function userDetailAreValid(email,password,name,street,postal,city)
{
   userCredentialsAreValid(email,password) && !isEmpty(name) && !isEmpty(street) && !isEmpty(postal) && !isEmpty(city);
}
function emailPassIsConfirm(email, confirmEmail, password, confirmPassword){
    return( email === confirmEmail && password === confirmPassword);
}

module.exports ={
    userDetailAreValid: userDetailAreValid,
    emailPassIsConfirm: emailPassIsConfirm,
};