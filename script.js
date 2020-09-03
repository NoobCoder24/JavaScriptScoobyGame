score = 0;                                                      /*Initialize score at start*/
cross= true;

audiojump = new Audio('jump_super.wav');                            //on jump key down press sound
audiogo = new Audio('gameover.wav');                                 //game over sound   
audio = new Audio('techno.mp3');                                    //intro playing sounds
setTimeout(() => {
    audio.play()
}, 1000);
document.onkeydown=function(e){                                 /*When down key is pressed*/
    console.log("Key code is:",e.keyCode)
    if(e.keyCode==40){                                  
        scoob = document.querySelector('.scoob');
        scoob.classList.add('animateScoob');
        audiojump.play();
        setTimeout(()=>{
            scoob.classList.remove('animateScoob')
        },700);
    }
    if(e.keyCode==39){
        scoob = document.querySelector('.scoob');
        scoobX = parseInt(window.getComputedStyle(scoob,null).getPropertyValue('left'));        /*left movement*/
        scoob.style.left= scoobX + 212 +"px";
    }
    if(e.keyCode==37){
        scoob = document.querySelector('.scoob');
        scoobX = parseInt(window.getComputedStyle(scoob,null).getPropertyValue('left'));        /*Right Movement*/
        scoob.style.left= (scoobX - 112) +"px";
    }

    if(e.keyCode==32)
    {
        window.location.reload();
    }
    
}



setInterval(()=>{
    scoob = document.querySelector('.scoob');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstaclepump');

    sx = parseInt(window.getComputedStyle(scoob,null).getPropertyValue('left'));  /*parsing int value */
    sy = parseInt(window.getComputedStyle(scoob,null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(obstacle,null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle,null).getPropertyValue('top'));

    offsetX = Math.abs(sx-ox);
    offsetY = Math.abs(sy-oy);
    //console.log(offsetX,offsetY)
    if(offsetX< 73 && offsetY<164)
    {
       gameOver.innerHTML = 'Game Over !!';
        obstacle.classList.remove('obstaclepp')
        audiogo.play();                                             //on game over sound
        setTimeout(() => {
            audiogo.pause();
            audio.pause();
        }, 1000);
    }
    else if(offsetX< 145 && cross ){
        score+= 1;
        updateScore(score);
        cross= false;
        setTimeout(() => {
            cross= true;
        },1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle,null).getPropertyValue('animation-duration'));     //convert into float i.e.decimal values 0.23, 34.221 etc

            newDur = aniDur-0.1;                                        //animation speed of pumpkin insreases as newDur as game goes on
            obstacle.style.animationDuration = newDur + 's';    
            //console.log('new duration',newDur);
        }, 500);
        
    }
    },100);

/*for score countdown */
function updateScore(score){
    scoreCont.innerHTML= "Your score : " + score
}