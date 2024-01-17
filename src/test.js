import { Ship, Gameboard } from "./script";

test('Ship length', () => {
    const ship = Ship(5);
    expect(ship.length).toBe(5);
});

test('Ship is hit', () => {
    const ship = Ship(5);
    ship.hit();
    expect(ship.hits).toBe(1);
});

test('Ship is sunk', () => {
    const ship = Ship(2);
    ship.hit();
    ship.hit();
    expect(ship.sunken).toBe(true);
});

test('Ship is placed', () => {
    const ship1 = Ship(3);
    const ship2 = Ship(5);
    const gameboard1 = new Gameboard();
    gameboard1.placeShip(ship1, 0, 1, true)
    gameboard1.placeShip(ship2, 2, 2, false)
});

test('Ship is hit', () => {
    const ship1 = Ship(3);
    const gameboard1 = new Gameboard();
    gameboard1.placeShip(ship1, 0, 1, true);
    gameboard1.recieveAttack(0, 1);
    expect(ship1.hits).toBe(1); 
});

test('Same coordinates fail', () => {
    const ship1 = Ship(3);
    const gameboard1 = new Gameboard();
    gameboard1.placeShip(ship1, 0, 1, true);
    gameboard1.recieveAttack(0, 1);
    expect(gameboard1.recieveAttack(0,1)).toBe(false); 
});

test('Ship is destroyed', () => {
    const ship1 = Ship(3);
    const ship2 = Ship(2);
    const gameboard1 = new Gameboard();
    gameboard1.placeShip(ship1, 0, 1, true);
    gameboard1.placeShip(ship1, 3, 3, true);
    gameboard1.recieveAttack(0, 1);
    gameboard1.recieveAttack(0, 2);
    expect(gameboard1.recieveAttack(0, 3)).toBe("Ship is destroyed");
});

test('All ships sunken', () => {
    const ship1 = Ship(3);
    const gameboard1 = new Gameboard();
    gameboard1.placeShip(ship1, 0, 1, true);
    gameboard1.recieveAttack(0, 1);
    gameboard1.recieveAttack(0, 2);
    expect(gameboard1.recieveAttack(0, 3)).toBe("All ship sunken");
});

test('Player is switched to computer after a miss', () => {
    const ship1 = Ship(3);
    const gameboard1 = new Gameboard();
    gameboard1.placeShip(ship1, 0, 1, true);
    gameboard1.Player = jest.fn();
    gameboard1.recieveAttack(0, 5, "player");
    expect(gameboard1.Player).toHaveBeenCalledWith("player");
});