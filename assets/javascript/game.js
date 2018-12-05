// define variables  - states arrays, score counters, letters guessed etc.


// new game initialize function

$(document).ready(function() {

    // VARIABLES

    //var stateName = ["ALABAMA","ALASKA","ARIZONA","ARKANSAS","CALIFORNIA","COLORADO","CONNECTICUT","DELAWARE","DISTRICT OF COLUMBIA","FLORIDA","GEORGIA","HAWAII","IDAHO","ILLINOIS","INDIANA","IOWA","KANSAS","KENTUCKY","LOUISIANA","MAINE","MONTANA","NEBRASKA","NEVADA","NEW HAMPSHIRE","NEW JERSEY","NEW MEXICO","NEW YORK","NORTH CAROLINA","NORTH DAKOTA","OHIO","OKLAHOMA","OREGON","MARYLAND","MASSACHUSETTS","MICHIGAN","MINNESOTA","MISSISSIPPI","MISSOURI","PENNSYLVANIA","RHODE ISLAND","SOUTH CAROLINA","SOUTH DAKOTA","TENNESSEE","TEXAS","UTAH","VERMONT","VIRGINIA","WASHINGTON","WEST VIRGINIA","WISCONSIN","WYOMING"]
    var stateName = ["IOWA"];
    var validLetter = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
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

            // clear the start instructions after game starts
            var dispInstructions = document.getElementById("instructions");
            dispInstructions.style.display="none";
    
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
            debugger;
            for (i = 0 ; i < state.length; i++) {
                if (state[i] === keyword) {
                    if (positions[i] == "_") {
                        positions[i] = keyword;
                        document.getElementById("random-state").innerHTML = positions.join(" ");
                    }
                     else {
                        alert("You have already select letter " + keyword);
                    }  
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
            document.getElementById("letters").innerHTML = "You Tried: " + lettersGuessed ;
        }
        // End of functions
        //=============================================================================================
    
        // STARTS GAME WHEN ANY KEY IS PRESSED
    
        document.onkeyup = function(event) {
    
            if(!gameRunning){
                startGame();
            }
            var keyword = String.fromCharCode(event.keyCode).toUpperCase();
            var isValidLetter = validLetter.indexOf(keyword);

            // if not a valid letter in alphabet don't consider it
            if (isValidLetter === -1) {
                return;
            }
    
            letterfound = state.indexOf(keyword);
            console.log("letter found = " + letterfound);
    
            // If letter pressed is in the random state, then letterInWord gets called
            if (letterfound != -1) {
                letterInWord (keyword);
            }
            // If letter found has already been used, don't try it again
                else if (letterfound === -1) {
    
                // Push selected letter into the letters guessed display
                    alreadyGuessed = lettersGuessed.indexOf (keyword);
                    if (alreadyGuessed == -1) {
                        lettersGuessed.push(keyword);
                        document.getElementById("letters").innerHTML = "You Tried: " + lettersGuessed ;
                    }
                // decremant guess count every time a letter is pressed
                    guessesCount--;
                    document.getElementById("guesses").innerHTML = "Guesses Remaining: " + guessesCount;
                }
    
            if (guessesCount === 0) {
                document.getElementById("guesses").innerHTML = "Guesses Remaining: " + guessesCount;
                losses++;
                document.getElementById("losses").innerHTML = "Lost: "+ losses;
                resetGame();
                startGame();
            }							
        }
    })
    