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
        this.currentPiece = Pieces.random();
        // TODO nextPiece
        // TODO score
        // TODO remove lines
        // TODO level up
        this.piecePosition = {
            col: 0,
            row: 0,
            orientation: 0,
        }; 
    }

    // Orientation of the current piece (gets two dimensional array)
    getCurrentPieceOrientation(orientation) {
        return this.currentPiece.getOrientation(orientation || this.piecePosition.orientation);
    }

    // get what is presented on the board (empty space, piece)
    getCellByIndex(i, j) {
        if(j < this.piecePosition.col || 
            i < this.piecePosition.row ||
            j > this.piecePosition.col + 3 ||
            i > this.piecePosition.row + 3) {
            return this.board[i][j];
        }

        var currentPieceOrientation = this.getCurrentPieceOrientation();

        // i,j relative to currentPieceOrientation position
        var relativeIndices = {
            row: i - this.piecePosition.row,
            col: j - this.piecePosition.col,
        };

        // if piece cell is truthy -> return it, if not -> return board
        if (currentPieceOrientation[relativeIndices.row][relativeIndices.col]) {
            return currentPieceOrientation[relativeIndices.row][relativeIndices.col];
        } else {
            return this.board[i][j];
        }
    }

    // check if there is already a piece in this position or if border gets overstepped
    isLegalMove(position) {
        var currentPieceOrientation = this.getCurrentPieceOrientation(position.orientation % 4);
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                // check if cell needs to be examined (as 0 is falsy and anything else is truthy)
                if (currentPieceOrientation[i][j]) {
                    var boardIndicies = {
                        row: position.row + i,
                        col: position.col + j,
                    };
                    
                    //check if border gets overstepped
                    //or if cell is occupied
                    if (boardIndicies.row >= this.height ||
                        boardIndicies.col >= this.width ||
                        boardIndicies.row < 0 ||
                        boardIndicies.col < 0 ||
                        this.board[boardIndicies.row][boardIndicies.col]) {
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
                    var boardIndicies = {
                        row: this.piecePosition.row + i,
                        col: this.piecePosition.col + j,
                    };
                    
                    this.board[boardIndicies.row][boardIndicies.col] = currentPieceOrientation[i][j];
                }
            }
        }

        this.currentPiece = Pieces.random();
        this.piecePosition = {
            col: 0,
            row: 0,
            orientation: 0,
        }; 
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
            this.piecePosition.orientation = (this.piecePosition.orientation + 1) % 4;
        }
    }

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

