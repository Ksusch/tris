var speed = 0;

//moving the figure one spot
var i = {
    x: 25,
    y: 25,
    moveDown:  function() { this.y += 25 },
    moveLeft:  function() { this.x -= 25 },
    moveRight: function() { this.x += 25 },
}
    document.onkeydown = function(event) {
        switch (event.keyCode) {
        case 40: i.moveDown();  console.log('down',  i); break;
        case 37: i.moveLeft();  console.log('left',  i); break;
        case 39: i.moveRight(); console.log('right', i); break;
        }
    //updateCanvas();
    }

    drawSquare()


