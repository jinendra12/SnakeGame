let inputDir = {x:0,y:0};
const foodSound = new Audio('food.mp3');
const gameOverSound = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
let speed = 10;
let hiScore = 0;
let score = 0;
let lastPaintTime = 0; 
let snakeArr = [
    {x:7, y:7}
];

food = {x:13, y:10};
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/ 1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake){
    for(let i = 1;i < snakeArr.length;i++){
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
            return true;
        }
    }
        if(snake[0].x >= 35 || snake[0].x <= 0 || snake[0].y >= 20 || snake[0].y <= 0){
            return true;
        }
    return false;
}


function gameEngine(){
    // update snake
     if(isCollide(snakeArr)){
         gameOverSound.play();
         inputDir = {x:0,y:0};
         alert("GAME OVER!!! press any key to play again");
         snakeArr = [{x:7,y:7}];
         speed = 10;
         score = 0;
         currentScore.innerHTML = "Current Score : " + score;
     }

    
     if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score += 1;
        speed += 0.1;
        if(score > hiScore){
            hiScore = score;
            highScore.innerHTML = "High Score : " + hiScore;
        }
        currentScore.innerHTML = "Current Score : " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a1 = 2;
        let b1 = 32;
        let a2 = 2;
        let b2 = 18;
         food = {x: Math.round(a1 + (b1 -a1)*Math.random()), y: Math.round(a2 +(b2 - a2)*Math.random())}
     }

     //moving
     for(let i = snakeArr.length - 2;i>=0;i--){
         snakeArr[i+1] = {...snakeArr[i]}
     }

     snakeArr[0].x += inputDir.x;
     snakeArr[0].y += inputDir.y;

    // display snake
    board.innerHTML = "";
    snakeArr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        
        if(index == 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

        foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);

}




window.requestAnimationFrame(main);
window.addEventListener('keydown',e => {
    inputDir = {x:0,y:1}
    moveSound.play();
    if(e.key === "ArrowUp" && inputDir.y != -1){
        inputDir.x = 0 ;
        inputDir.y = -1 ;
    }else if(e.key === "ArrowDown"){
        inputDir.x = 0 ;
        inputDir.y = 1 ;
    }else if(e.key === "ArrowRight"){
        inputDir.x = 1;
        inputDir.y = 0;
    }else if(e.key === "ArrowLeft"){
        inputDir.x = -1;
        inputDir.y = 0;
    }

    // switch(e.key){

    //     case "ArrowUp":
    //         inputDir.x = 0 ;
    //         inputDir.y = -1 ;
    //         break;

    //     case "ArrowDown":
    //         inputDir.x = 0 ;
    //         inputDir.y = 1 ;
    //         break;

    //     case "ArrowRight":
    //         inputDir.x = 1;
    //         inputDir.y = 0;
    //         break;
  
    //     case "ArrowLeft":
    //         inputDir.x = -1;
    //         inputDir.y = 0;
    //         break;
    // }
});