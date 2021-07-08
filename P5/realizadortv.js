//----- Obtener elemento de video y configurarlo
let directo = document.getElementById("directo");
const video1 = document.getElementById("video1");
const video2 = document.getElementById("video2");
const video3 = document.getElementById("video3");
const btn_video1 = document.getElementById("btn_video1");
const btn_video2 = document.getElementById("btn_video2");
const btn_video3 = document.getElementById("btn_video3");
const btn_test = document.getElementById("btn_test");
const btn_src_on = document.getElementById("btn_src_on");
const btn_src_off = document.getElementById("btn_src_off");


//-- Establecer las dimensiones de los vídeos
directo.width=420;
directo.height=200;
video1.width=200;  
video1.height=100;
video2.widht=200;
video2.height=100;
video3.widht=200;
video3.height=100;

//-- Imagen de Test usada
const TEST_IMAGE_URL = "emipruebas.jpg";
const OFF_IMAGE_URL = "apagado.jpg"; 

//-- Imagen estática a mostrar cuando el video no
//-- ha arrancado
directo.poster = TEST_IMAGE_URL;
video1.poster = TEST_IMAGE_URL;
video2.poster = TEST_IMAGE_URL;
video3.poster = TEST_IMAGE_URL;

//-- Boton de FUENTES-ON
btn_src_on.onclick = () => {
 
  //-- Establecer la fuente de las tres cámaras
  video1.src="https://gsyc.urjc.es/jmplaza/csaai/realizador-fuente1.mp4";
  video2.src="https://gsyc.urjc.es/jmplaza/csaai/realizador-fuente2.mp4";
  video3.src="https://gsyc.urjc.es/jmplaza/csaai/realizador-fuente3.mp4";

  //-- Reprodeucimos un vídeo, desde el comienzo
  video1.currentTime = 0;
  video1.play();
  video2.currenTime = 0;
  video2.play();
  video3.currentTime = 0;
  video3.play();

  //-- Y en silencio...
  video1.muted = true;
  video2.muted = true;
  video3.muted = true;

  //-- En la emisión en directo ponemos la imagen de prueba
  directo.poster = TEST_IMAGE_URL;
};

//-- Botón de Test
btn_test.onclick = () => {
    directo.poster = TEST_IMAGE_URL;
    directo.src = null;
};

//-- Botón de Selección de la cámara 1
btn_video1.onclick = () => {
    directo.src = video1.src;
    directo.currentTime = video1.currentTime;
    directo.play();
    video2.muted = true;
    video3.muted = true;
};

//-- Botón de Selección de la cámara 2
btn_video2.onclick = () => {
    directo.src = video2.src;
    directo.currentTime = video2.currentTime;
    directo.play();
    video1.muted = true;
    video3.muted = true;
};

//-- Botón de Selección de la cámara 3
btn_video3.onclick = () => {
    directo.src = video3.src;
    directo.currentTime = video3.currentTime;
    directo.play();
    video1.muted = true;
    video2.muted = true;
};

//-- Botón de apagado de las cámaras
btn_src_off.onclick = () => {
    directo.poster = OFF_IMAGE_URL;
    directo.src = null;
    video1.poster = OFF_IMAGE_URL;
    video1.src = null;
    video2.poster = OFF_IMAGE_URL;
    video2.src = null;
    video3.poster = OFF_IMAGE_URL;
    video3.src = null;
};
