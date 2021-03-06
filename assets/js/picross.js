// totalSeconds holds value for timer
// modalDelay hold value, when winner modal should apear
// scorre holds value for score counter
var totalSeconds = 0;
const modalDelay = 200;
var score = 0;
/*
Checks if all light squares are empty and returns true if so
*/
function areLightSquaresEmpty(){
    let lightSquaresLength = document.getElementsByClassName("light active").length;
    if (lightSquaresLength === 0) {
        return true;
    }
    else {
        return false;
    }
}
/*
Checks if all dark squares holds active class and returns true or false
*/
function areDarkSquaresCorrect() {
    let activatedDarkSquaresLength = document.getElementsByClassName("dark active").length;
    let allDarkSquaresLength = document.getElementsByClassName("dark").length;
    if (activatedDarkSquaresLength !== allDarkSquaresLength) {
        return false;
    }
    else {
        return true;
    }
}
/*
Checks if all squares are correct, if so, stops timer, shows winners modal
*/
function checkUserWinningStatus() {
    if (areDarkSquaresCorrect() && areLightSquaresEmpty()) {
        // User pushed the correct squares, clear timer and show the winning score modal
        clearTimer();
        // A delay is added, so that last dark square would be filled, 
        //otherwise modal shows up, and last right square not filled
        //only after modal closed
        setTimeout(function() {
            $(document).ready(function(){
                $("#win").modal("show");
            });
        }, modalDelay);
    }
}
/*
Function counts time for player
*/
//Function's base from stackOverflow: more in README.md
function countTimer() {
    ++totalSeconds;
    var hour = Math.floor(totalSeconds /3600);
    var minute = Math.floor((totalSeconds - hour*3600)/60);
    var seconds = totalSeconds - (hour*3600 + minute*60);
    if(hour < 10)
        hour = "0"+hour;
    if(minute < 10)
        minute = "0"+minute;
    if(seconds < 10)
        seconds = "0"+seconds;

    //timerValue added to fit all variables
    let timerValue = `${hour}:${minute}:${seconds}`;

    document.getElementById("timer").innerHTML = timerValue;
    document.getElementById("lost-time").innerHTML = timerValue;
    document.getElementById("win-time").innerHTML = timerValue;
}
// variable timerVar holds timer value
var timerVar = setInterval(countTimer, 1000);
/*
Stops timer when function called
*/
function clearTimer() {
    clearInterval(timerVar);       
}
/*
function counts player's score
*/
$(document).ready(function() {
    $(".dark").click(function(e) {
        // If the user unselects a correct active td, then decrement the score, otherwise increment
        if (e.target.classList.contains("active")) {
            score -= 1;
        }
        else {
            score += 1;
        }
        // scores values set which shows up in html files
        document.getElementById("scores").innerHTML = "Score:" + score;
        document.getElementById("lost-score").innerHTML = "Score:" + score;
        document.getElementById("win-score").innerHTML = "Score:" + score;
    });
    // if player pushes give-up button timer stops
    $("#give-up").click(function () {
        clearTimer();
    });
    // class "active" added to or removed from squares
    $("td").click(function (e) {
        if (e.target.classList.contains("active")) {
            $(this).removeClass("active");
        } else {
            $(this).addClass("active");
        }
        // class added or removed, checks player's winning status
        checkUserWinningStatus();
    });
});
// userInformation variable converts data from a string to an object. Empty array to avoid null.
const userInformation = JSON.parse(localStorage.getItem("userInformation")) || [];
/*
Function converts data to a string and saves to local storage
*/
$("#saveResult").click(function (e) {

    const info = {
        name: "",
        score: "",
        time: ""

    };

    info.name = document.getElementById("userName").value;
    info.score = document.getElementById("win-score").innerHTML;
    info.time = document.getElementById("win-time").innerHTML;

    // info values pushed to userInformation variable
    userInformation.push(info);
    // Converts result to a string, then they can be saved in local storage
    localStorage.setItem("userInformation", JSON.stringify(userInformation));
});
/*
When leaderboard button pushed, function returns modal with players highests scores in table rows
*/
$("#hs-board").click(function () {
    // demo variable will display table containing player's name, score and time in leaderboard modal
    // highScore variable takes data from local storage and converts to an object
    const demo = document.getElementById("demo");
    const highScore = JSON.parse(localStorage.getItem("userInformation")) || [];
    demo.innerHTML = highScore

        // function returns each player's saved score, time and name in table rows
        .map(function (info) {
            return `<tr>
                    <th>${info.name}</th>
                    <td>${info.score}</td>
                    <td>${info.time}</td>
                </tr>`;
        });
});