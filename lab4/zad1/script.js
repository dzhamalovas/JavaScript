document.addEventListener("DOMContentLoaded", function() {
    try {
        const accordionButtons = document.querySelectorAll(".accordion-button");

        if (!accordionButtons.length) throw new Error("Кнопки аккордеона не найдены");

        accordionButtons.forEach(button => {
            button.addEventListener("click", function() {
                const content = this.nextElementSibling;

                // Проверка, что контент существует 
                if (!content || !content.classList.contains("accordion-content")) {
                    throw new Error("Контент для аккордеона не найден");
                }

                // Закрываем все остальные секции, оставляя только текущую открытой
                accordionButtons.forEach(btn => {
                    if (btn !== this) {
                        btn.classList.remove("active");
                        btn.nextElementSibling.style.display = "none";
                    }
                });

                // Переключаем видимость текущей секции
                this.classList.toggle("active");
                content.style.display = content.style.display === "block" ? "none" : "block";
            });
        });

    } catch (error) {
        console.error("Ошибка:", error.message);
    }
});
