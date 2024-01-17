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

export {Ship};