let red, blue, green = 0;
let color_aleatorio = '';
document.addEventListener("keydown", function(event) {
    console.log(event.key, event.code, event.keyCode);
    red = getRandomArbitrary(0, 255);
    blue = getRandomArbitrary(0, 255);
    green = getRandomArbitrary(0, 255);
    color_aleatorio = 'rgb(' + red + ',' + blue + ',' + green + ')';
    document.body.style.backgroundColor = color_aleatorio;
    console.log(color_aleatorio);
});

function getRandomArbitrary(min, max){
    return Math.floor(Math.random() * (max - min) + min);
}