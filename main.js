
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

class content{
    current = 1;
    constructor(ctx, images){
        this.screenspace = [canvas.width,canvas.height - 200];

        this.JSONimages = images;
        this.ctx = ctx;

        console.log(this.JSONimages[this.current]);
    }

    draw(){
        // this.ctx.fillStyle = "#fdffcf";
        // this.ctx.fillRect(10,200,this.screenspace[0] - 20,this.screenspace[1] - 20);
        // this.ctx.fillStyle = "#000000";
        // this.ctx.fillRect(this.screenspace[0]/2, this.screenspace[1] / 2 + 200,20,20);

        var drawIn = [100,250]
        //draw title
        this.ctx.font = "40px Gugi";
        // Create gradient
        var gradient = this.ctx.createLinearGradient(drawIn[0], drawIn[1], canvas.width, drawIn[1]);
        gradient.addColorStop("0","#9ecdff");
        gradient.addColorStop("0.2", "#5d79de");
        gradient.addColorStop("0.5", "#c97db9");
        gradient.addColorStop("1.0","#ffffff");
        // Fill with gradient
        this.ctx.fillStyle = gradient;
        this.ctx.fillText(mainJSONinfo[this.current]["title"], drawIn[0], drawIn[1]);

        this.ctx.font = "20px Gugi";
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillText(mainJSONinfo[this.current]["description"], drawIn[0] + 5, drawIn[1] + 50);

        var imgScale = (this.screenspace[1] - drawIn[1] + 50) / this.JSONimages[this.current].height;

        if (this.JSONimages[this.current].width * imgScale > this.screenspace[0]-200){
            imgScale = (this.screenspace[0] - drawIn[0] - 50) / this.JSONimages[this.current].width;
        }
        
        this.ctx.drawImage(this.JSONimages[this.current], drawIn[0] + 5, drawIn[1] + 100, this.JSONimages[this.current].width * imgScale,this.JSONimages[this.current].height * imgScale);
    }

    restart(){
        this.screenspace = [canvas.width,canvas.height - 200];
    }

    nexturu(){
        this.current += 1;

        if (this.current >= this.JSONimages.length){
            this.current = 0;
        }
    }

    beforeuru(){
        this.current -= 1;

        if (this.current < 0){
            this.current = this.JSONimages.length - 1;
        }
    }

    goToPage(){
        window.location.href = mainJSONinfo[this.current]["link"];
    }
}

(function() {
    var canvas = document.getElementById('canvas'),
        ctx = canvas.getContext('2d');

    // resize the canvas to fill browser window dynamically
    window.addEventListener('resize', resizeCanvas, false);
    var imgAlex = new Image(); 
    imgAlex.src = "thingy.png";
    
    var imgArrow = new Image(); 
    imgArrow.src = "arrow.png";

    var imgArrow2 = new Image(); 
    imgArrow2.src = "arrow2.png";

    var JSONimages = [];
    for (let i = 0; i < mainJSONinfo.length; i++) {
        JSONimages.push(new Image());
        JSONimages[i].src = mainJSONinfo[i]["img"];
    }

    var display = new content(ctx, JSONimages);

    var cubes = [];
    for (var i = 0; i < 50; i++) {
        cubes.push(new cube(ctx));
    } 

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        display.restart();

        /**
         * Your drawings need to be inside this function otherwise they will be reset when 
         * you resize the browser window and the canvas goes will be cleared.
         */
        drawStuff(); 
    }
    resizeCanvas();
    canvas.addEventListener("mousedown", getPosition, false);

    function drawStuff() {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        cubes.forEach(element => {
            element.draw();
        });

        ctx.fillStyle = "white";
        ctx.fillRect(50,50,10,50)

        ctx.drawImage(imgAlex,70,50);
        ctx.drawImage(imgArrow ,10              ,canvas.height / 2, 80, 200);
        ctx.drawImage(imgArrow2,canvas.width -90,canvas.height / 2, 80, 200);

        display.draw()
    }

    function getPosition(event)
    {
    var x = event.x;
    var y = event.y;

    if (y > 100){
        console.log("yes");
        if (x > canvas.width - 100){
            display.nexturu();
        }
        else if (x < 100){
            display.beforeuru();
        }
        else{
            display.goToPage();
        }
    }
    } 

    setInterval(drawStuff, 100);
})();

