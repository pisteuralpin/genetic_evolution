import { Being } from './being.js';

const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const ctx = canvas.getContext('2d');

let beings = [];

for (let i = 0; i < 5; i++) {
    beings.push(new Being(
        { x: Math.random() * (canvas.width - 100) + 50, y: Math.random() * (canvas.height - 100) + 50 },
        5,
        [0, 128, 0],
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