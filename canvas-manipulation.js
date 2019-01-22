var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d")

var row = 20;
var col = 10;
var SQ = 20; 

// drawing I
// function draw() {
//     ctx.fillStyle = "cyan"
//     ctx.strokeStyle = "blue"
//     ctx.strokeRect(90,0,20,80)
//     ctx.fillRect(90,0,20,80)
// }
// draw()

//drawing the figures (Aaron's suggestion)
// var x = 90
// var y = 0

// function drawSquare() {
//     y += 10
//     ctx.fillStyle = "red";
//     var SQ = SQUARESIZE = 20;
//     ctx.fillRect(x,y,SQ,SQ)
//     ctx.strokeStyle = "black";
//     ctx.strokeRect(x,y,SQ,SQ);
// }

//function to draw squares for board and figures:

function drawSquare(x,y,color) {
    //drawing the squares:
    ctx.fillStyle = color;
    ctx.fillRect(x*SQ,y*SQ,SQ,SQ)
    //drawing the square-lines:
    ctx.strokeStyle = "black";
    ctx.strokeRect(x*SQ,y*SQ,SQ,SQ);
}

// creating the board

var board = [];
for (r = 0; r < row; r++){
    board[r] = [];
    for(c = 0; c < col; c++){
        board[r][c] = "white";
    }
}

//drawing the board

function drawBoard() {
    for (r = 0; r < row; r++){
        for(c = 0; c < col; c++){
            drawSquare(c,r,board[r][c])
        }
    }
}
drawBoard();

//drawing the figures

var figures = [
    [i, "green"],
]

var f = new Figure(figures[0][0], figures[0][1]);

function Figure(rectangle, color) {
    this.rectangle = rectangle;
    this.color = color;
    //figure unrotated in the rectangle
    this.rectangleNumber = 0;
    //activeRectangle = figure we are playing with at the moment
    this.activeRectangle = this.rectangle[this.rectangleNumber];
    //position of the pieces
    this.x = 0;
    this.y = 3;

    this.draw = function() {
        for (r = 0; r < this.activeRectangle.length; r++) {
            for (c = 0; c < this.activeRectangle.length; c++) {
                //drawing only the squares of the figures in the rectangle
                if (this.activeRectangle[r][c]) {
                    drawSquare(this.x + c, this.y + r, this.color)
                }
            }
        }
    }
}
