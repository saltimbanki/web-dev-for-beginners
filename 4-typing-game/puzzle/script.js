const piezas = document.querySelectorAll(".contenedor__juego--juego-pieza");
let array_piezas = Array.from(piezas);
let posiciones = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let contadorPiezasCorrectas = 0;
let contadorMovimientos = 0;


//crear un event listener del click por cada pieza
piezas.forEach(function (pieza) {
  pieza.addEventListener("click", function () {

    // obtener el order de la pieza
    let order = pieza.style.order;
    let orderHueco = parseInt(piezas[8].style.order); //convertimos a entero para que no haya confusion con la concatenacion mas adelante
    //comprobar si las piezas son adyacentes para permitir cambiar el orden
    if (order == orderHueco - 1 || order == orderHueco + 1 || order == orderHueco - 3 || order == orderHueco + 3) {
        //intercambiar el orden
        pieza.style.order = orderHueco;
        piezas[8].style.order = order;
        //aumentar contador de movimientos
        aumentarContadorMovimientos();
        //comprobar si la pieza esta en la posicion correcta
        comprobarPosicion();
    }
  });
});

document
  .querySelector("#contenedor_juego--titulo-start")
  .addEventListener("click", function () {
    console.log("clicki");
    barajar();
  });

function reiniciarContadorPiezasCorrectas() {
  contadorPiezasCorrectas = 0;
}

function barajar() {
  reiniciarContadorPiezasCorrectas();
  //barajar las piezas
  shuffle(posiciones);

  // console.log(piezas, posiciones);
  for (let i = 0; i < piezas.length; i++) {
    let pieza = piezas[i];
    pieza.style.order = posiciones[i];
  }

  comprobarPosicion();
}

function comprobarPosicion() {
  // recorrer las piezas y si estan en orden, añadir clase correcto
  reiniciarContadorPiezasCorrectas();

  for (let i = 0; i < piezas.length; i++) {
    //si data-order es igual a order añadir clase correcto
    if (piezas[i].dataset.pos == piezas[i].style.order) {
      piezas[i].classList.add("correcto");
      contadorPiezasCorrectas++;
    } else {
      //eliminar clase correcto
      piezas[i].classList.remove("correcto");
    }
  }
  //comprobar si ganaste
  comprobarFinJuego();
}



function shuffle(array) {
  //https://javascript.info/task/shuffle#:~:text=Write%20the%20function%20shuffle(array,%2C%202%5D%20%2F%2F%20...
  // aleatorizar el contenido de un array de manera que tengamos las mismas probabilidades de obtener cualquier permutacion
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

document.addEventListener("keydown", function (e) {
  //obtener el orden actual de la pieza 9
  let posActual = piezas[8].style.order;
  let movimientoPermitido = false;

  //detectar si se pulsa la tecla flecha derecha
  if (!e.repeat) {

    // debugger;
    switch (e.key) {
      case "ArrowRight":
        //obtener order actual de la pieza 9

        if (posActual != 1 && posActual != 4 && posActual != 7) {
          let posAnterior = parseInt(posActual) - 1;
          //obtener pieza de la izquierda
          let piezaIzquierda = document.querySelector(
            '.contenedor__juego--juego-pieza[style="order: ' +
              posAnterior +
              ';"]'
          );
          //intercambiar los orders
          piezas[8].style.order = posAnterior;
          piezaIzquierda.style.order = posActual;
          movimientoPermitido = true;
        }
        break;
      case "ArrowLeft":
        //obtener order actual de la pieza 9
        if (posActual != 3 && posActual != 6 && posActual != 9) {
          let posSiguiente = parseInt(posActual) + 1;
          //obtener pieza de la derecha
          let piezaDerecha = document.querySelector(
            '.contenedor__juego--juego-pieza[style="order: ' +
              posSiguiente +
              ';"]'
          );
          //intercambiar los orders
          piezas[8].style.order = posSiguiente;
          piezaDerecha.style.order = posActual;
          movimientoPermitido = true;
        }

        break;
      case "ArrowDown":
        //obtener order actual de la pieza 9
        if (posActual != 1 && posActual != 2 && posActual != 3) {
          let posSiguiente = parseInt(posActual) - 3;
          //obtener pieza de la derecha
          let piezaInferior = document.querySelector(
            '.contenedor__juego--juego-pieza[style="order: ' +
              posSiguiente +
              ';"]'
          );
          //intercambiar los orders
          piezas[8].style.order = posSiguiente;
          piezaInferior.style.order = posActual;
          movimientoPermitido = true;
        }
        break;
      case "ArrowUp":
        //obtener order actual de la pieza 9
        if (posActual != 7 && posActual != 8 && posActual != 9) {
          let posSiguiente = parseInt(posActual) + 3;
          //obtener pieza de la derecha
          let piezaInferior = document.querySelector(
            '.contenedor__juego--juego-pieza[style="order: ' +
              posSiguiente +
              ';"]'
          );
          //intercambiar los orders
          piezas[8].style.order = posSiguiente;
          piezaInferior.style.order = posActual;
          movimientoPermitido = true;
        }
        break;

      default:
        break;
    }
    comprobarPosicion();
    if(movimientoPermitido){
        aumentarContadorMovimientos();
    }
  } else {
    //   anulamos la repeticion
    // console.log(`Key "${e.key}" repeating [event: keydown]`);
  }
});


function aumentarContadorMovimientos(){
    contadorMovimientos++;
    document.querySelector("#contenedor_juego--puntaje-puntaje").innerHTML = contadorMovimientos;
}

function comprobarFinJuego(){
    if(contadorPiezasCorrectas == 9){
        alert("Ganaste");
    }else{
        console.log('sigue jugando');
    }
}