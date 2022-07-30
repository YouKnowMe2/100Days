const hobbies = ['Sports', 'Cooking'];
const age = 32;

hobbies.push('Reading');
console.log(hobbies);

//object value are not stored but address are stored
const person = {  age:32 };

function getAdultYears(person){
    // person.age -= 18; changes the object itself
    // return person.age;
    return  person-18; //change the value only not st stored 
}

console.log(getAdultYears(person));
console.log(person);