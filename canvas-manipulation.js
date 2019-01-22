var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d")

// drawing I
// function draw() {
//     ctx.fillStyle = "cyan"
//     ctx.strokeStyle = "blue"
//     ctx.strokeRect(90,0,20,80)
//     ctx.fillRect(90,0,20,80)
// }
// draw()

var x = 0
var y = 0

function drawSquare() {
    y += 10
    ctx.fillStyle = "red";
    var SQ = SQUARESIZE = 20;
    ctx.fillStyle = "red";
    ctx.fillRect(x,y,SQ,SQ)
    ctx.strokeStyle = "black";
    ctx.strokeRect(x*SQ,y*SQ,SQ,SQ);
}

