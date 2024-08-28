// script.js

const contablesWords = ["apple", "book", "cat", "dog"];
const incontablesWords = ["water", "rice", "music", "furniture"];

function generateWordsearch(words) {
    const size = 10;
    const grid = Array(size).fill(null).map(() => Array(size).fill(''));

    function placeWord(word) {
        const direction = Math.random() < 0.5 ? 'horizontal' : 'vertical';
        const row = Math.floor(Math.random() * size);
        const col = Math.floor(Math.random() * size);

        if (direction === 'horizontal') {
            if (col + word.length <= size) {
                for (let i = 0; i < word.length; i++) {
                    grid[row][col + i] = word[i];
                }
            } else {
                placeWord(word);
            }
        } else {
            if (row + word.length <= size) {
                for (let i = 0; i < word.length; i++) {
                    grid[row + i][col] = word[i];
                }
            } else {
                placeWord(word);
            }
        }
    }

    words.forEach(placeWord);

    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            if (grid[row][col] === '') {
                grid[row][col] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
            }
        }
    }

    return grid;
}

function displayWordsearch(grid, elementId) {
    const gridElement = document.getElementById(elementId);
    gridElement.innerHTML = '';

    grid.forEach(row => {
        row.forEach(letter => {
            const cell = document.createElement('span');
            cell.textContent = letter;
            gridElement.appendChild(cell);
        });
    });
}

const contablesGrid = generateWordsearch(contablesWords);
const incontablesGrid = generateWordsearch(incontablesWords);

displayWordsearch(contablesGrid, 'contables-wordsearch');
displayWordsearch(incontablesGrid, 'incontables-wordsearch');

function checkWords(section) {
    const words = section === 'contables' ? contablesWords : incontablesWords;
    const gridElement = document.getElementById(`${section}-wordsearch`);
    const cells = gridElement.querySelectorAll('span');
    const grid = Array.from({ length: 10 }, () => Array(10).fill(''));

    cells.forEach((cell, index) => {
        const row = Math.floor(index / 10);
        const col = index % 10;
        grid[row][col] = cell.textContent;
    });

    const foundWords = words.every(word => {
        return findWordInGrid(grid, word);
    });

    alert(foundWords ? 'Parabéns! Você encontrou todas as palavras!' : 'Algumas palavras estão faltando. Tente novamente.');
}

function findWordInGrid(grid, word) {
    function searchLine(line, word) {
        const lineStr = line.join('');
        return lineStr.includes(word) || lineStr.includes(word.split('').reverse().join(''));
    }

    for (let row = 0; row < grid.length; row++) {
        if (searchLine(grid[row], word)) return true;
    }

    for (let col = 0; col < grid[0].length; col++) {
        const column = grid.map(row => row[col]);
        if (searchLine(column, word)) return true;
    }

    return false;
}

function giveHint(section) {
    const words = section === 'contables' ? contablesWords : incontablesWords;
    const hintElement = document.getElementById(`${section}-hint`);
    hintElement.textContent = `Dica: Procure por palavras como ${words.join(', ')}.`;
}
