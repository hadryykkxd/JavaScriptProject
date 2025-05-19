const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const box = 20;
const canvasSize = 600;
const total = canvasSize / box;

let direction;
let snake;
let food;
let score;

function resetGame() {
    snake = [{ x: (total / 2) * box, y: (total / 2) * box }];
    direction = "RIGHT";
    score = 0;
    food = {
        x: Math.floor(Math.random() * total) * box,
        y: Math.floor(Math.random() * total) * box,
    };
}

resetGame();

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    else if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    else if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
    else if (e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
});

function gameLoop() {
    ctx.fillStyle = "#537D5D";
    ctx.fillRect(0, 0, canvasSize, canvasSize);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? "#0f0" : "#0a0";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = "#f00";
    ctx.fillRect(food.x, food.y, box, box);

    let headX = snake[0].x;
    let headY = snake[0].y;

    if (direction === "LEFT") headX -= box;
    if (direction === "RIGHT") headX += box;
    if (direction === "UP") headY -= box;
    if (direction === "DOWN") headY += box;

    if (
        headX < 0 || headX >= canvasSize ||
        headY < 0 || headY >= canvasSize
    ) {
        alert("Game Over! Pontos: " + score);
        resetGame();
        return;
    }

    for (let i = 1; i < snake.length; i++) {
        if (headX === snake[i].x && headY === snake[i].y) {
            alert("Game Over! Pontos: " + score);
            resetGame();
            return;
        }
    }

    let newHead;
    if (headX === food.x && headY === food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * total) * box,
            y: Math.floor(Math.random() * total) * box,
        };
        newHead = { x: headX, y: headY };
    } else {
        snake.pop();
        newHead = { x: headX, y: headY };
    }

    snake.unshift(newHead);
    ctx.fillStyle = "#fff";
    ctx.font = "18px Arial";
    ctx.fillText("Pontos: " + score, 10, 20);
}

setInterval(gameLoop, 100);
