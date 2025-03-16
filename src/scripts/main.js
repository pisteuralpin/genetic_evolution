import { Being } from './being.js';
import { normalDraw } from './utility.js';
import { drawGraph } from './graph.js';

const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const ctx = canvas.getContext('2d');

let beings = [];

let population = [];
let time = 0;

for (let i = 0; i < 100; i++) {
    beings.push(new Being(
        { x: Math.random() * (canvas.width - 100) + 50, y: Math.random() * (canvas.height - 100) + 50 }, // Position
        normalDraw(2000, 200, 1000, 5000), // Age
        Math.floor(normalDraw(15, 5, 10, 25)), // Size
        [Math.random() * 255, Math.random() * 255, Math.random() * 255], // Color
        normalDraw(1, 0.25, 0.5, 1.5) // Speed
    ));
}

const clock = window.setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < beings.length; i++) {
        beings[i].update(beings);
    }
    for (let i = 0; i < beings.length; i++) {
        beings[i].draw(ctx);
    }

    time++;

    // write the time and the number of beings on top left corner
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText(`Time: ${time}`, 10, 30);
    ctx.fillText(`Population: ${beings.length}`, 10, 60);
    ctx.closePath();

    population.push(beings.length);
    population = population.slice(-1000);

    drawGraph(ctx, population);

}, 1000 / 60);

// on right click, create a new being
window.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    beings.push(new Being(
        { x: e.clientX, y: e.clientY },
        normalDraw(2000, 200, 1000, 5000), // Age
        Math.floor(normalDraw(15, 5, 10, 25)),
        [Math.random() * 255, Math.random() * 255, Math.random() * 255],
        normalDraw(1, 0.25, 0.5, 1.5)
    ));
});

// on left click, send in console the being's information
window.addEventListener('click', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    for (let i = 0; i < beings.length; i++) {
        if (Math.sqrt((x - beings[i].position.x) ** 2 + (y - beings[i].position.y) ** 2) < beings[i].size) {
            console.log(beings[i]);
        }
    }
});