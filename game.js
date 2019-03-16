//Array of the colours in the Simon Game
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

// Game state at the begin (has not started and at level 0
var started = false;
var level = 0;

// CRITICAL FUNCTIONS

// Game start
$("#start").click(function() {
  if (!started) {
    $("#level-title").html("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn:not(#start)").click("keydown", function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    $("body").addClass("game-over");
    $("#level-title").html("Game Over, Press the Start Button to Try Again");
    playSound("wrong");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 100);
    startOver();
  }
}

// RECURRING FUNCTIONS

// Function to randomly generate a number between 0 and 3 for colour selection
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").html("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var chooseRandomColour = buttonColours[randomNumber];
  gamePattern.push(chooseRandomColour);

  $("#" + chooseRandomColour).fadeOut(300).fadeIn(300).fadeOut(300).fadeIn(300);
  playSound(chooseRandomColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.volume = 0.15;
  audio.play();

}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 500);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
