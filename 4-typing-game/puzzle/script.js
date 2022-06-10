const piezas = document.querySelectorAll('.contenedor__juego--juego-pieza');
let posiciones = [1,2,3,4,5,6,7,8,9];

document.querySelector('#contenedor_juego--titulo-start').addEventListener('click', function() {
    console.log('clicki');
    barajar();
});


function barajar(){
    //barajar las piezas
    shuffle(posiciones);


    // console.log(piezas, posiciones);
    for(let i = 0; i < piezas.length; i++){
        let pieza = piezas[i];
        pieza.style.order = posiciones[i];
    }

    comprobarPosicion();
}

function comprobarPosicion(){
    // recorrer las piezas y si estan en orden, añadir clase correcto
    for(let i = 0; i < piezas.length; i++){
        //si data-order es igual a order añadir clase correcto
        if(piezas[i].dataset.pos == piezas[i].style.order){
            piezas[i].classList.add('correcto');
        }else{
            //eliminar clase correcto
            piezas[i].classList.remove('correcto');
        }
    }
}

function shuffle(array) {
    //https://javascript.info/task/shuffle#:~:text=Write%20the%20function%20shuffle(array,%2C%202%5D%20%2F%2F%20...
    // aleatorizar el contenido de un array de manera que tengamos las mismas probabilidades de obtener cualquier permutacion
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }