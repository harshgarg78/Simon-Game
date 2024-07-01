var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

function nextSequence(){
    userClickedPattern.length = 0;
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour  = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
    animatePress(randomChosenColour);
    level += 1;
    $("#level-title").text("Level "+level);
}

$(".btn").on("click", function(evt){
    var userChosenColour = evt.target.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
    var audio = new Audio(`./sounds/${name}.mp3`);
    audio.play();
}

function animatePress(currentColour){
    $(`#${currentColour}`).addClass("pressed");

    setTimeout(function(){
        $(`#${currentColour}`).removeClass("pressed");
    },100);   
}

$(document).on("keydown",function(){
    if(level === 0){
        $("#level-title").text("Level "+level);
        nextSequence();
    }
});

function gameOver(){
    var audio = new Audio("./sounds/wrong.mp3");
    audio.play();

    $("body").addClass("game-over");

    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);   

    $("#level-title").text("Game Over, Press Any Key to Restart");
    level = 0;
    gamePattern.length = 0;
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if(currentLevel+1 === level){
            setTimeout(nextSequence,1000);
        }
    }else{
        gameOver();
    }
}