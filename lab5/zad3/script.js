// Массив с картами (дублируем элементы для пар)
const cardImages = [
    '1.jpg', '1.jpg',
    '2.jpg', '2.jpg',
    '3.jpg', '3.jpg',
    '4.jpg', '4.jpg',
    '5.jpg', '5.jpg',
    '6.jpg', '6.jpg',
    '7.jpg', '7.jpg',
    '8.jpg', '8.jpg'
];

let flippedCards = [];
let matchedCards = [];
let moves = 0;
let board = document.getElementById('board');
let movesDisplay = document.getElementById('moves');
let resetButton = document.getElementById('reset-button');

// Функция для перемешивания карт
function shuffleCards(cards) {
    return cards.sort(() => Math.random() - 0.5);
}

// Функция для обновления счета
function updateMoves() {
    moves++;
    movesDisplay.textContent = moves;
}

// Функция для обработки переворота карты
function flipCard(card) {
    if (flippedCards.length < 2 && !card.classList.contains('flipped') && !card.classList.contains('matched')) {
        card.classList.add('flipped');
        card.innerHTML = `<img src="images/${card.dataset.value}" alt="card image" />`;  // Подставляем изображение
        flippedCards.push(card);
        if (flippedCards.length === 2) {
            checkForMatch();
        }
    }
}

// Функция для проверки пары
function checkForMatch() {
    updateMoves();
    if (flippedCards[0].dataset.value === flippedCards[1].dataset.value) {
        flippedCards.forEach(card => card.classList.add('matched'));
        matchedCards.push(...flippedCards);
        flippedCards = [];
        if (matchedCards.length === cardImages.length) {
            setTimeout(() => {
                alert('Поздравляю! Вы нашли все пары!');
                resetButton.style.display = 'block';
            }, 500);
        }
    } else {
        setTimeout(() => {
            flippedCards.forEach(card => {
                card.classList.remove('flipped');
                card.innerHTML = ''; // Убираем изображение, если карты не совпали
            });
            flippedCards = [];
        }, 1000);
    }
}

// Функция для создания и отображения карт
function createBoard() {
    board.innerHTML = '';
    const shuffledCards = shuffleCards([...cardImages]);
    shuffledCards.forEach(image => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = image;
        card.addEventListener('click', () => flipCard(card));
        board.appendChild(card);
    });
}

// Функция для начала новой игры
function resetGame() {
    matchedCards = [];
    flippedCards = [];
    moves = 0;
    movesDisplay.textContent = moves;
    resetButton.style.display = 'none';
    createBoard();
}

// Обработчик на кнопку "Начать заново"
resetButton.addEventListener('click', resetGame);

// Инициализация игры при загрузке
createBoard();
