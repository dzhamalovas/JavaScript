// 1. Создание массивов
let arr = [1, 2, 3, 4, 5];
let emptyArr = [];
// 2. Доступ к элементам массива:
console.log(arr[0]); // 1
console.log(arr.length); // 5
// 4. Циклы для работы с массивами:
console.log();
// let arr = [1, 2, 3, 4, 5];
for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
}
//
console.log('Результаты выполнения задач');
// Задача 1. Найти сумму элементов массива.
let numbers = [10, 20, 30, 40, 50];
let sum = 0;

for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
}
console.log('Сумма элементов массива', sum);

//Задача 2. Найти максимальное значение в массиве.
let numbers2 = [5, 15, 35, 25, 10];
let max = numbers2[0];

for (let j = 0; j < max; j++) {
    if (numbers2[j] > max) {
        max = numbers2[j];
    }
}
console.log('Максимальный элемент массива:',max);

//Задача 3. Нахождение четных чисел в массиве.
let numbers3 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let evenNumbers = numbers3.filter(number => number % 2 === 0);

console.log('Четные числа:', evenNumbers);

//Задача 4. Удаление элементов из массива.
let numbers4 = [10, 20, 30, 40, 50, 60];
numbers4.splice(2,2); // Удаление 2 элементов начиная со 2 индекса

console.log('Измененный массив (после удаления):', numbers4);

//Задача 5. Преобразование массива с помощью map()
let numbers5 = [1, 2, 3, 4, 5];
let doubledNumbers = numbers5.map(num=> num*2);

console.log('Массив после умножения на 2:', doubledNumbers);

//Задача 6. Сортировка массива
let numbers6 = [40, 10, 50, 30, 20]
numbers6.sort((a, b) => a - b);

console.log('Отсортированный массив:', numbers6)