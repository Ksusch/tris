class Engine {
    constructor(width, height) {
        this.width = width;
        this.height = height;

        this.board = [];
        for (var r = 0; r < height; r++) {
            this.board[r] = [];
            for (var c = 0; c < width; c++) {
                this.board[r][c] = 0;
            }
        }
        this.score = 0;
        this.level = 1;
        this.getNewPiece();

        this.startTimer();
        // TODO score
        // TODO level up
    }

    startTimer() {
        var that = this;
        setInterval(function() {
            that.moveDown();
            draw();
        }, 1000)

    }

    // position and orientation of the piece when starting the game
    getNewPiece() {
        // TODO nextPiece box
        this.currentPiece = Pieces.random();
        this.piecePosition = {
            col: this.width/2 -1,
            row: 0,
            orientation: 0,
        }; 
    }

    // Orientation of the current piece (gets two dimensional array)
    getCurrentPieceOrientation(orientation) {
        return this.currentPiece.getOrientation((orientation || this.piecePosition.orientation) % 4);
    }

    // get what is presented on the board (empty space, piece)
    getCellByIndex(i, j) {
        if (j < this.piecePosition.col || 
            i < this.piecePosition.row ||
            j > this.piecePosition.col + 3 ||
            i > this.piecePosition.row + 3) {
            return this.board[i][j];
        }

        var currentPieceOrientation = this.getCurrentPieceOrientation();

        // i,j relative to currentPieceOrientation position => r,c (indicies inside 4x4)
        var r = i - this.piecePosition.row;
        var c = j - this.piecePosition.col;

        // if piece cell is truthy -> return it, if not -> return board
        if (currentPieceOrientation[r][c]) {
            return currentPieceOrientation[r][c];
        } else {
            return this.board[i][j];
        }
    }

    // check if there is already a piece in this position or if border gets overstepped
    isLegalMove(position) {
        var currentPieceOrientation = this.getCurrentPieceOrientation(position.orientation);
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                // check if occupied cell needs to be examined (as 0 is falsy and anything else is truthy)
                if (currentPieceOrientation[i][j]) {
                    // check if cell on the board is already occupied
                    var r = position.row + i;
                    var c = position.col + j;
                    
                    //check if border gets overstepped
                    if (r >= this.height ||
                        c >= this.width ||
                        r < 0 ||
                        c < 0 ||
                        //or if cell is occupied
                        this.board[r][c]) {
                            return false;
                        }
                }
            }
        }

        return true;
    }

    putPieceOnBoard() {
        var currentPieceOrientation = this.getCurrentPieceOrientation();
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                // check if cell needs to be examined (as 0 is falsy and anything else is truthy)
                if (currentPieceOrientation[i][j]) {
                    var r = this.piecePosition.row + i;
                    var c = this.piecePosition.col + j;
                    
                    this.board[r][c] = currentPieceOrientation[i][j];
                }
            }
        }

        this.removeCompleteRows();
        this.getNewPiece();
    }

    removeCompleteRows() {
        for (var i = 0; i < this.height; i++) {
            var isCompleteRow = true;
            for (var j = 0; j < this.width; j++) {
                //if board cells are not occupied, it is not a complete row
                if (!this.board[i][j]) {
                    isCompleteRow = false;
                }
            }

            if (isCompleteRow) {
                // iterating through this.board starting from the row that gets deducted
                for (var r = i; r > 0; r--) {
                    // iterate over the row cells
                    for (var c = 0; c < this.width; c++) {
                        // moves the board one row down from the completed row
                        this.board[r][c] = this.board[r-1][c]
                    }
                }

                // empty the first row
                for (var c = 0; c < this.width; c++) {
                    this.board[0][c] = 0;
                }
            }

        }
    }

    moveDown() {
        if (this.isLegalMove({
            col: this.piecePosition.col,
            row: this.piecePosition.row + 1,
        })) {
            this.piecePosition.row++;
        } else {
            this.putPieceOnBoard();
        }
    }

    moveRight() {
        if (this.isLegalMove({
            col: this.piecePosition.col + 1,
            row: this.piecePosition.row,
        })) {
            this.piecePosition.col++;
        }
        
    }

    moveLeft() {
        if (this.isLegalMove({
            col: this.piecePosition.col - 1,
            row: this.piecePosition.row,
        })) {
            this.piecePosition.col--;
        }
        
    }

    rotatePiece() {
        if (this.isLegalMove({
            col: this.piecePosition.col,
            row: this.piecePosition.row,
            orientation: this.piecePosition.orientation + 1,
        })) {
            this.piecePosition.orientation++;
        }
    }

    // engine-check in console 
    console() {
        var output = "";
        for (var i = 0; i < this.height; i++) {
            for (var j = 0; j < this.width; j++) {
                output += this.getCellByIndex(i, j);
            }
            output += "\n";
        } 
        console.log(output);
    }
}

