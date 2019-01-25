var backgroundMusic = new Audio('korobeiniki.mp3')
document.onkeydown = function(event) {
    if(event.keyCode == 32) {
        engine.togglePause();
    }
    if (!engine || engine.paused) {
        return
    }
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

function draw() {
    // when gameOver, don't draw
    if(engine.gameOver()) {
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for(var i = 0; i < engine.height; i++) {
        for(var j = 0; j < engine.width; j++) {
            drawSquare(j, i, colors[engine.getCellByIndex(i, j)])
        }
    }
    
    for (var i = 0; i < 4; i++) {
        for(var j = 0; j < 4; j++) {
            if(engine.nextPiece.getOrientation(0)[i][j]) {
                drawSquare(engine.width + j + 1, i, colors[engine.nextPiece.getOrientation(0)[i][j]])
            }
        }
    }

    ctx.fillStyle = "black";
    ctx.fillText("Score: " + engine.score, (engine.width + 1)* cellDimensions.width, (engine.height - 3) * cellDimensions.height);
    ctx.fillText("Level: " + engine.level, (engine.width + 1)* cellDimensions.width, (engine.height - 2) * cellDimensions.height);
    ctx.fillText("Lines: " + engine.countRemovedRows, (engine.width + 1)* cellDimensions.width, (engine.height - 1) * cellDimensions.height);
    
}

document.getElementById("startBtn").onclick = function() {
    engine = new Engine(boardDimensions.width, boardDimensions.height);
    this.style.display = "none";
    document.getElementById("game").style.display = "block";
    draw();
    
    backgroundMusic.play();
    backgroundMusic.loop = true;
}

var engine;
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');
ctx.font = "14px Arial";


