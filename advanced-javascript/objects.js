// const job = {
//     title: 'Developer',
//     location: 'New York',
//     salary: 453245,
// };
//
// console.log(new Date().toISOString());

class Job{
    constructor(jobTitle,place,salary) {
        this.title = jobTitle;
        this.place = place;
        this.salary = salary;
    }

    describe(){
    console.log(`I'm a ${this.title}, I work in ${this.place} and I earn ${this.salary}`)}
}

const developer = new Job('Developer','Bangladesh',23984);
const cook = new Job('cook','Bangladesh',223984);
developer.describe();
cook.describe();