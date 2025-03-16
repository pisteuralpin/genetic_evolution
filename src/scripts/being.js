import { normalDraw } from "./utility.js";

const tasks = [
    {
        name: 'chilling',
        weight: 8,
        end: 'time',
        mean_duration: 50,
        stdev_duration: 10
    },
    {
        name: 'moving',
        weight: 2,
        end: 'goal'
    }
];

class Being {
    constructor(position, maxAge, maxSize, color, speed) {
        this.position = position;
        this.age = 0;
        this.maxAge = maxAge;
        this.size = 5;
        this.maxSize = maxSize;
        // At 20% of maxAge, the being will be at max size
        this.growthRate = (this.maxSize - this.size) / (this.maxAge * normalDraw(0.2, 0.05));
        this.color = color;
        this.speed = speed;

        this.currentTask = null;
    }

    update(beings) {
        this.age++;
        if (this.size < this.maxSize) {
            this.size += this.growthRate;
        }
        if (this.age >= this.maxAge) {
            beings.splice(beings.indexOf(this), 1);
        }

        if (this.currentTask == null) {
            this.decideTask();
        }
        else {
            this.performTask(beings);
        }

        if (this.currentTask != null && this.currentTask.end == 'time' && this.currentTask.duration <= 0) {
            this.currentTask = null;
        }
    }

    decideTask() {
        const totalWeight = tasks.reduce((acc, task) => acc + task.weight, 0);
        let random = Math.random() * totalWeight;
        for (let i = 0; i < tasks.length; i++) {
            random -= tasks[i].weight;
            if (random <= 0) {
                this.currentTask = { ...tasks[i] };
                if (this.currentTask.end == 'time') {
                    this.currentTask.duration = normalDraw(this.currentTask.mean_duration, this.currentTask.stdev_duration, 0);
                }
                else if (this.currentTask.end == 'goal') {
                    this.currentTask.goal = null;
                }
                break;
            }
        }
    }

    performTask(beings) {
        if (this.currentTask.name === 'chilling') {
            if (this.currentTask.end === 'time') {
                this.currentTask.duration--;
            }
        }
        else if (this.currentTask.name === 'moving') {
            if (this.currentTask.end === 'goal') {
                if (this.currentTask.goal === null) {
                    this.currentTask.goal = {
                        x: Math.random() * (canvas.width - 100) + 50,
                        y: Math.random() * (canvas.height - 100) + 50
                    }
                }
                const dx = this.currentTask.goal.x - this.position.x;
                const dy = this.currentTask.goal.y - this.position.y;
                    
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance > this.speed) {
                    this.position.x += dx / distance * this.speed;
                    this.position.y += dy / distance * this.speed;
                }
                else {
                    this.currentTask = null;
                }
            }
        }
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = `rgb(${this.color[0]}, ${this.color[1]}, ${this.color[2]})`;
        ctx.arc(this.position.x, this.position.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }
}

export { Being };