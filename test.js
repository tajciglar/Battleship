import { Ship, Gameboard, Player } from "./script";

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
})

test('Ship is placed', () => {
    const ship1 = Ship(3);
    const ship2 = Ship(5);
    const gameboard1 = new Gameboard();
    gameboard1.placeShip(ship1, 0, 1, true)
    gameboard1.placeShip(ship2, 2, 2, false)
    console.log(gameboard1);
})

test('Ship is hit', () => {
    const ship1 = Ship(3);
    const gameboard1 = new Gameboard();
    gameboard1.placeShip(ship1, 0, 1, true);
    gameboard1.recieveAttack(0, 1);
    expect(ship1.hits).toBe(1); 
})