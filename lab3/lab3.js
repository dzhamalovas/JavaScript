console.log('Задание 1');
//Задание 1. Простая функция без параметров
//Функция, которая выводит приветственное сообщение
function greet() {
    console.log("Добро пожаловать в курс по JavaScript!");
}
greet(); //вызов функции

console.log('Задание 2');
//Задание 2. Функция с параметрами
// Функция calculateSum, которая принимает два числа в качестве параметров и выводит их сумму
function calculateSum(a, b) {
    const sum = a + b;
    console.log("Сумма чисел: " + sum);
}
calculateSum(10, 5);

console.log('Задание 3');
//Задание 3. Функция с возвратом значения
//Функцию multiply, которая принимает два числа, умножает их и возвращает результат
function multiply(a, b){
    return a * b;
}
const result = multiply(5, 6);
console.log("Результат умножения: " + result);

console.log('Задание 4');
//Задание 4. Функция с проверкой условия
//Функцию isAdult, которая принимает возраст и возвращает true,
//если возраст больше или равен 18, и false в противном случае
function isAdult(age) {
    if (age >= 18) {
        return true;
    } else {
        return false;
    }
}

console.log(isAdult(20));
console.log(isAdult(16));

console.log('Задание 5');
//Задание 5. Функция с циклом
//Функция printNumbers, которая принимает число n и выводит все числа от 1 до n
function printNumbers(n){
    for (let i = 1; i <= n; i++) {
        console.log(i);
    }
}
printNumbers(5);

console.log('Задание 6');
//Задание 6. Замыкание
//Функция counter, которая возвращает другую функцию. Эта
//функция должна увеличивать внутренний счётчик при каждом вызове
function counter() {
    let count = 0;
    return function () {
        count++;
        return count;
    }
}

const increment = counter(); //переменная, которая будет хранить результат вызова counter
console.log(increment());
console.log(increment());
console.log(increment());
