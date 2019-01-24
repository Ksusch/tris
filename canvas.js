var audio = new Audio('korobeiniki.mp3')
document.onkeydown = function(event) {
    event.preventDefault(); 
    switch (event.keyCode) {
        case 40:
            engine.moveDown();
            engine.addScore(1);
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
    ctx.strokeStyle = "#ddd";
    ctx.strokeRect(x*cellDimensions.width, y*cellDimensions.height, cellDimensions.width, cellDimensions.height);
}


var engine

function draw() {
    // when gameOver, don't draw
    if(engine.gameOver()) {
        return;
    }
    for(var i = 0; i < engine.height; i++) {
        for(var j = 0; j < engine.width; j++) {
            drawSquare(j, i, colors[engine.getCellByIndex(i, j)])
        }
    }
    
    for (var i = 0; i < 4; i++) {
        for(var j = 0; j < 4; j++) {
            drawSquare(engine.width + j + 1, i, colors[engine.nextPiece.getOrientation(0)[i][j]])
        }
    }

    document.getElementById("score").innerHTML = "Score: " + engine.score + "<br>Level: " + engine.level + "<br>Lines: " + engine.countRemovedRows;
    
}

document.getElementById("startBtn").onclick = function() {
    engine = new Engine(boardDimensions.width, boardDimensions.height);
    this.style.display = "none"
    draw()  
    
    audio.play()
    audio.loop = true;
    

}

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');

