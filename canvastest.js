(function() {

window.onload = function() {

var canvas = document.getElementById('theCanvas');
/* var app = document.getElementById('app');
app.style.background = '#65CC4C'; */
var width = 432;
var height = 321;

canvas.width=width;
canvas.height=height;
var context = canvas.getContext('2d');

var xPosition = 0;
var yPosition = 0;
var xDown = true;
var yDown = true;
var radius = 30;
var objWidth = 50;
var objHeight = 50;
var speed = 1;
var wantCircle = true;

var backColor = "#85C2FF";
var objColor = "#7C78FF";

var drawScreen = function(){
  context.fillStyle = backColor;
  context.fillRect(0,0,width,height);
  
  context.fillStyle = objColor;
  
  if(wantCircle){
    objWidth = objHeight = 2*radius;
    
    context.beginPath();
    context.arc(xPosition+radius,yPosition+radius, radius, (Math.PI/180) * 0,   (Math.PI/180) * 360, false);
    context.strokeStyle = '#444';
    context.stroke();
    context.fill();
  }
  else{
    context.fillRect(xPosition,yPosition,objWidth,objHeight);
  }
  
  
  
  if(yPosition <= 0){
    yDown = true;
  }
  if(xPosition <= 0){
   xDown = true; 
  }
  
  if (yPosition < canvas.height - objHeight){
    if(yDown){
     yPosition += speed; 
    }
    else{
     yPosition -= speed; 
    }
  } else {
    yDown = false;
     yPosition -= speed; 
  }
  
  if (xPosition < canvas.width - objWidth){
    if(xDown){
     xPosition += speed; 
    }
    else{
     xPosition -= speed; 
    }
  } else {
    xDown = false;
    xPosition -= speed; 
  }
  
};

window.updateCanvas = function(){
  xPosition = 0;
  yPosition = 0;
  xDown = true;
  yDown = true;
  width = document.getElementById('canvasWidth').value;
  height = document.getElementById('canvasHeight').value;
  canvas.width=width;
  canvas.height=height;
}

window.updateObject = function(){
  objWidth = parseInt(document.getElementById('objectWidth').value,10);
  objHeight = parseInt(document.getElementById('objectHeight').value,10);
  radius = parseInt(document.getElementById('objectRadius').value,10);
}

window.faster = function(){
 speed++; 
}

window.slower = function(){
  if(speed > 1){
   speed--; 
  }
}

window.reverse = function(){
 xDown = !xDown;
  yDown = !yDown;
}

window.toggleShape = function(){
   wantCircle = !wantCircle; 
}

window.backgroundLtBl = function(){
  backColor = "#85C2FF";
}
window.backgroundDkBl = function(){
  backColor = "#7C78FF";
}
window.backgroundPink = function(){
  backColor = "#FFA59E";
}
window.backgroundLtGn = function(){
  backColor = "#65CC4C";
}
window.backgroundDkGn = function(){
  backColor = "#5FB24B";
}

window.objectLtBl = function(){
  objColor = "#85C2FF";
}
window.objectDkBl = function(){
  objColor = "#7C78FF";
}
window.objectPink = function(){
  objColor = "#FFA59E";
}
window.objectLtGn = function(){
  objColor = "#65CC4C";
}
window.objectDkGn = function(){
  objColor = "#5FB24B";
}

window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame    ||
              window.oRequestAnimationFrame      ||
              window.msRequestAnimationFrame     ||
              function( callback ){
                window.setTimeout(callback, 1000 / 60);
              };
    })();

(function animloop(){
      requestAnimFrame(animloop);
      drawScreen();
})();

};

}).call(this);
