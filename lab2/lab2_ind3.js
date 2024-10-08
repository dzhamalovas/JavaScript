//Суммирование массива с использованием reduce(). Найдите сумму элементов
// массива, используя метод reduce().
let numbers = [1, 2, 3, 4, 5];
let totalSum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

console.log('Сумма элементов массива:', totalSum);


// Примечание о работе reduce
// Функция accumulator + currentValue выполняется для каждого элемента массива.
// В начале работы аккумулятор равен начальному значению (0), а затем в него добавляется каждый элемент массива