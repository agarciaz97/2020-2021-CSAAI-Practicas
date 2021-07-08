
//-- elemnto pantalla de la calculadora
display = document.getElementById("display")
//-- elemento raiz cuadrada
raiz = document.getElementById("raiz")
//-- elemento igual
igual = document.getElementById("igual")
//-- elemento borrar último y borrarlo todo
borrartodo = document.getElementById("borratodo")
borrar = document.getElementById("borrar")

//-- Estados de la calculadora
const ESTADO = {
    INIT: 0,
    OP1: 1,
    OPERATION: 2,
    OP2: 3,
} 
 
 //-- Variable de estado de la calculadora
 //-- Al comenzar estamos en el estado incial
 let estado = ESTADO.INIT;   

//-- Función de retrollamada de los digitos
function digito(ev)
{
    if (estado == ESTADO.INIT) {

        display.innerHTML = ev.target.value;
        estado = ESTADO.OP1;

    } else if (estado == ESTADO.OP1){

        display.innerHTML += ev.target.value;

    }else if (estado == ESTADO.OPERATION){

        display.innerHTML += ev.target.value;
        estado = ESTADO.OP2;

    }else if (estado == ESTADO.OP2){

        display.innerHTML += ev.target.value;
    }
}

//-- función de retrollamada de los operadores
function operacion(ev)
{
    if(estado == ESTADO.OP1){
        display.innerHTML += ev.target.value;
        estado = ESTADO.OPERATION;
    }else{
        console.log("Error, aquí no se puede añadir una operación");
    }
}

//-- Obtener una colección con todos los elementos
//-- de la clase digito
digitos = document.getElementsByClassName("digito")

//-- Establecer la misma función de retrollamada
//-- para todos los botones de tipo dígito
for (let boton of digitos) {

    boton.onclick = digito;
}

//-- Obtener todos los elementos de la clase operador
operadores = document.getElementsByClassName("operador")

for (let operador of operadores) {

    operador.onclick = operacion;
}
 
//-- hacer la raíza cuadrada
raiz.onclick = () => {
    if(estado == ESTADO.OP1){
    display.innerHTML = Math.sqrt(display.innerHTML);
    estado = ESTADO.OP1;
    }else{
        console.log("error");
    }
}

//-- Evaluar la expresion
igual.onclick = () => {
    if(estado == ESTADO.OP2){
        display.innerHTML = eval(display.innerHTML);
        estado = ESTADO.OP1;
    }else{
        console.log("No valido");
    }
}

//-- borrar lo último escrito
borrar.onclick = () => {
    if (display.innerHTML != 1){
        display.innerHTML = display.innerHTML.slice(0, -1);
    }else{
        display.innerHTML = 0;
        estado = ESTADO.INIT;
    }
}

//-- Poner a cero la expresion
//-- Y volver al estado inicial
borrartodo.onclick = () => {
  display.innerHTML = "0";
  estado = ESTADO.INIT;
}