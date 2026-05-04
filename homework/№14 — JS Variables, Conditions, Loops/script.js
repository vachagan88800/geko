let numbers = [12, 5, 8, 21, 3, 17, 9, 30, 2, 14];

numbers.forEach(n => console.log(n));

let greaterThan10 = numbers.filter(n => n > 10);
console.log(greaterThan10);

let sum = 0;
for (let n of numbers) {
  sum += n;
}
console.log(sum);

let min = Math.min(...numbers);
console.log(min);

let zuigtiv = numbers.filter(n => n % 2 === 0).length;
console.log(zuigtiv); 