// all of our quotes
const quotes = [
    'When you have eliminated the impossible, whatever remains, however improbable, must be the truth.',
    'There is nothing more deceptive than an obvious fact.',
    'I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation.',
    'I never make exceptions. An exception disproves the rule.',
    'What one man can invent another can discover.',
    'Nothing clears up a case so much as stating it to another person.',
    'Education never ends, Watson. It is a series of lessons, with the greatest for the last.',
];
// store the list of words and the index of the word the player is currently typing
let words = [];
let wordIndex = 0;
// the starting time
let startTime = Date.now();
// page elements
const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message');
const typedValueElement = document.getElementById('typed-value');

//acceso al localstorage
const miStorage = window.localStorage;

let quoteLength = 0;

document.getElementById('start').addEventListener('click', ()=>{
    // habilitar el input
    typedValueElement.disabled = false;
    // get a quote
    const quote= quotes[Math.floor(Math.random() * quotes.length)];
    quoteLength = quote.length;
    // Put the quote into an array of words
    words = quote.split(' ');
    // reset the word index for tracking the current word
    wordIndex = 0;

    // UI updates
    // Create an array of span elements so we can set a class
    const spanWords = words.map(function(word){
        return `<span>${word}</span>`;
    });
    // Convert into string and set as innerHTML on quote display
    quoteElement.innerHTML = spanWords.join(' ' );
    // Highlight the first word
    quoteElement.children[0].classList.add('highlight');
    // Clear any prior messages
    messageElement.innerText = '';

    // Setup the textbox
    // Clear the textbox
    typedValueElement.value  ='';
    //set focus on the textbox
    typedValueElement.focus();
    //set the event handler

    // Start the timer
    startTime = Date.now();
    
});

typedValueElement.addEventListener('input', ()=>{
    //Get the current word
    const currentWord = words[wordIndex];
    // get the current value of the textbox
    const typedValue = typedValueElement.value;

    if(typedValue === currentWord && wordIndex === words.length -1){
        // end of sentence
        // display success message
        const elapsedTyme = new Date().getTime() - startTime;
        const message = `Congratulations! You typed the sentence in ${elapsedTyme/1000} seconds.`;
        // messageElement.innerText = message;
        // modal con el mensaje
        alert(message);
        
        // calcular pulsaciones por minuto 
        let pulsacionesPorMinuto = Math.round((60 * quoteLength) / (elapsedTyme/1000));
        compararConMaximaPuntuacion(pulsacionesPorMinuto + ' pulsaciones por minuto');
        actualizaPuntuaciones();

        // remove event listener of the textbox
        // typedValueElement.removeEventListener('input');
        // clear the textbox
        typedValueElement.value = '';
        // disable the textbox
        typedValueElement.disabled = true;

    }else if (typedValue.endsWith(' ')  && typedValue.trim() === currentWord){
        // end of word
        // clear the typedValueElement for the new word
        typedValueElement.value = '';

        //move to the next word
        wordIndex++;
        // reset the class name for all elements in quote
        for(const wordElement of quoteElement.childNodes){
            wordElement.className= '';
        }
        //hightlight the new word
        quoteElement.children[wordIndex].className ='highlight';
    }else if (currentWord.startsWith(typedValue)){
        // currently correct
        // highlight the next word
        typedValueElement.className = '';
    }else{
        //error state
        typedValueElement.className = 'error';
    }

});

function compararConMaximaPuntuacion(puntuacionActual){
    let maximaPuntuacion = miStorage.getItem('maximaPuntuacion');
    
        miStorage.setItem('maximaPuntuacion', puntuacionActual);
}


function actualizaPuntuaciones(){
    document.getElementById('maximaPuntuacion').innerText = miStorage.getItem('maximaPuntuacion');
}