import _, { forEach } from 'lodash';
import { Ship } from "./ship";
import { Gameboard } from './gameboard';

let playerGameboard;
let computerGameboard;
const playButton = document.getElementById('playB');

// When play button clicked -> create 2 gameboards;
playButton.addEventListener("click", () =>{
    playerGameboard  = new Gameboard();
    computerGameboard  = new Gameboard();

    const instructions = document.getElementById('instructions');
    // Remove play button
    instructions.remove();

    // Create container for gameboards
    const main = document.getElementById('main');
    const gameboardContainer = document.createElement('div');
    gameboardContainer.setAttribute('id', 'gameboardContainer');
    main.appendChild(gameboardContainer);

    createGameboard(playerGameboard, 1);
    createGameboard(computerGameboard, 2);
});

function createGameboard(gameboard, number) {
    
    const gameboardContainer = document.getElementById('gameboardContainer');
    const gameboardDiv = document.createElement('div');
    gameboardDiv.setAttribute('class', 'gameboard');
    gameboardContainer.appendChild(gameboardDiv);

   let ships = [];

    if (number === 1) {
        gameboardDiv.classList.add('gameboard1');
        gameboardDiv.setAttribute('id', 'gameboard1');
        const middleBoard = document.createElement('div');
        middleBoard.setAttribute('id', 'middleBoard');

        const messageVertical = document.createElement('div');
        messageVertical.textContent = "Click here to turn boat vertical";
        const checkbox = document.createElement('input')
        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('id', 'checkbox');
        middleBoard.appendChild(messageVertical);
        messageVertical.appendChild(checkbox);

        const message = document.createElement('p');
        message.textContent = "Place ships on the gameboard";
        middleBoard.appendChild(message);


        gameboardContainer.appendChild(middleBoard);
        ships = createShips();
    } else if (number === 2) {
        gameboardDiv.classList.add('gameboard2');
        gameboardDiv.setAttribute('id', 'gameboard2');
        ships = createShips();
        computerPlaceShips(gameboard, ships);
    }
    
    let rowNumber = 0;
    gameboard.board.forEach((array) => {
        const newRow = document.createElement('div');
        newRow.setAttribute('value', rowNumber);
        newRow.setAttribute('class', 'row');
        rowNumber += 1;
        gameboardDiv.appendChild(newRow);

        let blockNumber = 0;
        array.forEach(() => {
            const newBlock = document.createElement('div');
            newBlock.setAttribute('value', blockNumber);
            newBlock.setAttribute('class', 'block');
            blockNumber += 1;
            newRow.appendChild(newBlock);
            if(number === 1){
                newBlock.addEventListener('click', () =>{
                    placeShips(newBlock, gameboard, ships);
                });
            }
        });
    });
}

// Create ships
function createShips(){

    const shipLengths = [1, 2, 3, 4, 5];
    const ships = shipLengths.map(length => Ship(length));

    return ships;
}

/// Place a single ship when the user clicks on a block
function placeShips(block, gameboard, ships) {
    const middleBoard = document.getElementById('middleBoard');
    const errorMessage = document.createElement('p');

    const x = block.parentNode.getAttribute('value');
    const y = block.getAttribute('value');
    
    const shipSize = ships[0].length;

    const checkbox = document.getElementById('checkbox');
    
    // Clear previous error messages
    errorMessage.textContent = '';
    middleBoard.appendChild(errorMessage);

    let isValidPlacement = true;

    for (let i = 0; i < shipSize; i++) {
        let currentX, currentY;

        if (!checkbox.checked) {
            if (parseInt(y) + shipSize > 10) {
                isValidPlacement = false;
                errorMessage.textContent = "Ship is too long, place it elsewhere";
                errorMessage.style.cssText = "color: red; font-size: bold";
                break; // Break out of the loop if there's an error
            } else {
                currentX = parseInt(x);
                currentY = parseInt(y) + i;
            }
        } else {
            if (parseInt(x) + shipSize > 10) {
                isValidPlacement = false;
                errorMessage.textContent = "Ship is too long, place it elsewhere";
                errorMessage.style.cssText = "color: red; font-size: bold";
                break; // Break out of the loop if there's an error
            } else {
                currentX = parseInt(x) + i;
                currentY = parseInt(y);
            }
        }

        const currentBlock = document.querySelector(`.row[value="${currentX}"] .block[value="${currentY}"]`);
        
        // Check if the current block is already occupied
        if (gameboard.board[currentX][currentY] !== null) {
            isValidPlacement = false;
            errorMessage.textContent = "Invalid placement, overlapping with another ship";
            errorMessage.style.cssText = "color: red; font-size: bold";
            break; // Break out of the loop if there's an error
        }

        currentBlock.style.cssText = 'background-color: blue;';
    }

    // If the placement is valid, place the ship on the gameboard
    if (isValidPlacement) {
        gameboard.placeShip(ships[0], parseInt(x), parseInt(y), checkbox.checked);
        ships.shift();
        if(ships.length === 0){
            setTimeout(() => { 
                middleBoard.textContent = 'Ships are placed! You attack first';
                console.log(playerGameboard, computerGameboard);
                setAttackPlatform(true);
            }, 1000);
        }
    }
}

