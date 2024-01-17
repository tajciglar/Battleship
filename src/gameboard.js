// Create a battlefield
class Gameboard {
    constructor(){
        this.board = Array.from({length: 10}, () => Array(10).fill(null));
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

    recieveAttack(x, y, currentPlayer){
        if(this.board[x][y] !== 1 && this.board[x][y] !== 0){
            // If ship is hit
            if (this.board[x][y] !== null){
                this.board[x][y].hit();
                if (this.board[x][y].sunken === true){
                    this.board[x][y] = 1;
                    this.ships.pop(); // Remove a ship from the array of ships
                    if(this.ships.length === 0){
                        return "All ship sunken";
                    }
                    return "Ship is destroyed";
                }
                this.board[x][y] = 1; // Mark with 1 if its a hit
            } else {
                this.board[x][y] = 0; // Mark with 0 if its a miss
                this.Player(currentPlayer);
            }
        }
        return false;
    }

    Player(currentPlayer){
        if(currentPlayer === "computer"){
            this.recieveAttack(0, 1, "player");
        }else{
            //recieveAttack(, , "computer")
            this.recieveAttack(0, 1, "computer");
        }
    }
}

export {Gameboard};