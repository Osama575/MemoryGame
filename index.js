var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow" ];
var userClickPattern =[];
var keypressCheck = 0;
var level = 0;


 function nextSequence()
 {

   var randomNumber = Math.floor(Math.random() * 4);

   var randomChosenColor = buttonColors[randomNumber];
   gamePattern.push(randomChosenColor);


   var selectButton = "#" + randomChosenColor;
   $(selectButton).fadeOut(200).fadeIn(200);

   playSound(randomChosenColor);

   level++;
  $("#level-title").text("Level " + level);

}




$(".btn").click(function(){
  var userChosenColor = $(this).attr('id');
  userClickPattern.push(userChosenColor);
  var animateColorId ="#" + userChosenColor;
  animatePress(userChosenColor);


   var lengthOfUserClick = userClickPattern.length - 1;
   checkAnswer(lengthOfUserClick, userChosenColor);

});

function playSound(name) {
  var audioPicker = name + ".mp3" ;
  var buttonClickSound = new Audio("sounds/" + audioPicker);
  buttonClickSound.play();
}

function animatePress(currentColor) {
  var animateColorId ="#" + currentColor;
  $(animateColorId).addClass("pressed");
    setTimeout(function(){
      $(animateColorId).removeClass("pressed");
    }, 100);
}

$(".start").click(function(){
  keypressFunc();
});

function checkAnswer(currentLevel, soundCheck) {
   if (gamePattern[currentLevel] === userClickPattern [currentLevel] ) {
     playSound(soundCheck);
if (userClickPattern.length === gamePattern.length) {
     setTimeout(function(){
       nextSequence();
   }, 1000);
    userClickPattern =[];
    }
   }else {
     var audioPickWrong = "wrong.mp3" ;
     var buttonClickWrong = new Audio("sounds/" + audioPickWrong);
     buttonClickWrong.play();

     $("body").addClass("game-over");
       setTimeout(function(){
         $("body").removeClass("game-over");
       }, 200);

        $(".start").text("Restart");
        $("#level-title").text("Level " + level);
        startOver();
   }


}

let keypressFunc = () => {
  keypressCheck++;
  if (keypressCheck === 2 || keypressCheck === 1 ) {
    nextSequence();
  }
}

function startOver() {
level = 0;
userClickPattern= [];
gamePattern = [];
keypressCheck = 1;

}
