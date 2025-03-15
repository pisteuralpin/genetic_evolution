import { Being } from './being.js';
import { normalDraw } from './utility.js';

const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const ctx = canvas.getContext('2d');

let beings = [];

for (let i = 0; i < 10; i++) {
    beings.push(new Being(
        { x: Math.random() * (canvas.width - 100) + 50, y: Math.random() * (canvas.height - 100) + 50 }, // Position
        normalDraw(1000, 100, 500, 1500), // Age
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
}, 1000 / 60);