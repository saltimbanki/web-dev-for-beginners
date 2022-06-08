let red, blue, green = 0;
let color_aleatorio = '';
const contenedor = document.querySelector('#contenedor');
const contenedor_seleccionados = document.querySelector('#contenedor_seleccionados');
const colores_seleccionados = document.querySelector('#contenedor_seleccionados--colores');
// añadir un event listener a los elementos con class caja
contenedor.addEventListener('click', function(e){
    // obtener el color del elemento clickeado
    let color = e.target.style.backgroundColor;
    // crear un elemento en #seleccion que contenga el color clickeado
    let seleccion = document.createElement('div');
    seleccion.style.backgroundColor = color;
    seleccion.style.width = '5vw';
    seleccion.style.height = '5vw';
    // contenedor_seleccionados.appendChild(seleccion);
    colores_seleccionados.appendChild(seleccion);

})
document.addEventListener("keydown", function(event) {
    console.log(event.key, event.code, event.keyCode);
    red = getRandomArbitrary(0, 255);
    blue = getRandomArbitrary(0, 255);
    green = getRandomArbitrary(0, 255);
    color_aleatorio = 'rgb(' + red + ',' + blue + ',' + green + ')';
    // document.body.style.backgroundColor = color_aleatorio;
    addElement();
    console.log(color_aleatorio);
});


function getRandomArbitrary(min, max){
    return Math.floor(Math.random() * (max - min) + min);
}

function addElement() {
    // crear un elemento div con el color aleatorio
    let div = document.createElement('div');
    div.style.backgroundColor = color_aleatorio;
    div.style.width = '5vw';
    div.style.height = '5vw';
    div.classList.add('caja');
    

    // document.body.appendChild(div);
    contenedor.appendChild(div);
}