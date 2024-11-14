document.addEventListener("DOMContentLoaded", function() {
    const boardSize = 4; // Размер доски 4x4
    let board = [];
    const gameBoard = document.getElementById("game-board");
    const shuffleButton = document.getElementById("shuffle-button");

    // Инициализация доски в правильном порядке
    function initBoard() {
        board = Array.from({ length: boardSize * boardSize - 1 }, (_, i) => i + 1).concat(null);
        renderBoard();
    }

    // Отображение доски на экране
    function renderBoard() {
        gameBoard.innerHTML = '';
        for (let i = 0; i < board.length; i++) {
            const tile = document.createElement('div');
            tile.classList.add('tile');
            tile.textContent = board[i] === null ? '' : board[i];
            tile.dataset.index = i;
            if (board[i] === null) {
                tile.classList.add('empty');
            } else {
                tile.addEventListener('click', () => moveTile(i));
            }
            gameBoard.appendChild(tile);
        }
    }

    // Перемешивание плиток с проверкой разрешимости
    function shuffleTiles() {
        do {
            board = board.slice(0, -1); // Убираем пустое место для перемешивания
            for (let i = board.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [board[i], board[j]] = [board[j], board[i]];
            }
            board.push(null); // Возвращаем пустое место
        } while (!isSolvable());

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
        const flatBoard = board.filter(tile => tile !== null);

        for (let i = 0; i < flatBoard.length; i++) {
            for (let j = i + 1; j < flatBoard.length; j++) {
                if (flatBoard[i] > flatBoard[j]) inversions++;
            }
        }
        return inversions;
    }

    // Перемещение плитки
    function moveTile(index) {
        const emptyIndex = board.indexOf(null);
        const validMoves = getValidMoves(emptyIndex);

        if (validMoves.includes(index)) {
            [board[index], board[emptyIndex]] = [board[emptyIndex], board[index]];
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
