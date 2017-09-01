class Game{
    constructor(){
      this.playersGuess = null;
      this.pastGuesses = [];
      this.winningNumber = generateWinningNumber();
    }
   checkGuess(){
        if(this.playersGuess === this.winningNumber) return "You Win!";
        if(this.pastGuesses.length > 3) return "You Lose.";
        else if(this.pastGuesses.includes(this.playersGuess)) {
            return "You have already guessed that number.";
        } else {
            this.pastGuesses.push(this.playersGuess);
            var diff = this.difference();
            if(diff < 10) return "You\'re burning up!";
            if(diff < 25) return "You\'re lukewarm.";
            if(diff < 50) return "You\'re a bit chilly.";  
            if(diff < 100) return "You\'re ice cold!";
        }
    }
    playersGuessSubmission(num){
        if(num < 1 || num > 100 || Number.isNaN(num) || typeof(num) !== 'number'){     
            return "That is an invalid guess.";
        } else {
          this.playersGuess = num;
          return this.checkGuess();
        }
    }
    difference(){
      return Math.abs(this.playersGuess-this.winningNumber);
    }
    isLower(){
      if(this.playersGuess < this.winningNumber) return true;
      else return false;
    }
    provideHint(){
      return shuffle([this.winningNumber,generateWinningNumber(),generateWinningNumber()]).join(' ... or ... ');
    }
}
  
// helper functions:
function generateWinningNumber(){
    return Math.floor((Math.random() * 100))+1;
}
function newGame(){
    return new Game();
}
function shuffle(arr){
    var m = arr.length, shuffle, last;
    while(m){
        shuffle = Math.floor(Math.random()*m--);
        last = arr[m];
        arr[m] = arr[shuffle]
        arr[shuffle] = last;
    }
    return arr;
}

// jQuery begins, on page load:
$(document).ready(function startNewGame(){
//Says 'Play With Me' on page load / reset:
    responsiveVoice.speak('Play with me');
    
//when page loads...start new game...
    var thisGame = newGame();

//when user presses enter instead of clicking guess:
$('.userguess').keyup(function(k){
// their number input is referred to the 'on click' function to get checked: 
    if(k.which === 13){
         $('#inputsubmit').trigger('click');
    }
})
//when user clicks Guess:
$('#inputsubmit').on('click', function(){
// their number input is checked: 
    var userguessinput = Number($('.userguess').val());
    var output = thisGame.playersGuessSubmission(userguessinput);
    $('.result').html(output);
    $('.userguess').val('');

//show 'click reset...' in h3 when player wins/loses:
    if(output === "You Win!" || output === "You Lose."){
        $('.hintoutput').val('Click Reset to try again!');
    }

//put previous guesses into boxes visible to player:
    $('.pastguess1').html(thisGame.pastGuesses[0]);
    if(thisGame.pastGuesses[1]) $('.pastguess2').html(thisGame.pastGuesses[1]);
    if(thisGame.pastGuesses[2]) $('.pastguess3').html(thisGame.pastGuesses[2]);
    if(thisGame.pastGuesses[3]) $('.pastguess4').html(thisGame.pastGuesses[3]);
});

// reset game by reloading page when clicking the reset button:
$('#resetbutton').on('click', function(){
    document.location.reload(true);
})

// display provideHint() in h3 when hint button is clicked:
var counter = 0;
$('#hintbutton').on('click', function(){
    if(counter < 1) $('.hintoutput').html(thisGame.provideHint());
    counter++;
})

});
