//Напишите функцию, которая возвращает текущее время
function getCurrentTime() {
    const now = new Date(); // Создаем объект Date для получения текущего времени
    return now.toLocaleTimeString(); // Возвращаем время в формате строки
}

console.log("Текущее время: " + getCurrentTime());
