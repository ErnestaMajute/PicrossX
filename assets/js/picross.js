$(document).ready( function() {
    $("td").click(function(e) {
        if (e.target.classList.contains("active")) {
            $(this).removeClass("active");
        } 
        else {
            $(this).addClass("active");
        }
    });
});

function areLightSquaresEmpty(){
    let lightSquaresLength = document.getElementsByClassName("light active").length;
    if (lightSquaresLength === 0) {
        return true;
    }
    else {
        return false;
    }
}

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