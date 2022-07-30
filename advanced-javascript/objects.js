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
}

const developer = new Job('Developer','Bangladesh',23984);
const cook = new Job('cook','Bangladesh',223984);
console.log(developer);
console.log(cook);