document.addEventListener("DOMContentLoaded", function() {
    const boardSize = 4; // Размер доски 4x4
    let board = [];
    let hasShuffled = false; // Флаг, указывающий, было ли перемешивание
    const gameBoard = document.getElementById("game-board");
    const shuffleButton = document.getElementById("shuffle-button");

    // Инициализация доски в правильном порядке
    function initBoard() {
        board = Array.from({ length: boardSize * boardSize - 1 }, (_, i) => i + 1).concat(null); // Плитки 1-15 и пустое место
        hasShuffled = false; // Сброс флага перемешивания
        renderBoard();
    }

    // Отображение доски на экране
    function renderBoard() {
        gameBoard.innerHTML = ''; // Очистить доску
        for (let i = 0; i < board.length; i++) {
            const tile = document.createElement('div');
            tile.classList.add('tile');
            tile.textContent = board[i] === null ? '' : board[i];
            tile.dataset.index = i;

            // Если это пустое место, то стилизуем его по-другому
            if (board[i] === null) {
                tile.classList.add('empty');
            } else {
                tile.addEventListener('click', () => moveTile(i)); // При клике на плитку перемещаем её
            }

            gameBoard.appendChild(tile);
        }
    }

    // Перемешивание плиток с проверкой 
    function shuffleTiles() {
        if (hasShuffled) {
            alert("Вы уже перемешали пятнашки!"); // Сообщение об ошибке, если перемешивание уже было выполнено
            return;
        }

        do {
            // Перемешиваем плитки, игнорируя пустое место (null)
            const tempBoard = board.slice(0, -1); // Убираем пустое место из массива
            for (let i = tempBoard.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [tempBoard[i], tempBoard[j]] = [tempBoard[j], tempBoard[i]];
            }
            tempBoard.push(null); // Вставляем пустое место обратно на последний индекс

            // Проверяем разрешимость перемешивания
            board = tempBoard;
        } while (!isSolvable()); // Если перемешивание не разрешимо, повторяем процесс

        hasShuffled = true; // Устанавливаем флаг, что перемешивание было выполнено
        renderBoard();
    }

    // Проверка разрешимости с помощью подсчета инверсий
    function isSolvable() {
        const inversionCount = getInversionCount();
        return inversionCount % 2 === 0; // Четное количество инверсий
    }

    // Подсчет количества инверсий
    function getInversionCount() {
        let inversions = 0;
        const flatBoard = board.filter(tile => tile !== null); // Убираем пустое место

        for (let i = 0; i < flatBoard.length; i++) {
            for (let j = i + 1; j < flatBoard.length; j++) {
                if (flatBoard[i] > flatBoard[j]) inversions++; // Если плитка справа меньше, то это инверсия
            }
        }
        return inversions;
    }

    // Перемещение плитки
    function moveTile(index) {
        const emptyIndex = board.indexOf(null); // Индекс пустого места
        const validMoves = getValidMoves(emptyIndex);

        if (validMoves.includes(index)) {
            [board[index], board[emptyIndex]] = [board[emptyIndex], board[index]]; // Меняем местами плитки
            renderBoard();
            checkWin();
        }
    }

    // Получение индексов возможных движений для пустого места
    function getValidMoves(emptyIndex) {
        const validMoves = [];
        const row = Math.floor(emptyIndex / boardSize);
        const col = emptyIndex % boardSize;

        if (row > 0) validMoves.push(emptyIndex - boardSize); // Вверх
        if (row < boardSize - 1) validMoves.push(emptyIndex + boardSize); // Вниз
        if (col > 0) validMoves.push(emptyIndex - 1); // Влево
        if (col < boardSize - 1) validMoves.push(emptyIndex + 1); // Вправо

        return validMoves;
    }

    // Проверка на победу
    function checkWin() {
        const isWin = board.every((tile, index) => tile === null || tile === index + 1);
        if (isWin) {
            setTimeout(() => alert("Поздравляем! Вы выиграли!"), 100);
        }
    }

    // Кнопка для перемешивания плиток
    shuffleButton.addEventListener('click', () => {
        try {
            shuffleTiles();
        } catch (error) {
            console.error("Ошибка при перемешивании:", error);
            alert("Произошла ошибка при перемешивании.");
        }
    });

    // Инициализация игры
    initBoard();
});
