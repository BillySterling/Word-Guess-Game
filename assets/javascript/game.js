// 12/5/2018 - Guess the state hangman game - Georgia Tech coding bootcamp
$(document).ready(function() {

    // variables

    var stateName = ["ALABAMA","ALASKA","ARIZONA","ARKANSAS","CALIFORNIA","COLORADO","CONNECTICUT","DELAWARE","DISTRICT OF COLUMBIA","FLORIDA","GEORGIA","HAWAII","IDAHO","ILLINOIS","INDIANA","IOWA","KANSAS","KENTUCKY","LOUISIANA","MAINE","MONTANA","NEBRASKA","NEVADA","NEW HAMPSHIRE","NEW JERSEY","NEW MEXICO","NEW YORK","NORTH CAROLINA","NORTH DAKOTA","OHIO","OKLAHOMA","OREGON","MARYLAND","MASSACHUSETTS","MICHIGAN","MINNESOTA","MISSISSIPPI","MISSOURI","PENNSYLVANIA","RHODE ISLAND","SOUTH CAROLINA","SOUTH DAKOTA","TENNESSEE","TEXAS","UTAH","VERMONT","VIRGINIA","WASHINGTON","WEST VIRGINIA","WISCONSIN","WYOMING"]
    var validLetter = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    var word;
    var state;
    var answerArray= [];
    var wins = 0;
    var losses = 0;
    var guessesCount = 8;
    var lettersGuessed = [];
    var positions = [];
    var alreadyGuessed = -1;
    var gameRunning = false;
    
    document.onkeyup = function(event) {

        if(!gameRunning){
            startGame();
            document.getElementById("letters").innerHTML = "Letters Selected: " + lettersGuessed;
		}

        var keyword = String.fromCharCode(event.keyCode).toUpperCase();
        var isValidLetter = validLetter.indexOf(keyword);

        // if not a valid letter in alphabet don't consider it
        if (isValidLetter === -1) {
            return;
        }

        letterfound = state.indexOf(keyword);
        // console.log("letter found = " + letterfound);

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
                    document.getElementById("letters").innerHTML = "Letters Selected: " + lettersGuessed;
                }
            // decremant guess count every time a letter is pressed
                guessesCount--;
                document.getElementById("guesses").innerHTML = "Guesses Left: " + guessesCount;
            }

        if (guessesCount === 0) {
            document.getElementById("guesses").innerHTML = "Guesses Left: " + guessesCount;
            losses++;
            document.getElementById("losses").innerHTML = "Lost: "+ losses;
            resetGame();
            document.getElementById("letters").innerHTML = "Sorry!  The Answer is " + state + ". Try Again";
            startGame();
        }							
    }
   
        // fumctions

        // Function starts game by running through a loop and displaying underscores in place of letters for random state
        function startGame () {
    
            gameRunning = true;
            guessesCount = 8;
            document.getElementById("guesses").innerHTML = "Guesses Left: "+ guessesCount;
    
            // Chooses random state from array
            state = stateName[Math.floor(Math.random() * stateName.length)];
            //console.log("State = " + state)

            for (var i = 0; i < state.length; i++) {
                if (state[i] === " ") {
                    answerArray[i]= " ";
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
            //console.log("positions " + positions);
            for (i = 0 ; i < state.length; i++) {
                if (state[i] === keyword) {
                    if (positions[i] == "_") {
                        positions[i] = keyword;
                        lettersGuessed.push(keyword);
                        document.getElementById("random-state").innerHTML = positions.join(" ");
                        document.getElementById("letters").innerHTML = "Letters Selected: " + lettersGuessed ;
                    }
                     else {
                        document.getElementById("letters").innerHTML = "You Have Already Selected Letter " + keyword ;
                        guessesCount--;
                        document.getElementById("guesses").innerHTML = "Guesses Left: "+ guessesCount;
                        return;
                    }  
                }                 
            }
            positions = positions.join("");
                if (positions === state) {
                    wins++;
                    document.getElementById("wins").innerHTML = "Won: "+ wins;
                    resetGame();
                    document.getElementById("letters").innerHTML = "Congratulations!  You Guessed " + state;
                    startGame();
                } 
           }
    
        function resetGame() {
            lettersGuessed = [];
            positions = [];
            answerArray = [];
            document.getElementById("letters").innerHTML = "Letters Selected: " + lettersGuessed;
        }
    })
    