//Question 1: How do you create an empty array in JavaScript?
const student=[10,20,30,40,50];
console.log(student[0]);
//Question 2: How do you access the first and last elements of an array?
console.log(student[student.length-1]);
console.log(student[0]);
//Question 3: How do you add an element to the end of an array?
student.push(300);
console.log(student)
//Question 4: How do you remove the last element from an array? we use the .pop()function
student.pop()
console.log(student);
//Question 5: How do you loop through an array in JavaScript?
let names=['grace','john','cydney'];
for(i=0;i<names.length;i++){
    console.log(names[i])

}
//finding the sum and average of numbers in an array using for loop
let numbers = [10, 20, 30, 40, 50];
let sum = 0;

for (let i = 0; i < numbers.length; i++) {
  sum += numbers[i];
}

let average = sum / numbers.length;

console.log("Sum:", sum);
console.log("Average:", average);
//Question 7: How do you remove an element from an array at a specific index we use the splice() method
let marks=[50,100,200,300]
marks.splice(2,2);
console.log(marks)

//Question 8: How do you concatenate two arrays in JavaScript?
let people=['grace','john','cydney'];
//people.concat();
//people.concat('');
people.concat(' ');
console.log(people)


