export {Ship, Gameboard, Player};

//  Create a battleship
function Ship(length, hits = 0, sunken = false){
    return {
        length: length,
        hits: hits,
        sunken: sunken,
        hit(){
             this.hits += 1;
             this.isSunk();
        },
        isSunk(){
            if(this.hits === this.length){
                this.sunken = true;
            }
        },
    };
}

// Create a battlefield
class Gameboard {
    constructor(){
        this.board = Array.from({length: 10}, () => Array(10).fill(0));
        this.ships = [];
    }

    placeShip(ship, x, y, isHorizantal){
        this.ships.push(ship);
        if(isHorizantal === true){
            for(let i = 0; i < ship.length; i++){
                this.board[x][y] = ship;
                y += 1;
            }
        } else {
            for(let i = 0; i < ship.length; i++){
                this.board[x][y] = ship;
                x += 1;
            }
        }
    }

    recieveAttack(x, y){
        if (this.board[x][y] !== 0){
            this.board[x][y].hits += 1;
        }
    }
}

// Create a player
function Player(){
    
}
