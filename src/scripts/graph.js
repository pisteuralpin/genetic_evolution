function drawGraph(ctx, values) {
    ctx.beginPath();
    ctx.strokeStyle = 'white';
    ctx.moveTo(0, window.innerHeight - values[0]/Math.max(...values) * 100);
    for (let i = 1; i < values.length; i++) {
        ctx.lineTo(i/(values.length/10)*window.innerWidth, window.innerHeight - values[10*i]/Math.max(...values) * 100);
    }
    ctx.stroke();
    ctx.closePath();
}

export { drawGraph };