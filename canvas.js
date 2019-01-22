
document.onkeydown = function(event) {
    switch (event.keyCode) {
        case 40:
            engine.moveDown();
            // engine.console();   
            break;

        case 38:
            engine.rotatePiece();
            // engine.console();   
            break;

        case 39:
            engine.moveRight();
            // engine.console();   
            break;
        
        case 37:
            engine.moveLeft();
            // engine.console();   
            break;
    }
    draw();
}


function drawSquare(x, y, color) {
    //drawing the squares:
    ctx.fillStyle = color;
    ctx.fillRect(x*cellDimensions.width, y*cellDimensions.height, cellDimensions.width, cellDimensions.height)
    //drawing the square-lines:
    ctx.strokeStyle = "black";
    ctx.strokeRect(x*cellDimensions.width, y*cellDimensions.height, cellDimensions.width, cellDimensions.height);
}

function draw() {
    for(var i = 0; i < engine.height; i++) {
        for(var j = 0; j < engine.width; j++) {
            drawSquare(j, i, colors[engine.getCellByIndex(i, j)])
        }
    }
}


var engine = new Engine(boardDimensions.width, boardDimensions.height);
engine.console(); 

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');
draw()  
