//-- Obtener elementos del DOM
const canvas = document.getElementById('canvas');
const img = document.getElementById('starwars');
const ctx = canvas.getContext('2d');

//-- Deslizadores
const deslizadorR = document.getElementById('deslizador1');
const deslizadorV = document.getElementById('deslizador2');
const deslizadorA = document.getElementById('deslizador3');

//-- Valor de los deslizadores
const valordesliR = document.getElementById('range_value1');
const valordesliV = document.getElementById('range_value2');
const valordesliA = document.getElementById('range_value3');

// Botones filtros
const gris = document.getElementById("gris");
const color = document.getElementById("color");
const negativo = document.getElementById("negativo");

//-- Función de retrollamada de imagen cargada
//-- La imagen no se carga instantaneamente, sino que
//-- lleva un tiempo. Sólo podemos acceder a ella una vez
//-- que esté totalmente cargada
img.onload = function () {

  //-- Se establece como tamaño del canvas el mismo
  //-- que el de la imagen original
  canvas.width = img.width;
  canvas.height = img.height;
  
  //-- Situar la imagen original en el canvas
  //-- No se han hecho manipulaciones todavia
  ctx.drawImage(img, 0,0);
  console.log("Imagen lista...");
};

 
//-- Funcion de retrollamada del deslizador
deslizadorR.oninput = () => {
  //-- Mostrar el nuevo valor del deslizador
  valordesliR.innerHTML = deslizadorR.value;
  
  //-- Situar la imagen original en el canvas
  //-- No se han hecho manipulaciones todavia
  ctx.drawImage(img, 0,0);
  
  //-- Obtener la imagen del canvas en pixeles
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  
  //-- Obtener el array con todos los píxeles
  let data = imgData.data
  
  //-- Obtener el umbral de rojo del desliador
  umbralR = deslizadorR.value
  
  //-- Filtrar la imagen según el nuevo umbral
  for (let i = 0; i < data.length; i+=4){
    if (data[i] > umbralR)
      data[i] = umbralR;  
  }
  
  //-- Poner la imagen modificada en el canvas
  ctx.putImageData(imgData, 0, 0);
}

//-- Funcion de retrollamada del deslizador
deslizadorV.oninput = () => {

  //-- Mostrar el nuevo valor del deslizador
  valordesliV.innerHTML = deslizadorV.value;

  //-- Situar la imagen original en el canvas
  //-- No se han hecho manipulaciones todavia
  ctx.drawImage(img, 0,0);

  //-- Obtener la imagen del canvas en pixeles
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  //-- Obtener el array con todos los píxeles
  let data = imgData.data

  //-- Obtener el umbral de rojo del desliador
  umbralV = deslizadorV.value

  //-- Filtrar la imagen según el nuevo umbral
  for (let i = 0; i < data.length; i+=4) {
    if (data[i + 1]  > umbralV)
      data[i + 1] = umbralV;
  }

  //-- Poner la imagen modificada en el canvas
  ctx.putImageData(imgData, 0, 0);
}

//-- Funcion de retrollamada del deslizador
deslizadorA.oninput = () => {

  //-- Mostrar el nuevo valor del deslizador
  valordesliA.innerHTML = deslizadorA.value;

  //-- Situar la imagen original en el canvas
  //-- No se han hecho manipulaciones todavia
  ctx.drawImage(img, 0,0);

  //-- Obtener la imagen del canvas en pixeles
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  //-- Obtener el array con todos los píxeles
  let data = imgData.data

  //-- Obtener el umbral de rojo del desliador
  umbralA = deslizadorA.value

  //-- Filtrar la imagen según el nuevo umbral
  for (let i = 0; i < data.length; i+=4) {
    if (data[i + 2] > umbralA)
      data[i + 2] = umbralA;
  }

  //-- Poner la imagen modificada en el canvas
  ctx.putImageData(imgData, 0, 0);
}

//-- FILTRO ESCALA DE GRISES
gris.onclick = () => {

  //-- Situar la imagen original en el canvas
  //-- No se han hecho manipulaciones todavia
  ctx.drawImage(img, 0,0);

  //-- Obtener la imagen del canvas en pixeles
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  //-- Obtener el array con todos los píxeles
  let data = imgData.data

  //-- Filtrar la imagen según el nuevo umbral
  for (let i = 0; i < data.length; i += 4) {
    var escalagris = 0.33 * data[i] + 0.5 * data [i +1] + 0.15 * data [i + 2];
    var rojo = data[i];
    var verde = data[i+1];
    var azul = data[i+2];
    var egrises = (3 * rojo + 4 * verde + azul)/8;
    egrises = data[i] = data[i+1] = data[i+2];
  }

  //-- Poner la imagen modificada en el canvas
  ctx.putImageData(imgData, 0, 0);
}

//-- FILTRO NEGATIVO
negativo.onclick = () => {

  //-- Situar la imagen original en el canvas
  //-- No se han hecho manipulaciones todavia
  ctx.drawImage(img, 0,0);

  //-- Obtener la imagen del canvas en pixeles
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  //-- Obtener el array con todos los píxeles
  let data = imgData.data

  //-- Filtrar la imagen según el nuevo umbral
  for ( var i = 0; i < data.length; i++ ) {
        var rojo = data[ i * 4 ];
        var verde = data[ i * 4 + 1 ];
        var azul = data[ i * 4 + 2 ];

        data[ i * 4 ] = 255 - rojo;
        data[ i * 4 + 1 ] = 255 - verde;
        data[ i * 4 + 2 ] = 255 - azul;
    }

  //-- Poner la imagen modificada en el canvas
  ctx.putImageData(imgData, 0, 0);
}

 console.log("Fin...");