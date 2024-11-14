document.addEventListener("DOMContentLoaded", function() {
    const taskForm = document.getElementById("task-form");
    const taskInput = document.getElementById("task-input");
    const dateInput = document.getElementById("date-input");
    const taskList = document.getElementById("task-list");

    taskForm.addEventListener("submit", function(event) {
        event.preventDefault();

        try {
            const taskText = taskInput.value.trim();
            const taskDate = dateInput.value;

            // Проверка на пустоту полей
            if (!taskText) throw new Error("Поле задачи не может быть пустым");
            if (!taskDate) throw new Error("Дата не выбрана");

            // Проверка, что дата не в прошлом
            const currentDate = new Date();
            const selectedDate = new Date(taskDate);
            if (selectedDate < currentDate) {
                throw new Error("Задача не может быть установлена на прошлое");
            }

            // Создание задачи
            addTask(taskText, taskDate);

            // Очистка полей
            taskInput.value = "";
            dateInput.value = "";

        } catch (error) {
            alert(error.message); // Вывод ошибки в всплывающем окне
        }
    });

    function addTask(text, date) {
        const taskItem = document.createElement("li");
        taskItem.classList.add("task-item");

        const taskContent = document.createElement("span");
        taskContent.textContent = text;

        const taskDate = document.createElement("span");
        taskDate.classList.add("task-date");
        taskDate.textContent = ` Срок: ${new Date(date).toLocaleDateString("ru-RU")}`;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Удалить";
        deleteButton.addEventListener("click", () => taskItem.remove());

        // Отмечаем задачу как выполненную при нажатии
        taskContent.addEventListener("click", () => {
            taskItem.classList.toggle("completed");
        });

        // Добавляем элементы в задачу
        taskItem.append(taskContent, taskDate, deleteButton);
        taskList.appendChild(taskItem);
    }
});

