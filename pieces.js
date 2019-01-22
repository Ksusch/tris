class Piece {
    constructor(up, right, down, left) {
        this.orientations = [up, right, down, left];
    }

    getOrientation(orientation) {
        return this.orientations[orientation];
    }
}

//TODO: finish Pieces
var Pieces = {
    O: new Piece([[1,1,0,0], [1,1,0,0], [0,0,0,0], [0,0,0,0]],
        [[1,1,0,0], [1,1,0,0], [0,0,0,0], [0,0,0,0]],
        [[1,1,0,0], [1,1,0,0], [0,0,0,0], [0,0,0,0]],
        [[1,1,0,0], [1,1,0,0], [0,0,0,0], [0,0,0,0]]),

    L: new Piece(),
    T: new Piece(),
    J: new Piece(),
    I: new Piece(),
    Z: new Piece(),
    S: new Piece(),

    random: function() {
        //TODO: remove me
        return Pieces.O;

        var allPieces = [Pieces.O, Pieces.L, Pieces.T, Pieces.J, Pieces.I, Pieces.Z, Pieces.S];
        var randomIndex = Math.floor(Math.random() * allPieces.length);
        return allPieces[randomIndex];
    }
};
