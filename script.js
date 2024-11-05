const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Alapértelmezett beállítások
const boxSize = 10;
let snake = [{ x: 10 * boxSize, y: 10 * boxSize }];
let direction = "RIGHT";
let food = { x: Math.floor(Math.random() * 20) * boxSize, y: Math.floor(Math.random() * 20) * boxSize };
let score = 0;

// A játék logikájának frissítése
function update() {
    // Snake feje
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Új pozíció kiszámítása
    if (direction === "LEFT") snakeX -= boxSize;
    if (direction === "RIGHT") snakeX += boxSize;
    if (direction === "UP") snakeY -= boxSize;
    if (direction === "DOWN") snakeY += boxSize;

    // Ha a kígyó megeszi a kaját
    if (snakeX === food.x && snakeY === food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 20) * boxSize,
            y: Math.floor(Math.random() * 20) * boxSize
        };
    } else {
        snake.pop(); // Mozgásnál eltávolítjuk a farokrészt
    }

    // Új fej hozzáadása
    const newHead = { x: snakeX, y: snakeY };
    snake.unshift(newHead);

    // Ütközés ellenőrzése (a pálya szélével vagy önmagával)
    if (
        snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height ||
        snake.slice(1).some(part => part.x === snakeX && part.y === snakeY)
    ) {
        clearInterval(game);
        alert("Vége a játéknak! Pontszám: " + score);
    }
}

// A játék kirajzolása
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Kígyó kirajzolása
    ctx.fillStyle = "lime";
    snake.forEach(part => {
        ctx.fillRect(part.x, part.y, boxSize, boxSize);
    });

    // Kaja kirajzolása
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, boxSize, boxSize);

    // Pontszám kiírása
    ctx.fillStyle = "#fff";
    ctx.fillText("Pontszám: " + score, 5, canvas.height - 5);
}

// Irányítás
window.addEventListener("keydown", event => {
    if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
    if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
});

// Játék indítása
const game = setInterval(() => {
    update();
    draw();
}, 100);
