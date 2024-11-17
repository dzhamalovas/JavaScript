// Находим элементы DOM
const stars = document.querySelectorAll('.star');
const ratingDisplay = document.getElementById('rating-display');
const submitButton = document.getElementById('submit-rating');
const reviewsContainer = document.getElementById('reviews');
const averageRatingDisplay = document.getElementById('average-rating');

let currentRating = 0; // Текущий рейтинг
let reviews = []; // Массив отзывов

// Функция для правильного склонения слова "звезда"
function getStarWord(number) {
    if (number === 1) return "звезду";
    if (number > 1 && number < 5) return "звезды";
    return "звезд";
}

// Обновление звезд
function updateStars(rating) {
    stars.forEach(star => {
        if (star.dataset.value <= rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

// Обновление среднего рейтинга
function updateAverageRating() {
    const total = reviews.reduce((sum, review) => sum + review, 0);
    const average = reviews.length ? (total / reviews.length).toFixed(1) : 0;
    averageRatingDisplay.textContent = `Общий рейтинг: ${average}`;
}

// Добавляем обработчики событий
stars.forEach(star => {
    star.addEventListener('click', () => {
        currentRating = parseInt(star.dataset.value);
        updateStars(currentRating);

        // Используем функцию для склонения
        ratingDisplay.textContent = `Вы выбрали: ${currentRating} ${getStarWord(currentRating)}`;
        submitButton.disabled = false;
    });

    star.addEventListener('mouseover', () => {
        updateStars(star.dataset.value);
    });

    star.addEventListener('mouseout', () => {
        updateStars(currentRating);
    });
});

// Сохранение отзыва
submitButton.addEventListener('click', () => {
    reviews.push(currentRating);

    // Добавляем отзыв в список
    const reviewItem = document.createElement('div');
    reviewItem.classList.add('review');
    reviewItem.innerHTML = `
        <span class="review-stars">${'★'.repeat(currentRating)}</span>
        <span>${currentRating} ${getStarWord(currentRating)}</span>
    `;
    reviewsContainer.appendChild(reviewItem);

    // Обновляем общий рейтинг
    updateAverageRating();

    // Сброс
    currentRating = 0;
    updateStars(currentRating);
    ratingDisplay.textContent = 'Вы выбрали: 0 звезд';
    submitButton.disabled = true;
});
