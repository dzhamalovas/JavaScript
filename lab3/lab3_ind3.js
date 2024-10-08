//Напишите функцию, которая возвращает минимальный элемент массива
function findMin(arr) {
    let min = arr[0]; // Предполагаем, что первый элемент минимальный
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < min) {
            min = arr[i]; // Если текущий элемент меньше, обновляем min
        }
    }
    return min;
}

const numbers = [10, 5, 8, 3, 7];
console.log("Минимальный элемент массива: " + findMin(numbers));
