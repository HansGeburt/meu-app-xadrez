&lt;immersive type="code" title="Código para script.js">

JavaScript

// Inicializamos as variáveis que vamos usar
var board = null;                 // O objeto do tabuleiro visual
var game = new Chess();           // O objeto da lógica do xadrez, começa com a posição inicial
var whiteSquareGrey = &#39;#a9a9a9&#39;;  // Cor para destacar casas claras
var blackSquareGrey = &#39;#696969&#39;;  // Cor para destacar casas escuras

// --- FUNÇÕES AUXILIARES ---

function removeGreySquares() {
$('\#meu-tabuleiro .square-55d63').css('background', '');
}

function greySquare(square) {
var $square = $('\#meu-tabuleiro .square-' + square);
var background = whiteSquareGrey;
if ($square.hasClass('black-3c85d')) {
background = blackSquareGrey;
}
$square.css('background', background);
}

// --- LÓGICA DE MOVIMENTO DAS PEÇAS ---

// Chamado quando uma peça é solta no tabuleiro
function onDrop(source, target) {
removeGreySquares();

// Tenta fazer o movimento usando a lógica do chess.js
var move = game.move({
from: source,
to: target,
promotion: 'q' // NOTA: Sempre promove para uma Dama por simplicidade
});

// Se o movimento for ilegal, volta a peça para a posição original
if (move === null) return 'snapback';

// Atualiza o painel de informações
updateStatus();


}

// Chamado quando uma peça é pega para arrastar
function onDragStart(source, piece, position, orientation) {
// Não deixa mover peças se o jogo acabou
if (game.game\_over()) return false;

// Só deixa mover as peças do jogador da vez
if ((game.turn() === 'w' && piece.search(/^b/) !== -1) ||
(game.turn() === 'b' && piece.search(/^w/) !== -1)) {
return false;
}


}

// Chamado após um movimento legal ser feito
function onSnapEnd() {
// Atualiza o tabuleiro para a posição atual da lógica do jogo
board.position(game.fen());
}

// --- ATUALIZAÇÃO DO PAINEL DE INFORMAÇÕES ---

function updateStatus() {
var status = '';
var moveColor = 'Brancas';
if (game.turn() === 'b') {
moveColor = 'Pretas';
}

// Verifica se é xeque-mate
if (game.in_checkmate()) {
status = 'Fim de jogo, ' + moveColor + ' em xeque-mate.';
}
// Verifica se é empate
else if (game.in_draw()) {
status = 'Fim de jogo, empate.';
}
// Se o jogo continua, informa de quem é a vez
else {
status = 'É a vez das ' + moveColor;
// Verifica se o jogador está em xeque
if (game.in_check()) {
status += ', ' + moveColor + ' estão em xeque.';
}
}

// Atualiza as informações na tela
$('#status').html(status);
$('#fen').html(game.fen());
$('#pgn').html(game.pgn());


}

// --- CONFIGURAÇÃO INICIAL DO TABULEIRO ---

var config = {
draggable: true,
position: 'start', // Começa na posição inicial padrão
onDragStart: onDragStart,
onDrop: onDrop,
onSnapEnd: onSnapEnd
};

// Renderiza o tabuleiro na div \#meu-tabuleiro
board = Chessboard('meu-tabuleiro', config);

// Lógica para o botão de reiniciar
$('\#reiniciar-btn').on('click', function() {
game.reset();          // Reseta a lógica do jogo para a posição inicial
board.start();         // Reseta o tabuleiro visual
updateStatus();        // Atualiza as informações
});

// Atualiza o status inicial
updateStatus();

</immersive>