// Function that places ships on computers gameboard
function computerPlaceShips(gameboard, ships) {
    const shipsLength = ships.length;

    for (let i = 0; i < shipsLength; i++) {
        let x, y, isVertical;

        do {
            x = Math.floor(Math.random() * 10);
            y = Math.floor(Math.random() * 10);
            isVertical = getRandomBoolean();
        } while (!isValidPlacement(gameboard, x, y, ships[i].length, isVertical));

        gameboard.placeShip(ships[i], x, y, isVertical);
    }
}

function isValidPlacement(gameboard, startX, startY, length, isVertical) {
    const endX = isVertical ? startX + length - 1 : startX;
    const endY = isVertical ? startY : startY + length - 1;

    // If ship would be out of bounds
    if (endX >= 10 || endY >= 10) {
        return false;
    }


    // Checking for overlap
    for (let i = startX; i <= endX; i++) {
        for (let j = startY; j <= endY; j++) {
            if (gameboard.board[i][j] !== null) {
                return false;
            }
        }
    }

    // Checking if ship overlap when one is vertical and one horizontal
    for (let i = startX; i <= endX; i++) {
        for (let j = startY; j <= endY; j++) {
            if (isVertical) {
                if (j > 0 && gameboard.board[i][j - 1] !== null) {
                    return false;
                }
                if (j < 9 && gameboard.board[i][j + 1] !== null) {
                    return false;
                }
            } else {
                if (i > 0 && gameboard.board[i - 1][j] !== null) {
                    return false;
                }
                if (i < 9 && gameboard.board[i + 1][j] !== null) {
                    return false;
                }
            }
        }
    }

    return true;
}

// Get a random boolean for random ship placement horizontal or vertical
function getRandomBoolean(){
    const randomValue = Math.random();

    const threshold = 0.5;

    return randomValue > threshold;
}

function setAttackPlatform(playerTurn) {
    if (playerTurn) {
        setupPlayerAttack();
    } else {
        performComputerAttack();
    }
}

function setupPlayerAttack() {
    const gameboardContainer = document.getElementById('gameboard2');
    const blocks = gameboardContainer.querySelectorAll('.block');
    blocks.forEach((block) => {
        block.addEventListener('click', () => {
            const x = block.parentNode.getAttribute('value');
            const y = block.getAttribute('value');
            console.log(block);
            console.log(x, y);
            playerAttack(gameboardContainer, computerGameboard, x, y);
        });
    });
}

function performComputerAttack() {
    const gameboardContainer = document.getElementById('gameboard1');

    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    computerAttack(gameboardContainer, playerGameboard, x, y);
}

function playerAttack(gameboardContainer, gameboard, x, y) {
    const row = gameboardContainer.querySelector(`.row[value='${x}']`);
    const block = row.querySelector(`.block[value='${y}']`);
    const attackResult = gameboard.receiveAttack(x, y);
    
    if (attackResult === 0) {
        block.style.backgroundColor = 'red'; 
        block.textContent = '';
        setAttackPlatform(false);
    } else if (attackResult === 1 ) {
        block.textContent = 'X'; 
        console.log()
        if(gameboard.ships.length === 0){
            setTimeout(()=>{
                winScreen('player');
            }, 1000)
        }
        setAttackPlatform(true);
    }
}

function computerAttack(gameboardContainer, gameboard, x, y) {
    const row = gameboardContainer.querySelector(`.row[value='${x}']`);
    const block = row.querySelector(`.block[value='${y}']`);
    const attackResult = gameboard.receiveAttack(x, y);

    if (attackResult === 0) {
        block.style.backgroundColor = 'red'; 
        block.textContent = '';
        setAttackPlatform(true);
    } else if (attackResult === 1 ) {
        block.style.backgroundColor = 'white';
        block.textContent = 'X';
        if(gameboard.ships.length === 0){
            setTimeout(()=>{
                winScreen('computer');
            }, 1000)
            
        }
        setAttackPlatform(false);
    }
}

function winScreen(winner){
    if(winner === 'computer'){
        alert("Computer won!")
    } else {
        alert("Player won!")
    }
}



