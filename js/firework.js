var canvas= document.getElementById('canvas');
var ctx=canvas.getContext('2d');
var fireworks=[];
var animateId;

var text="平平小天使~~~，从看到你的那一刻起，我的心跳就告诉我你是我今生等待的人，是你给了我勇气和动力，我会用一生的努力来呵护这份心动的，我爱你！";
function fireWork(ftext) {
    /*烟花属性*/
    this.particleCount=Math.random()*20+140;              //爆炸后的粒子数
    this.particleCountArray=[];                         //爆炸后的粒子对象
    this.isFire=true;
    this.isBoom=false;
    this.text=ftext;
    this.fireWorkR=2;                      //烟花半径大小
    this.angle=(Math.random()*0.25+0.333)*Math.PI; //随机方向 45-135度之间
    this.flyTime=1.95 ;                     //飞行时间
    this.G=0.15;                            //重力加速度
    this.posX=canvas.offsetWidth/2;
    this.posY=canvas.offsetHeight-this.fireWorkR*6;     //初始坐标
    this.firstSpeed=Math.random()*3+12;                //初始速度
    this.speedAxis={
        x:this.firstSpeed*Math.cos(this.angle),
        y:this.firstSpeed*Math.sin(this.angle)
    };

    this.update=function () {        //更新数据
        this.speedAxis.y=this.speedAxis.y-this.G;
        if(!this.isBoom){
            this.posX+=this.speedAxis.x;
            this.posY-=this.speedAxis.y;
        }

     //   console.log("posX:",this.posX,"posY",this.posY);
        //this.speedAxis.y-=this.G;
    };
    this.fireBoom=function () {         //烟花爆炸


        this.isBoom=true;
        this.fireWorkR=20;
        for(var p = 0;p<this.particleCount;p++){
            this.particleCountArray.push(new particle(this));
        }

    };
    this.draw=function () {         //画出烟花
        var obj=this;
     //   ctx.clearRect(0,0,canvas.offsetWidth,canvas.offsetHeight);
        ctx.beginPath();

        ctx.arc(this.posX,this.posY,this.fireWorkR,0,2*Math.PI,true);
        this.gradint(this.fireWorkR*5,"white");
        ctx.fillStyle="white";
        ctx.fill();
        if(this.isFire){
            setTimeout(function(){obj.fireBoom()},this.flyTime*1000);
        }
        this.isFire = false;
      // this.EllipseTwo(this.posX,this.posY,5*this.fireWorkR,this.fireWorkR); //画椭圆


    };

    this.EllipseTwo=function ( x, y, a, b) {  //椭圆
        var r = (a > b) ? a : b;
        var ratioX = a / r;
        var ratioY = b / r;
        var gradint = ctx.createLinearGradient(x / ratioY,y / ratioX,x / ratioY,y / ratioX+r);
        gradint.addColorStop(0,"white");
        gradint.addColorStop(1,"orange");
        ctx.scale(ratioY, ratioX);
        ctx.beginPath();
        ctx.arc(x / ratioY, y / ratioX, r, 0, Math.PI, false);
        ctx.fillStyle=gradint;
        ctx.fill();
    };

    this.gradint=function (num,color) {  //外发光
        ctx.shadowBlur=num;
        ctx.shadowColor=color;
    };

    this.drawText=function () {
        /*画字*/
        ctx.beginPath();
        ctx.font=" 20px Arial";
        ctx.textAlign="center";
        this.gradint(50,"#4791ff");
        ctx.fillStyle="white";
        ctx.fillText(this.text,this.posX,this.posY);
       // debugger;

    }

   
}

function particle(firwork) {
    /*烟花爆炸后的粒子属性*/
    this.Color='#'+Math.floor(Math.random()*0xffffff).toString(16);
    this.ParticleR=Math.random()*4+1;   //粒子半径
    this.G=0.04;
    this.DispearTime=3;                 //消失时间
    this.smallerSpeed=0.01;                //缩小的速度
    this.PosX=Math.random()*2*firwork.fireWorkR+firwork.posX-firwork.fireWorkR;  //X坐标
    this.PosY=Math.random()*2*firwork.fireWorkR+firwork.posY-firwork.fireWorkR;  //Y坐标`
    this.FirstSpeed=Math.random()*4+1;                     //初始速度
    this.Angle=(Math.random()*2)*Math.PI; //随机方向 0-360度之间
    this.SpeedAxis={
        x:this.FirstSpeed*Math.cos(this.Angle),
        y:this.FirstSpeed*Math.sin(this.Angle)
    };

    this.update=function () {
            this.SpeedAxis.y-=this.G;
            this.PosX+=this.SpeedAxis.x;
            this.PosY-=this.SpeedAxis.y;
            this.ParticleR=this.ParticleR-(this.DispearTime*this.smallerSpeed);
            if(this.ParticleR<0){
               //销毁粒子
                this.ParticleR=0;

            }

    };

    this.draw=function () {

            var obj=this;
          //  ctx.clearRect(0,0,canvas.offsetWidth,canvas.offsetHeight);
            ctx.beginPath();


            ctx.arc(this.PosX,this.PosY,this.ParticleR,0,2*Math.PI,true);
            this.gradint(this.ParticleR*5,"white");
            ctx.fillStyle="white";
            ctx.fill();
           /* if(this.IsBoom){
                setTimeout(function(){obj.ParticleR=0},this.DispearTime*1000);
            }*/



    };

    this.gradint=function (num,color) {  //外发光
        ctx.shadowBlur=num;
        ctx.shadowColor=color;
    };



}

function drawText(text,x,y,color) {

    debugger;
}

function animate(){
    ctx.clearRect(0,0,canvas.offsetWidth,canvas.offsetHeight);

    //销毁所有已消失的烟花
    if(fireworks.length>=5){
        fireworks=fireworks.slice(1);
    }

    for(var i=0;i<fireworks.length;i++){
        if(!fireworks[i].isBoom){
            fireworks[i].update();
            fireworks[i].draw();
        }else{
            fireworks[i].drawText();
           for(var j=0;j<fireworks[i].particleCountArray.length;j++){
               if( fireworks[i].particleCountArray[j].ParticleR !=0){
                   fireworks[i].particleCountArray[j].update();
                   fireworks[i].particleCountArray[j].draw();
               }


           }
        }
    }
    animateId= requestAnimationFrame(animate);
}
function d(arr) {
    for(var j=0;j<arr.length;j++){
        if(arr[j].ParticleR >0){
            return false;
        }
    }

    return true;
}
window.onload=function () {
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
    var time=Math.random()*1000+2000;  //烟花发射间隔时间
    var index=0;
   setInterval(function () {
       if(index>=text.split('，').length){
           index=0;
       }
        fireworks.push(new fireWork(text.split('，')[index]));
        var audio="<audio src='music/fire.mp3' autoplay></audio>"
        $("#audio").append(audio);

      /*$('audio').each(function () {

         // console.log($(this)[0].id);
      });*/
      $('audio').bind('play',function () {
          var obj=$(this)[0];
          if(obj.id !="mian"){
              obj.volume=0;
          }
           setTimeout(function () {
               obj.volume=0.8;
           },1900)
       });
       $('audio').bind('ended',function () {
          $(this).remove();
       });
       index++;
    },time);
    //fireworks.push(new fireWork());
    animate();

};
