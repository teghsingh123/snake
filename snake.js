const BG_COLOR = '#231f20';
const SNAKE_COLOR = '#c2c2c2';
const FOOD_COLOR = '#e66916';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = canvas.height = 600;

const FR = 10; // Frame Rate
const S = 20; // Screen Size
const T = canvas.width / S; // Tile Size

let pos, vel, food, snake;

function init(){
    pos = {x: 10, y: 10}; // initial head position of snake
    vel = {x: 0, y: 0}; // initial velocity of snake

    snake = [
        {x: 8, y: 10}, // snake starts covering 3 tiles
        {x: 9, y: 10},
        {x: 10, y: 10}
    ]

    randomFood();
}

init();

function randomFood(){
    food = {
        x: Math.floor(Math.random() * T), // * T to fill up entire tile
        y: Math.floor(Math.random() * T)
    }

    for(let cell of snake){
        if(cell.x === food.x && cell.y === food.y){
            return randomFood(); // if snake is touching food, put food somewhere else
        }
    }
}

document.addEventListener('keydown', keydown); // accept key pressed

function keydown(e){
    switch(e.keyCode) {
        case 37: {
            return vel = {x: -1, y: 0} // go left
        }
        case 38: {
            return vel = {x: 0, y: -1} // go down
        }
        case 39: {
            return vel = {x: 1, y: 0} // go right
        }
        case 40: {
            return vel = {x: 0, y: 1} // go up
        }
    }
}

setInterval(() =>{
    requestAnimationFrame(gameLoop);
}, 1000 /FR);

function gameLoop(){
    ctx.fillStyle = BG_COLOR;
    ctx.fillRect(0, 0, canvas.width, canvas.height); // set canvas to all black

    ctx.fillStyle = SNAKE_COLOR;
    for(let cell of snake){
        ctx.fillRect(cell.x*S, cell.y*S, S, S) // set snake to grey
    }

    ctx.fillStyle = FOOD_COLOR;
    ctx.fillRect(food.x*S, food.y*S, S, S); // set food to orange

    pos.x += vel.x;
    pos.y += vel.y; 

    if(pos.x < 0 || pos.x > T || pos.y < 0 || pos.y > T){
        init();
    }

    if(food.x === pos.x && food.y === pos.y){
        snake.push({...pos});
        pos.x += vel.x;
        pos.y += vel.y;
        randomFood();
    }

    if(vel.x || vel.y){
        for(let cell of snake){
            if(cell.x === pos.x && cell.y === pos.y){
                return init();
            }
        }
        snake.push({...pos});
        snake.shift();  
    }
}