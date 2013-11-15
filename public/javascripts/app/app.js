/* global document, window, io */

$(document).ready(initialize);

var socket;

function initialize(){
  $(document).foundation();
  initializeSocketIO();
  htmlCreateBoard();
  $('#startgame').on('submit', clickStartGame);
  $('#shuffle').on('click', clickShuffle);

}



function clickShuffle(){
  sendAjaxRequest('/shuffle', {id: $('#game').attr('data-id')}, 'post', null, null, function(err, game){
    console.log(game);
  });
}

function clickStartGame(e){
  var url = '/';
  var data = $('form#startgame').serialize();
  console.log(data);
  sendAjaxRequest(url, data, 'post', null, null, function(err, game){
    console.log(game);
    htmlCreateBoard(game);
  });
}


///////////////////////////////////////////////////////////////////////////////////////////


function htmlCreateBoard(game){

 $('form#startgame').toggleClass('hidden');

  for(var i = 0; i < games.tiles.length; i++){
    var x = game.tiles[i].home[0];
    var y = game.tiles[i].home[1];

    var $div = '<div data-x=' + x + 'data-y' + y + '></div>';
    //$div.addClass('tile');
    if(game.tiles[i].blank){
      $div.addClass('empty');
    }

    $('#game').append($div);
    $('#game').data('id', game._id);
  }
  console.log(game);
}

///////////////////////////////////////////////////////////////////////////////////////////
function initializeSocketIO(){
  var port = window.location.port ? window.location.port : '80';
  var url = window.location.protocol + '//' + window.location.hostname + ':' + port + '/app';

  socket = io.connect(url);
  socket.on('connected', socketConnected);
}

function socketConnected(data){
  console.log(data);
}


