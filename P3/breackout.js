
const canvas = document.getElementById("canvas");

//-- Definir el tamaño del canvas
canvas.width = 680;
canvas.height = 520;

const ctx = canvas.getContext("2d");

//-- Coordenadas de la bola
var x = canvas.width/2;
var y = canvas.height-30;

//-- velocidad de la bola
var velx = 2;
var vely = -2;

//-- Coordenadas de la raqueta
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;

//-- Variables para saber si se han pulsado las teclas
var rightPressed = false;
var leftPressed = false;

//-- Características ladrillos
var brickRowCount = 3;
var brickColumnCount = 7;
var brickWidth = 80;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

//-- Cada ladrillo se va a representar con un objeto con las posiciones "x" e "y"
var bricks = [];
for(c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0 };
    }
}

//-- Escuchadores de eventos para saber cuando se pulsan las teclas
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

//-- Cuando se pulsen las teclas izquierda o derecha
//-- se ejecutará esta función
function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}

//-- Cuando se deje de pulsar la tecla se ejecutará esta función
function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}

//-- Función para dibujar la bola
function drawBall()
{
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

//-- Función para dibujar la raqueta
function drawPaddle()
{
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

//-- Función dibujar ladrillos
function drawBricks() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
            var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }
    }
}

//-- Función para animar la bola y la raqueta
function draw() 
{
    //-- Rebotes en los límites del canvas
    if (x < 10 || x >= (canvas.width - 10) ) {
        velx = -velx;
    }

    if (y <= 10){
        vely = -vely;
    }else if(y > canvas.height - 10){
        if(x > paddleX && x < paddleX + paddleWidth) {
            vely = -vely;
        }else{
            alert("GAME OVER");
            document.location.reload();
        }
    }

    //-- La raqueta se mueve en los límites del canvas
    if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 5;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 5;
    }

    //-- Actualizar la posición bola
    x += velx;
    y += vely;

    //-- Borrar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //-- LLamar a las funciones para dibujar 
    //-- la raqueta y la bola
    drawBall();
    drawPaddle();
    drawBricks();


    //-- Volver a ejecutar drawball cuando toque
    requestAnimationFrame(draw);
}
draw();
