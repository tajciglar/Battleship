import _, { forEach } from 'lodash';
import { Ship } from "./ship";
import { Gameboard } from './gameboard';


const playButton = document.getElementById('playB');

// When play button clicked -> create 2 gameboards;
playButton.addEventListener("click", () =>{
    const playerGameboard = new Gameboard();
    const computerGameboard = new Gameboard();

    // Remove play button
    playButton.remove();

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
        const middleBoard = document.createElement('div');
        middleBoard.setAttribute('id', 'middleBoard');

        const messageVertical = document.createElement('div');
        messageVertical.textContent = "Click here to turn boat vertical";
        const checkbox = document.createElement('input')
        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('id', 'checkbox');
        middleBoard.appendChild(messageVertical);
        messageVertical.appendChild(checkbox);

        gameboardContainer.appendChild(middleBoard);
        ships = createShips();
    } else if (number === 2) {
        gameboardDiv.classList.add('gameboard2');
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

    if(number === 2){
        
        placeShips();
    }
}

function createShips(){

    const shipLengths = [1, 2, 3, 4, 5];
    const ships = shipLengths.map(length => Ship(length));

    return ships;
}


function placeShips(block, gameboard, ships) {
    const instructions = document.getElementById('instructions');
    
    if (instructions.childNodes.length <= 2) {
        const message = document.createElement('p');
        message.textContent = "Place ships on the gameboard";
        instructions.appendChild(message);
    }
   
    const x = block.getAttribute('value');
    const y = block.parentNode.getAttribute('value');

    const shipSize = ships[0].length;

    for (let i = 0; i < shipSize; i++) {
        const checkbox = document.getElementById('checkbox'); // Move inside the loop to get the updated value

        let currentX, currentY;

        if (!checkbox.checked) {
            currentX = parseInt(x) + i;
            currentY = parseInt(y);
        } else {
            currentX = parseInt(x);
            currentY = parseInt(y) + i;
        }

        const currentBlock = document.querySelector(`.row[value="${currentY}"] .block[value="${currentX}"]`);
        currentBlock.style.cssText = 'background-color: blue;';
        gameboard.placeShip(ships[0], currentX, currentY, !checkbox.checked);
    }

    ships.shift();
}

function {
    
}