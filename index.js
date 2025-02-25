let inputDir = {
    x:0, y:0
}
let score = 0;
let  foodsound  = new Audio("food.mp3")
let  gameoversound  = new Audio("gameover.mp3")
let   movesound = new Audio("move.mp3")
let  musicsound  = new Audio("music.mp3")
let speed =10
let lastpainttime = 0
let snakearr = [
    {x:13,y:15}
]
food = {x:6,y:7}
//functions
function main(ctime){
window.requestAnimationFrame(main)
// console.log(ctime)
if((ctime - lastpainttime)/1000 < 1/speed){
    return;
}
lastpainttime = ctime;
gameengine()
}
function iscollide(snake){
    //if u bump into urself
    for (let i = 1; i < snakearr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y ){
            return true;
        }
        
    }
    //if u bump into wall
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0 ){
        return true
    }
}
function gameengine(){
    // part1
    if(iscollide(snakearr)){
        gameoversound.play()
        musicsound.pause()
        inputDir = {  x:0, y:0 }    
        alert("Game Over.Press any key to play again!")
        snakearr = [{x:13,y:15}]
        // musicsound.play()
        score = 0;
    }
    //if u have eaten the food
    if(snakearr[0].x===food.x && snakearr[0].y===food.y ){
        foodsound.play()
        score +=1;
        if(score>hiscoreval){
            hiscoreval=score
            localStorage.setItem("hiscore",JSON.stringify(hiscoreval))
            hiscorebox.innerHTML = "Highest Score:"+ hiscoreval
        }
        scorebox.innerHTML= "score:"+ score;
        snakearr.unshift({x:snakearr[0].x+inputDir.x , y:snakearr[0].y+inputDir.y})
        let a =1;
        let b = 18;
        food ={x: Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}
    }
    // moving the snake
    for (let i = snakearr.length-2; i >=0; i--) {
        // const element = array[i];
        snakearr[i+1]= {...snakearr[i]}
        
    }
    snakearr[0].x += inputDir.x
    snakearr[0].y += inputDir.y
    //part 2
    board.innerHTML = ""
    snakearr.forEach((e,index) => {
        snakeelement = document.createElement('div')
        snakeelement.style.gridRowStart = e.y
        snakeelement.style.gridColumnStart = e.x
        if (index===0){
            snakeelement.classList.add('head')
            
        }
        else{
        snakeelement.classList.add('snake')
    }
        board.appendChild(snakeelement)
        
    })
    foodelement = document.createElement('div')
    foodelement.style.gridRowStart = food.y
    foodelement.style.gridColumnStart = food.x
    foodelement.classList.add('food')
    board.appendChild(foodelement)

}

//logic
let hiscore = localStorage.getItem("hiscore");
if(hiscore ===null){
    hiscoreval = 0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscorebox.innerHTML = "Highest Score:"+ hiscore
}

window.requestAnimationFrame(main)
window.addEventListener('keydown',e=>{
    inputDir = {x:0, y:1}
    movesound.play()
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp")
            inputDir.x=0;
            inputDir.y=-1;
            break;
        case "ArrowDown":
            console.log("ArrowDown")
            inputDir.x=0;
            inputDir.y=1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft")
            inputDir.x=-1;
            inputDir.y=0;
            break;
        case "ArrowRight":
            console.log("ArrowRight")
            inputDir.x=1;
            inputDir.y=0;
            break;
    
        default:
            break;
    }
})