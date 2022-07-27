const  myName = 'Abir';

//Compare  operators ==, ===, >, <. <=, >=, ! !=, !==
//Equality, => Greater or lesser than => Negation

//logical Operator
//&& -> and || => or

if(myName ==='Abir'){
    console.log(myName);
}

//flag variable
let isLoogedIn = true;

if(isLoogedIn){
    console.log('User is looged in');
}

const enteredUserName ='Chowdhury';
//empty string and (0) are considered as false

if(enteredUserName.length>0){
    console.log('input is valid!');
}
if(enteredUserName){
    console.log('This Input is valid!');
}
