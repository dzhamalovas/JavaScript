//Проверка наличия элемента в массиве. Проверьте, содержится ли указанное
// число в массиве с помощью метода includes().

let numb = [1, 2, 3, 4, 5, 6];

let numbToCheck = 4;

if (numb.includes(numbToCheck)) {
    console.log(`${numbToCheck} содержится в массиве.`);
} else {
    console.log(`${numbToCheck} не содержится в массиве.`);
}

//ИЛИ

const readline = require('readline');
let arr = [1, 2, 3, 4, 5, 6];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Введите число для проверки: ', (input) => {
    let numberToCheck = Number(input);

    if (arr.includes(numberToCheck)) {
        console.log(`${numberToCheck} содержится в массиве.`);
    } else {
        console.log(`${numberToCheck} не содержится в массиве.`);
    }

    rl.close();
});