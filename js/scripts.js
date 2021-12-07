//Business Logic
function Player(playerNum) {
  this.playerNumber = playerNum;
  this.score = 0;
  this.totalScore = 0;
}

Player.prototype.Rolldice = function(){
  let diceRoll = Math.floor((Math.random() * 6) + 1);
  return diceRoll;
}
//Could call playerWon from here and factor that in to return
Player.prototype.turnOver = function(diceRoll, player) {
  let whosTurn = "";
  playerId = player.playerNumber;
  if (diceRoll === 1 && playerId === 1) {
    let whosTurn = "Player 2's turn";
    Player.prototype.disableTurn(whosTurn);
    return whosTurn;
    }
  else if (diceRoll === 1 && playerId === 2) {
    let whosTurn = "Player 1's turn";
    Player.prototype.disableTurn(whosTurn);
    return whosTurn;
    }
  else if (diceRoll !== 1 && playerId === 1) {
    let whosTurn = "Still player " + playerId + "'s turn";
    return whosTurn;
  }
  else if (diceRoll !== 1 && playerId === 2) {
    let whosTurn = "Still player " + playerId + "'s turn";
    return whosTurn;
  }
  return 0;
}

Player.prototype.calculateRoundScore = function(diceRoll, player) {
    if (diceRoll === 1){
       player.score = 0;
    }
    else if (diceRoll !== 1){ 
      player.score += diceRoll; 
    }
    return player.score;
  }

Player.prototype.calculateTotalScore = function(player) {
  let totalScore = (player.totalScore) + player.score;
  //let totalScore = (player.totalScore + roundScore);
  player.totalScore += player.score;
  //player.totalScore += roundScore;
  console.log(player.totalScore);
  return totalScore;
}

Player.prototype.resetRoundScore = function(roundScore, player) {
  player.score = 0;
  console.log("Player.score" + player.score + "Player total score " + player.totalScore);
  return 0;
}

Player.prototype.playerWon = function(score, player) {
  let playerScore = score;
  let whoWon = "";
  if (playerScore >= 100) {
    whoWon = "Player " + player.playerNumber + " won! Game over";
    return whoWon;
  }
}

//User Interface
let player1;
let player2;
//let player3;

Player.prototype.disableTurn = function(turnOver) {
  if (turnOver === "Player 2's turn") {
    $("#player2").toggle();
    $("#player1").toggle();
    }
  else if (turnOver === "Player 1's turn") {
    $("#player2").toggle();
    $("#player1").toggle();
    }
  else if (turnOver === "Player 1 holds. Player 2's turn") {
    $("#player2").toggle();
    $("#player1").toggle();
  }
  else if (turnOver === "Player 2 holds. Player 1's turn") {
    $("#player2").toggle();
    $("#player1").toggle();
  }
  return 0;
}

$(document).ready(function() {
  $("#startGame").click(function(event){
  event.preventDefault();
  $("#game").show();
  $(".play-game").hide();
  player1 = new Player(1);
  player2 = new Player(2);
  diceLog1 = [];
  diceLog2 = [];
  //player3 = new Player(3);
  });
});

$(document).ready(function() {
  $(".btn-roll1").click(function(event){
  event.preventDefault();
  dice = Player.prototype.Rolldice();
  diceLog1.push(dice);
  var turnOver1 = Player.prototype.turnOver(dice, player1); 
  roundScore = Player.prototype.calculateRoundScore(dice, player1);
  console.log("Round score " + roundScore + " dice " + dice);
  $(".player1-roundScore").text(roundScore);
  $(".playerTurn").text(turnOver1);
  $(".player1-score").text(player1.totalScore);
  $(".player1-roll").text(dice);
  });
});

$(document).ready(function() {
  $(".btn-roll2").click(function(event){
  event.preventDefault();
  dice = Player.prototype.Rolldice();
  diceLog2.push(dice);
  var turnOver2 = Player.prototype.turnOver(dice, player2);
  roundScore = Player.prototype.calculateRoundScore(dice, player2);
  console.log("Round score " + roundScore + " dice " + dice);
 // score = calculateTotalScore(roundScore, player2);
 $(".player2-roundScore").text(roundScore);
 $(".playerTurn").text(turnOver2);
 $(".player2-score").text(player2.totalScore);
 $(".player2-roll").text(dice);
  });
});

$(document).ready(function() {
  $(".btn-hold1").click(function(event){
  event.preventDefault();
  score = Player.prototype.calculateTotalScore(player1);
  //score = Player.prototype.calculateTotalScore(roundScore, player1);
  roundScore = Player.prototype.resetRoundScore(roundScore, player1);
  console.log("Reset round score " + roundScore + " roundScore for player 1 should be 0: " + player1.score);
  winner = Player.prototype.playerWon(score, player1);
  $(".winner").text(winner);
  $(".player1-score").text(score);
  var player1Hold = "Player 1 holds. Player 2's turn";
  $(".playerTurn").text(player1Hold);
  Player.prototype.disableTurn(player1Hold);
  });
});

$(document).ready(function() {
  $(".btn-hold2").click(function(event){
  event.preventDefault();
  score = Player.prototype.calculateTotalScore(player2);
  //score = Player.prototype.calculateTotalScore(roundScore, player2);
  roundScore = Player.prototype.resetRoundScore(roundScore, player2);
  console.log("Reset round score " + roundScore + " roundScore for player 2 should be 0: " + player2.score);
  winner = Player.prototype.playerWon(score, player2);
  $(".winner").text(winner);
  $(".player2-score").text(score);
  var player2Hold = "Player 2 holds. Player 1's turn";
  $(".playerTurn").text(player2Hold);
  Player.prototype.disableTurn(player2Hold);
  });
});