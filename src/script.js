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

    createGameboard(playerGameboard.board, 1);
    createGameboard(computerGameboard.board, 2);
});

function createGameboard(gameboard, number) {
    
    const gameboardContainer = document.getElementById('gameboardContainer');
    const gameboardDiv = document.createElement('div');
    gameboardDiv.setAttribute('class', 'gameboard');
    gameboardContainer.appendChild(gameboardDiv);

   
    if (number === 1) {
        gameboardDiv.classList.add('gameboard1');
        const middleBoard = document.createElement('div');
        middleBoard.setAttribute('id', 'middleBoard');
        gameboardContainer.appendChild(middleBoard);
    } else if (number === 2) {
        
        gameboardDiv.classList.add('gameboard2');
    }

    
    
    let rowNumber = 0;
    gameboard.forEach((array) => {
       
        const newRow = document.createElement('div');
        newRow.setAttribute('id', rowNumber);
        newRow.setAttribute('class', 'row');
        rowNumber += 1;
        gameboardDiv.appendChild(newRow);

        let blockNumber = 0;
        array.forEach((block) => {
            const newBlock = document.createElement('div');
            newBlock.setAttribute('id', blockNumber);
            newBlock.setAttribute('class', 'block');
            blockNumber += 1;
            newRow.appendChild(newBlock);
        });
    });
}