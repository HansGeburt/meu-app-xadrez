// Inicializamos as variáveis que vamos usar
var board = null;
var game = new Chess();
var whiteSquareGrey = '#a9a9a9';
var blackSquareGrey = '#696969';

function removeGreySquares() {
    $('#meu-tabuleiro .square-55d63').css('background', '');
}

function greySquare(square) {
    var $square = $('#meu-tabuleiro .square-' + square);
    var background = whiteSquareGrey;
    if ($square.hasClass('black-3c85d')) {
        background = blackSquareGrey;
    }
    $square.css('background', background);
}

function onDrop(source, target) {
    removeGreySquares();
    var move = game.move({
        from: source,
        to: target,
        promotion: 'q'
    });
    if (move === null) return 'snapback';
    updateStatus();
}

function onDragStart(source, piece, position, orientation) {
    if (game.game_over()) return false;
    if ((game.turn() === 'w' && piece.search(/^b/) !== -1) ||
        (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
        return false;
    }
}

function onSnapEnd() {
    board.position(game.fen());
}

function updateStatus() {
    var status = '';
    var moveColor = 'Brancas';
    if (game.turn() === 'b') {
        moveColor = 'Pretas';
    }

    if (game.in_checkmate()) {
        status = 'Fim de jogo, ' + moveColor + ' em xeque-mate.';
    } else if (game.in_draw()) {
        status = 'Fim de jogo, empate.';
    } else {
        status = 'É a vez das ' + moveColor;
        if (game.in_check()) {
            status += ', ' + moveColor + ' estão em xeque.';
        }
    }
    
    $('#status').html(status);
    $('#fen').html(game.fen());
    $('#pgn').html(game.pgn());
}

// --- CONFIGURAÇÃO INICIAL DO TABULEIRO ---
var config = {
    draggable: true,
    position: 'start',
    // ADIÇÃO IMPORTANTE ABAIXO: Diz onde buscar as imagens das peças
    pieceTheme: 'https://unpkg.com/@chrisoakman/chessboardjs@1.0.0/img/chesspieces/wikipedia/{piece}.png',
    onDragStart: onDragStart,
    onDrop: onDrop,
    onSnapEnd: onSnapEnd
};

board = Chessboard('meu-tabuleiro', config);

$('#reiniciar-btn').on('click', function() {
    game.reset();
    board.start();
    updateStatus();
});

updateStatus();
