// Create a battlefield
class Gameboard {
    constructor(){
        this.board = Array.from({length: 10}, () => Array(10).fill(null));
        this.ships = [];
    }

    placeShip(ship, x, y, isVertical){
        this.ships.push(ship);
        if(isVertical === true){
            for(let i = 0; i < ship.length; i++){
                this.board[x][y] = ship;
                x += 1;
            }
        } else {
            for(let i = 0; i < ship.length; i++){
                this.board[x][y] = ship;
                y += 1;
            }
        }
    }

    receiveAttack(x, y){
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
                return 1;
            } else {
                this.board[x][y] = 0; // Mark with 0 if its a miss
                return 0;
            }
        }
        return 2;
    }
}

export {Gameboard};