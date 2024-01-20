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
    console.log(ships);
    const instructions = document.getElementById('instructions');
    
    if (instructions.childNodes.length <= 2) {
        const message = document.createElement('p');
        message.textContent = "Place ships on the gameboard";
        instructions.appendChild(message);
    }

    /*
        const messageVertical = document.createElement('div');
        messageVertical.textContent = "Click here to turn boat vertical";
        const checkbox = document.createElement('input')
         checkbox.setAttribute('type', 'checkbox');
    */ 
    
   
    const x = block.getAttribute('value');
    const y = block.parentNode.getAttribute('value');

    const shipSize = ships[0].length;

    for (let i = 0; i < shipSize; i++) {
       
        const currentBlock = block.parentNode.querySelector(`[value="${parseInt(x) + i}"]`);
        currentBlock.style.cssText = 'background-color: blue;';
    }

    gameboard.placeShip(ships[0], x, y, true);

    ships.shift();
}
