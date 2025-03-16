import { normalDraw, getColorProximity } from "./utility.js";

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

        this.sociability = .5;
        this.tolerance = 1;

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

    meetChooseGoal(beings) {
        const potentialMeeting = beings.filter(being => being !== this).map(being => {
            return {
                being: being,
                proximity: getColorProximity(this.color, being.color),
                chance: Math.max(0, getColorProximity(this.color, being.color) - this.tolerance + 1)
            };
        });
        // draw a being from potentialMeeting based on chance
        let totalChance = potentialMeeting.reduce((acc, meeting) => acc + meeting.chance, 0);
        let random = Math.random() * totalChance;
        for (let i = 0; i < potentialMeeting.length; i++) {
            random -= potentialMeeting[i].chance;
            if (random <= 0) {
                this.currentTask.goal = potentialMeeting[i].being;
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
                    if(Math.random() < this.sociability) {
                        this.meetChooseGoal(beings);
                    }
                    else {
                        this.currentTask.goal = {
                            x: Math.random() * (canvas.width - 100) + 50,
                            y: Math.random() * (canvas.height - 100) + 50
                        }
                    }
                }
                let dx = 0; let dy = 0;
                if (this.currentTask.goal instanceof Being) {
                    dx = this.currentTask.goal.position.x - this.position.x;
                    dy = this.currentTask.goal.position.y - this.position.y;
                }
                else {
                    dx = this.currentTask.goal.x - this.position.x;
                    dy = this.currentTask.goal.y - this.position.y;
                }
                    
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (this.currentTask.goal instanceof Being && distance < this.size + this.currentTask.goal.size) {
                    if (this.currentTask != null && this.currentTask.goal != null && this.currentTask.goal.currentTask != null) {
                        if (this.currentTask.goal.currentTask.name != 'meeting') {
                            this.currentTask.goal.currentTask = {
                                name: 'meeting',
                                with: [this]
                            }
                        }
                        else {
                            this.currentTask.goal.currentTask.with.push(this);
                        }
                    }
                    this.currentTask = {
                        name: 'meeting',
                        with: [this.currentTask.goal]
                    }
                }
                else if (distance > this.speed) {
                    this.position.x += dx / distance * this.speed;
                    this.position.y += dy / distance * this.speed;
                }
                else {
                    this.currentTask = null;
                }
            }
        }
        else if (this.currentTask.name === 'meeting') {
            if (this.currentTask.with.length === 0) {
                this.currentTask = null;
            }
            else {
                this.currentTask.with.forEach(being => {
                    if (Math.random() < 0.3) {
                        this.currentTask.with.splice(this.currentTask.with.indexOf(being), 1);
                        being.currentTask.with.splice(being.currentTask.with.indexOf(this), 1);
                    }
                });
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