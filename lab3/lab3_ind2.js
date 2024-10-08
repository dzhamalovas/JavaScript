//Напишите функцию, которая возвращает сумму элементов массива
function sumArray(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i]; // Добавляем каждый элемент массива к сумме
    }
    return sum;
}

const numbers = [1, 2, 3, 4, 5];
console.log("Сумма элементов массива: " + sumArray(numbers));
