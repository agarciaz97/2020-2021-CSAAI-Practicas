
const canvas = document.getElementById("canvas");

//-- Definir el tamaño del canvas
canvas.width = 480;
canvas.height = 320;

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
var brickRowCount = 5;
var brickColumnCount = 3;
var brickWidth = 80;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

//-- Puntuación
var score = 0;

//-- Vidas
var lives = 3;

//-- Cada ladrillo se va a representar con un objeto con las posiciones "x" e "y"
var bricks = [];
for(c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
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

//-- Función detectar colisiones
function collisionDetection() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    vely = -vely;
                    b.status = 0;
                    score++;
                    if(score == brickRowCount*brickColumnCount) {
                        alert("YOU WIN, CONGRATS!");
                        document.location.reload();
                    }
                }
            }
        }
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

//-- Función para dibujar ladrillos
function drawBricks() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
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
}

//-- Función para poner la puntuación en el canvas
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+score, 8, 20);
}

//-- Función para poner las vidas en el camvas
function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
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
    //-- Físicas con la raqueta
    }else if(y > canvas.height - 10){
        if(x > paddleX && x < paddleX + paddleWidth) {
            vely = -vely;
        //-- en caso de quedarte sin vidas has perdido
        }else{
            lives--;
            if(!lives) {
                alert("GAME OVER");
                document.location.reload()
            }
            //-- se resta una vida y se comienza a sacar con la velocidad inicial
            else {
                x = canvas.width/2;
                y = canvas.height-30;
                velx = 2;
                vely = -2;
                paddleX = (canvas.width-paddleWidth)/2;
            }
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
    //-- todos los elementos en el canvas
    drawBall();
    drawPaddle();
    drawBricks();
    drawScore();
    drawLives();
    collisionDetection();


    //-- Volver a ejecutar drawball cuando toque
    requestAnimationFrame(draw);
}
draw();
