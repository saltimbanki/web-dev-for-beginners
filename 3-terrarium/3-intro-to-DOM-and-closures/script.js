dragElement(document.getElementById('plant1'));
dragElement(document.getElementById('plant2'));
dragElement(document.getElementById('plant3'));
dragElement(document.getElementById('plant4'));
dragElement(document.getElementById('plant5'));
dragElement(document.getElementById('plant6'));
dragElement(document.getElementById('plant7'));
dragElement(document.getElementById('plant8'));
dragElement(document.getElementById('plant9'));
dragElement(document.getElementById('plant10'));
dragElement(document.getElementById('plant11'));
dragElement(document.getElementById('plant12'));
dragElement(document.getElementById('plant13'));
dragElement(document.getElementById('plant14'));


function dragElement(terrariumElement){
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    let doubleclick = false;
    terrariumElement.onpointerdown = pointerDrag;    
    terrariumElement.ondblclick = doubleClick;
    

    function pointerDrag(e){
         e.preventDefault();//evita el comportamiento de arrastrar en el que se queda la imagen original congelada y se mueve una copia.
         console.log(e);
         pos3 = e.clientX;
         pos4 = e.clientY;
         document.onpointermove = elementDrag;
         document.onpointerup = stopElementDrag;
         
    }

    function elementDrag(e){
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // console.log(pos1, pos2, pos3, pos4); 
        if(doubleclick){
            
            terrariumElement.style.height = terrariumElement.height - pos2 + "px";
            terrariumElement.style.width = terrariumElement.width - pos1 + "px";
        }else{
            terrariumElement.style.top = terrariumElement.offsetTop - pos2 + "px";
            terrariumElement.style.left = terrariumElement.offsetLeft - pos1 + "px";    
        }
        
    }

    

    function stopElementDrag(){
        document.onpointerup = null;//permite soltar el elemento
        document.onpointermove = null;//permite soltar el elemento
    }

    function getFront(){
        console.log(terrariumElement);
        terrariumElement.style.zIndex +=1;
        terrariumElement.style.height = terrariumElement.offsetHeight + 50 + "px";
    }

    function doubleClick(e){
        doubleclick = !doubleclick;
        if(doubleclick){
            mostrarBordes();
        }else{
            ocultarBordes();
        }
        let altura = terrariumElement.offsetHeight;
        let nuevaaltura = altura + 50;
        e.target.style.height = nuevaaltura +'px';
        console.log("double click", doubleclick, e.target, altura);
        
    }

    function mostrarBordes(){terrariumElement.style.outline = "1px solid black";}
    function ocultarBordes(){terrariumElement.style.outline = "none";}

}