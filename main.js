class cube{
    x;
    y;
    deltaX;
    deltaY;
    times = 0;
    maxTimes;
    constructor(ctx,colour = '#4e6174'){
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;

        this.maxTimes = Math.floor(Math.random() * Math.floor(10))+20;

        this.deltaX = Math.random() * 6 - 3;
        this.deltaY = Math.random() * 6 - 3;

        this.colour = colour;
        this.ctx = ctx
    }

    draw() {
        this.times += 1
        this.x += this.deltaX
        this.y += this.deltaY
        this.ctx.fillStyle = this.colour;
        this.ctx.fillRect(this.x,this.y,5,5);

        if (this.times > this.maxTimes) {
            this.restart();
        }
    }

    restart(){
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;

        this.times = 0;

        this.maxTimes = Math.floor(Math.random() * Math.floor(10))+20;

        this.deltaX = Math.random() * 6 - 3;
        this.deltaY = Math.random() * 6 - 3;
    }
}

(function() {
    var canvas = document.getElementById('canvas'),
        ctx = canvas.getContext('2d');

    // resize the canvas to fill browser window dynamically
    window.addEventListener('resize', resizeCanvas, false);
    var imgAlex = new Image(); 
    imgAlex.src = "thingy.png"; 

    var cubes = [];
    for (var i = 0; i < 50; i++) {
        cubes.push(new cube(ctx));
    } 

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        /**
         * Your drawings need to be inside this function otherwise they will be reset when 
         * you resize the browser window and the canvas goes will be cleared.
         */
        drawStuff(); 
    }
    resizeCanvas();

    function drawStuff() {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        cubes.forEach(element => {
            element.draw();
        });

        ctx.fillStyle = "white";
        ctx.fillRect(50,50,10,50)

        ctx.drawImage(imgAlex,70,50);
    }

    setInterval(drawStuff, 100);
})();