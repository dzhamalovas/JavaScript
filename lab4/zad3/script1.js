document.addEventListener("DOMContentLoaded", function() {
    const boardSize = 4; // Размер доски 4x4
    let board = [];
    const gameBoard = document.getElementById("game-board");
    const shuffleButton = document.getElementById("shuffle-button");

    // Инициализация доски
    function initBoard() {
        board = [];
        let tiles = [];

        // Создание массива с номерами плиток
        for (let i = 1; i <= boardSize * boardSize - 1; i++) {
            tiles.push(i);
        }
        tiles.push(null); // Пустое место

        // Перемешивание плиток
        shuffleTiles(tiles);

        // Заполнение доски
        gameBoard.innerHTML = '';
        for (let i = 0; i < tiles.length; i++) {
            const tile = document.createElement('div');
            tile.classList.add('tile');
            tile.textContent = tiles[i] === null ? '' : tiles[i];
            tile.dataset.index = i;
            if (tiles[i] === null) {
                tile.classList.add('empty');
            } else {
                tile.addEventListener('click', () => moveTile(i, tiles));
            }
            gameBoard.appendChild(tile);
        }

        board = tiles;
        checkWin();
    }

    // Перемешивание плиток (метод "Фишера-Йейтса")
    function shuffleTiles(tiles) {
        for (let i = tiles.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
        }
    }

    // Перемещение плитки
    function moveTile(index, tiles) {
        const emptyIndex = tiles.indexOf(null);
        const validMoves = getValidMoves(emptyIndex);

        if (validMoves.includes(index)) {
            // Перемещаем плитку
            [tiles[index], tiles[emptyIndex]] = [tiles[emptyIndex], tiles[index]];
            updateBoard(tiles);
            checkWin();
        }
    }

    // Получение индексов возможных движений для пустого места
    function getValidMoves(emptyIndex) {
        const validMoves = [];
        const row = Math.floor(emptyIndex / boardSize);
        const col = emptyIndex % boardSize;

        // Проверка на соседние плитки (вверх, вниз, влево, вправо)
        if (row > 0) validMoves.push(emptyIndex - boardSize); // Вверх
        if (row < boardSize - 1) validMoves.push(emptyIndex + boardSize); // Вниз
        if (col > 0) validMoves.push(emptyIndex - 1); // Влево
        if (col < boardSize - 1) validMoves.push(emptyIndex + 1); // Вправо

        return validMoves;
    }

    // Обновление доски
    function updateBoard(tiles) {
        const tilesElements = document.querySelectorAll('.tile');
        tilesElements.forEach((tile, index) => {
            tile.textContent = tiles[index] === null ? '' : tiles[index];
            if (tiles[index] === null) {
                tile.classList.add('empty');
            } else {
                tile.classList.remove('empty');
                // Перепривязываем обработчик клика
                tile.addEventListener('click', () => moveTile(index, tiles), { once: true });
            }
        });
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
            initBoard();
        } catch (error) {
            console.error("Ошибка при инициализации игры:", error);
            alert("Произошла ошибка при запуске игры.");
        }
    });

    // Инициализация игры
    initBoard();
});
