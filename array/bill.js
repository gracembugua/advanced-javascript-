const availableFoods = [
    { name: "Burger", price: 234},
    { name: "Pizza",  price: 400},
    { name: "Meat",price: 500},
    { name: "Chicken",price: 1200},
];
let total=0;

const expensiveFoods = availableFoods.filter(food => food.price > 450);

const totalBill = expensiveFoods.reduce((total, food) => total + food.price, 0);

console.log(`My total bill for items above 450 is ${totalBill}`);

