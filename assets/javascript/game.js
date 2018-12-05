// define variables  - states arrays, score counters, letters guessed etc.


// new game initialize function

$(document).ready(function() {

    // VARIABLES

    //var stateName = ["ALABAMA","ALASKA","ARIZONA","ARKANSAS","CALIFORNIA","COLORADO","CONNECTICUT","DELAWARE","DISTRICT OF COLUMBIA","FLORIDA","GEORGIA","HAWAII","IDAHO","ILLINOIS","INDIANA","IOWA","KANSAS","KENTUCKY","LOUISIANA","MAINE","MONTANA","NEBRASKA","NEVADA","NEW HAMPSHIRE","NEW JERSEY","NEW MEXICO","NEW YORK","NORTH CAROLINA","NORTH DAKOTA","OHIO","OKLAHOMA","OREGON","MARYLAND","MASSACHUSETTS","MICHIGAN","MINNESOTA","MISSISSIPPI","MISSOURI","PENNSYLVANIA","RHODE ISLAND","SOUTH CAROLINA","SOUTH DAKOTA","TENNESSEE","TEXAS","UTAH","VERMONT","VIRGINIA","WASHINGTON","WEST VIRGINIA","WISCONSIN","WYOMING"]
    var stateName = ["IOWA"]
    var word;
    var state;
    var answerArray= [];
    var wins = 0;
    var losses = 0;
    var guessesCount = 8;
    var rightLetter = [];
    var displayState = [];
    var lettersGuessed = [];
    var gameRunning = false;
    var positions = [];
    var alreadyGuessed = -1;
    
        //==============================================================================================
    
        // FUNCTIONS
        // Function starts game by running through a loop and displaying underscores in placed of letters from random state
        function startGame () {
    
            gameRunning = true;
            guessesCount = 8;
            document.getElementById("guesses").innerHTML = "Guesses Left: "+ guessesCount;
    
            // Chooses random state from category
            state = stateName[Math.floor(Math.random() * stateName.length)];
            console.log("State = " + state)

            for (var i = 0; i < state.length; i++) {
                if (state[i] === " ") {
                    answerArray[i]= "&thinsp;";
                } else {
                    answerArray[i]= "_"; 
                }
            }
            word = answerArray.join(" ");
            //console.log("word = " + word);
            //console.log("answerArray = " + answerArray);
            document.getElementById("random-state").innerHTML = word;
        } 
    
        // Function evaluating the positions of the selected letter in the string of states
        function letterInWord(keyword) {
            // this positions the letter into the right place of the random state name
            positions = answerArray;
            console.log("positions " + positions);
            for (i = 0 ; i < state.length; i++) {
                if (state[i] === keyword){
                    positions[i] = keyword;
                    document.getElementById("random-state").innerHTML = positions.join(" ");     
                }
            }
            positions = positions.join("");
                if (positions === state) {
                    wins++;
                    document.getElementById("wins").innerHTML = "Wins: "+ wins;
                    resetGame();
                    startGame();
                } 
           }
    
        function resetGame() {
            lettersGuessed = [];
            positions = [];
            answerArray = [];
        }
        // End of functions
        //=============================================================================================
    
        // STARTS GAME WHEN ANY KEY IS PRESSED
    
        document.onkeyup = function(event) {
    
            if(!gameRunning){
                startGame();
            }
            var keyword = String.fromCharCode(event.keyCode).toUpperCase();
    
            letterfound = state.indexOf(keyword);
            console.log("letter found = " + letterfound);
    
            // If letter pressed is in the random word, then function letterInWord gets called
            debugger;
            if (letterfound != -1) {
                letterInWord (keyword);
            }
            // If letter found has been pressed already, do not allow same key to be pressed
                else if (letterfound === -1) {
    
                // Push letter pressed into the letters guessed section in html
                    alreadyGuessed = lettersGuessed.indexOf (keyword);
                    if (alreadyGuessed == -1) {
                        lettersGuessed.push(keyword);
                        document.getElementById("letters").innerHTML = "You Tried: " + lettersGuessed ;
                    }
                // Guesses decreases every time a letter is pressed
                    guessesCount--;
                    document.getElementById("guesses").innerHTML = "Guesses Remaining: " + guessesCount;
                }
    
            if (guessesCount === 0) {
                document.getElementById("guesses").innerHTML = "Guesses Remaining: " + guessesCount;
                resetGame();
                startGame();
            }							
        }
    })
    