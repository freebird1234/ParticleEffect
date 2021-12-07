const canvas= document.getElementById('canvas1');
const ctx=canvas.getContext('2d');

//console.log(ctx);


window.addEventListener('resize' , function(){
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
    
});

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
let particlesArray=[];
let hsl=0;
const mouse = {
    x: undefined,
    y: undefined,
}
    
canvas.addEventListener('click' , function(event){
        mouse.x=event.x;
        mouse.y=event.y;
        if(particlesArray.length<100)
        for(let i=0;i<30;i++){
            particlesArray.push(new Particle());
        }
       
    });

canvas.addEventListener('mousemove' ,function(event){
    mouse.x=event.x;
    mouse.y=event.y;
    if(particlesArray.length<100)
    for(let i=0;i<10;i++){
        particlesArray.push(new Particle());
    }
   
});


class Particle{

 constructor(){
     
    this.x=Math.random()*canvas.width;
    this.y=Math.random()*canvas.height;
    //this.x=Math.random()*canvas.width;
     //this.y=Math.random()*canvas.height;
     this.size=Math.random()*15+5;
     this.speedX=Math.random()*3-1.2;
     this.sppedY=Math.random()*3-1.2;
 }

 update(){
     this.x+=this.speedX;
     this.y+=this.sppedY;
     this.size-=0.1;
 }

 draw(){
     ctx.fillStyle='hsl(' + hsl+',100%,50%)' ;
     ctx.strokeStyle='red';
     ctx.beginPath();
     ctx.arc(this.x,this.y,this.size,0,2*Math.PI);
     ctx.fill();
 }



}

function init(){

    for(let i=0;i<100;i++){
        particlesArray.push(new Particle());
    }
}


function drawCircle(){

ctx.strokeStyle='red'
ctx.fillStyle ='white';
ctx.linewidth=5;
ctx.beginPath();
ctx.arc(mouse.x,mouse.y,50,0,2*Math.PI);
ctx.stroke();
//drawCircle(x+50,y+50,count+1);
//ctx.fill();
};

function drawConstellation(particle,i){

    for(let j=i+1;j<particlesArray.length;j++){

        let dx= particle.x - particlesArray[j].x;
        let dy= particle.y- particlesArray[j].y;

        let distance= Math.sqrt(dx*dx + dy*dy);
        if(distance < 70){
            ctx.strokeStyle=('white');
            ctx.linewidth = 3;
            ctx.beginPath();
            ctx.moveTo(particle.x , particle.y);
            ctx.lineTo(particlesArray[j].x , particlesArray[j].y);
            ctx.stroke();
        }
    }


}

function handleParticles(){


    for(let i=0;i<particlesArray.length;i++){
        particlesArray[i].update();
        particlesArray[i].draw();

        drawConstellation(particlesArray[i],i);

        if(particlesArray[i].size <1){
            particlesArray.splice(i,1);
            i--;
        }   
    }
}


function animate(){ 
    //ctx.clearRect(0,0,canvas.width,canvas.height);
    //drawCircle();
    ctx.fillStyle= ('black');
    ctx.fillRect(0,0,canvas.width,canvas.height);
    hsl+=6;
    handleParticles();
    requestAnimationFrame(animate);
}
init();
animate();