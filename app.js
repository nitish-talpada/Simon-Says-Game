let gameSeq=[];
let userSeq=[];
let highestScore = 0;

let btns = ["yellow","red","purple","green"]; 

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("touchstart",function(){
    if(!started){
        console.log("game is started");
        started = true;

        levelUp();
    }
});

document.addEventListener("keypress",function(){
    if(!started){
        console.log("game is started");
        started = true;

        levelUp();
    }
});

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(function(){
        btn.classList.remove("userFlash");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random()*4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    // console.log(randIdx);
    // console.log(randColor);
    // console.log(randBtn);
    //random btn choose
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}



function checkAns(idx){
    if(userSeq[idx]==gameSeq[idx]){
        if(userSeq.length==gameSeq.length){
            setTimeout(levelUp, 1000);
        }
    }else{
        let score = level-1;
        if(score<0) score = 0;
        if (score>highestScore) {
            h2.innerHTML = `Game Over: Congratulations! New Highest Score: <b>${score}</b> <br> Press any key to start`;
            highestScore = score;
        }else{
            h2.innerHTML = `Game Over: Your Score: <b>${score}</b> <br> Highest Score: ${highestScore} <br> Press any key to start`;
        }
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "#1E1E2D" ;
        },150);
        reset();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");

for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}