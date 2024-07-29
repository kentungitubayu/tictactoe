const X_CLASS = 'x';
const O_CLASS = 'o';
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageElement = document.getElementById('winningMessage');
const restartButton = document.getElementById('restartButton');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const scoreXElement = document.getElementById('scoreX');
const scoreOElement = document.getElementById('scoreO');
const clickSound = document.getElementById('clickSound');
const winSound = document.getElementById('winSound');
const drawSound = document.getElementById('drawSound');
const modeSelect = document.getElementById('mode');
const themeSelect = document.getElementById('theme');
let oTurn;
let scoreX = 0;
let scoreO = 0;

startGame();

restartButton.addEventListener('click', startGame);
modeSelect.addEventListener('change', startGame);
themeSelect.addEventListener('change', changeTheme);

function startGame() {
    oTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    setBoardHoverClass();
    winningMessageElement.classList.remove('show');
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = oTurn ? O_CLASS : X_CLASS;
    placeMark(cell, currentClass);
    playSound(clickSound);
    if (checkWin(currentClass)) {
        endGame(false);
        playSound(winSound);
        updateScore(currentClass);
    } else if (isDraw()) {
        endGame(true);
        playSound(drawSound);
    } else {
        swapTurns();
        setBoardHoverClass();
        if (modeSelect.value === 'ai' && oTurn) {
            makeAiMove();
        }
    }
}

function makeAiMove() {
    const availableCells = [...cellElements].filter(cell => {
        return !cell.classList.contains(X_CLASS) && !cell.classList.contains(O_CLASS);
    });
    const randomCell = availableCells[Math.floor(Math.random() * availableCells.length)];
    randomCell.click();
}

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = "Draw!";
    } else {
        winningMessageTextElement.innerText = `${oTurn ? "O's" : "X's"} Wins!`;
    }
    winningMessageElement.classList.add('show');
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
    });
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurns() {
    oTurn = !oTurn;
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(O_CLASS);
    if (oTurn) {
        board.classList.add(O_CLASS);
    } else {
        board.classList.add(X_CLASS);
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        });
    });
}

function updateScore(currentClass) {
    if (currentClass === X_CLASS) {
        scoreX++;
        scoreXElement.innerText = scoreX;
    } else {
        scoreO++;
        scoreOElement.innerText = scoreO;
    }
}

function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
}

function changeTheme() {
    const theme = themeSelect.value;
    document.body.className = theme;
}

// Your existing JavaScript code

// Particle animation configuration using particles.js library
particlesJS.load('particles-js', 'particles.json', function () {
    console.log('Particles.js loaded');
});

// Dynamic theme switching
const themeSwitch = document.getElementById('themeSwitch');
themeSwitch.addEventListener('click', () => {
    document.body.classList.toggle('dark');
});

// Custom cursor
const cells = document.querySelectorAll('.cell');
cells.forEach(cell => {
    cell.classList.add('cursor-pointer');
});

// Game statistics
let gamesPlayed = 0;
let wins = 0;

function updateStats() {
    document.getElementById('gamesPlayed').textContent = `Games Played: ${gamesPlayed}`;
    document.getElementById('wins').textContent = `Wins: ${wins}`;
    const winRate = wins > 0 ? ((wins / gamesPlayed) * 100).toFixed(2) : 0;
    document.getElementById('winRate').textContent = `Win Rate: ${winRate}%`;
}

// More JavaScript code for AI difficulty levels, interactive background, game history, achievements, social sharing, etc.
