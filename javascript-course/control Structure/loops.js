//for loop - for..of loop - for..in loop -while loop

//for loop
for( let i =0; i <= 10; i++){
      console.log(i);
}
// for-of loop
const users = ['Max','Abir','Elpro'];
for(const user of users){
    console.log(user);
}
// for-in loop
const loggedInUser = {
    name: 'Abir',
    age: 21,
    isAdmin: true
};
for(const info in loggedInUser){
    console.log(info);
    console.log(loggedInUser[info]);
}
//while loop
let isFinished = false;
while(!isFinished){
    isFinished=confirm('Do you want to quit?');
}
console.log('Done!');
//End of Loop
