let playing = false;
let timeremaining;
let score = 0;
let x;
let y;
let z;
let wrongsTry = 0;
var wan = 1;


document.getElementById('startReset').ondblclick = function() {
    if (playing == true) {
        // if we are playing
        location.reload()
    } else {
        // if we are not playing 
        playing = true;
        document.getElementById('startReset').innerHTML = "Reset Game";
        score = 0;
        // score box valuee
        timeremaining = 30;
        countdown();
        generateQA();
    }

}

function countdown() {
    let countdown = setInterval(function() {
        // if the time value is greater than zero
        if (timeremaining > 0) {
            timeremaining--;
            document.getElementById('time').innerHTML = timeremaining;
        } else {
            //if time value is zero
            stopcountdown();
            document.getElementById("question").style = "display:none";
            document.getElementById("options").style = "display:none";
            document.getElementById("alert").classList.add("showAlert");
            document.getElementById("startReset").classList.add("lessMargin");
            document.getElementById('alert').innerHTML = " Game Over - Your score is " + score +" ";

            switch (wrongsTry) {
                case 0:
                    document.getElementById('mistakesBox').style = "background-color:#fff";
                    // document.getElementById("mistakesBox").style = "display:none";
                    document.getElementById("wrongAnswer1").style = "display:none";
                    document.getElementById("wrongAnswer2").style = "display:none";
                    document.getElementById("wrongAnswer3").style = "display:none";
                    break;
                case 1:
                    document.getElementById("mistakesBox").style = "display:block";
                    document.getElementById("wrongAnswer2").style = "display:none";
                    document.getElementById("wrongAnswer3").style = "display:none";
                    break;
                case 2:
                    document.getElementById("mistakesBox").style = "display:block";
                    document.getElementById("wrongAnswer3").style = "display:none";
                    break;
                default:
                    break;
            }

            setTimeout(reStartGame, 7000);
            function reStartGame() {
                location.reload()
            }
        }
    }, 1000)
}

function stopcountdown() {
    clearInterval(countdown);
}

function generateQA() {
    // to generate random number named x
    x = Math.round(1 + Math.random() * 9)
        // to genrate random number named y
    y = Math.round(1 + Math.random() * 9)
        //product of x and y
    z = x * y
    document.getElementById("question").innerHTML = x + '&times;' + y;
    //to position z(answer) in its respective answer
    choiceRandom = Math.round(1 + Math.random() * 3)
    document.getElementById('option' + choiceRandom).innerHTML = z;
    let wronganwsers = [z]

    for (let i = 1; i < 5; i++) {
        //to generate random wrong answers
        do {
            b = Math.round(1 + Math.random() * 9)
            c = Math.round(1 + Math.random() * 9)
            z1 = b * c;
        }
        while (wronganwsers.indexOf(z1) > -1);
        wronganwsers.push(z1);
        if (i != choiceRandom) {
            document.getElementById('option' + i).innerHTML = z1;
        }
    }


    for (let b = 1; b < 5; b++) {
        document.getElementById("option" + b).onclick = function() {
            var getValue = document.getElementById("option" + b).innerText;

            if (getValue == z) {
                score++;
                document.getElementById('score').innerHTML = score;
                document.getElementById("score").style = "background-color:#D4FCC5;color:#3EC70B;border: 2px solid #3EC70B";

                setTimeout(backToColor, 500);

                function backToColor() {
                    document.getElementById("score").style = "background-color:#FBF8F1";
                }

            } else {
                var myWrongAnswer = x * y;

                console.log(myWrongAnswer);
                document.getElementById('wrongAnswer' + wan++).innerHTML = x + ' &times; ' + y + " = " + myWrongAnswer;

                wrongsTry++;
                document.getElementById('mistake').innerHTML = wrongsTry;
                document.getElementById("mistake").style = "background-color:#F39191;color:#E72929;border: 2px solid #E72929";
                setTimeout(backToColor, 500);

                function backToColor() {
                    document.getElementById("mistake").style = "background-color:#FBF8F1";
                }
            }
            if (wrongsTry < 3) {
                generateQA();
            } else {
                document.getElementById("question").style = "display:none";
                document.getElementById("options").style = "display:none";
                document.getElementById("alert").classList.add("showAlert");
                document.getElementById("startReset").classList.add("lessMargin");
                document.getElementById('alert').innerHTML = " Game Over - Your score is " + score +" ";
                document.getElementById('mistake').innerHTML = 3;
                document.getElementById("mistakesBox").style = "display:block";
                setTimeout(reStartGame, 14000);
                function reStartGame() {
                    location.reload()
                }
            }
        }
    }
}