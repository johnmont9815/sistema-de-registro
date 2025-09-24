let amigos = [];
let listaSorteados = [];
let sorteoAleatorio =0;

function registrarAmigo() {
    let ingresaAmigos = document.querySelector('input').value;
    let regex = /^[a-zA-Z\s]+$/; //Esta expresion regular asegura que solo se permitan letras (mayúsculas y minúsculas) y espacios
    if (ingresaAmigos =='') {
        alert('Por favor, ingresa un nombre para agregar al sorteo de Amigo Secreto');
        } else if (amigos.includes(ingresaAmigos)){
            alert('Ese nombre ya fue ingresado al sorteo de Amigo Secreto, por favor ingresa un nombre distinto');
        } else if (!regex.test(ingresaAmigos)){ 
            alert('Por favor, ingresa un nombre válido. No se permiten números, símbolos, acentos y la letra "ñ"');
                
        } else {
        amigos.push(ingresaAmigos);
        }
    
    limpiarCaja('amigo');
    mostrarAmigos();
    return;
}


// los amigos agregados aqui se muestran
function mostrarAmigos(){   
    let listadoAmigos = document.getElementById('listaAmigos');
    listadoAmigos.innerHTML = '';
    
    for (let i = 0; i < amigos.length; i++) {
        let li = document.createElement('li');
        li.textContent = amigos[i];
        listadoAmigos.appendChild(li);  
    }
    return;
}

function sortearAmigo() {
    // Revisar amigos no está 
    if (amigos =='') {
        alert ('Debes añadir amigos para el sorteo de Amigo Secreto');

    // minimo de 3 amigos 
    } else if (amigos.length < 3){
        alert('Debes añadir un mínimo de 3 amigos para el sorteo de Amigo Secreto')
    } else {
        // Deshabilita amigos en el texto y botón añadir cuando inicia 
        document.querySelector('input').setAttribute('disabled', 'true');
        document.getElementById('boton-amigo').setAttribute('disabled', 'true');
        
        // Limpiar listado 
        asignarTextoElemento('listaAmigos', '');  

        // Comparar lista 
        if (amigos.length == listaSorteados.length){
            alert ('Ya se sortearon todos los amigos, ¡gracias por participar!')
            alert ('El juego de Amigo Secreto se reiniciará automáticamente')
            reiniciarSorteo();
        } else { 
            
            sorteoAleatorio = amigos[numeroAleatorio()];
            // Revisa amigo ya fue sorteado
            while(listaSorteados.includes(sorteoAleatorio)){
                sorteoAleatorio = amigos[numeroAleatorio()];
            }
            // Mostrar el amigo sorteado
            asignarTextoElemento('resultado', `El amigo secreto sorteado es: ${sorteoAleatorio}`);
            
            listaSorteados.push(sorteoAleatorio);
            
        }
        
             
    } 

    return;
}

function numeroAleatorio() {
    let aleatorio = Math.floor(Math.random() * amigos.length);
    return aleatorio;
}

function limpiarCaja(elemento){
    document.getElementById(elemento).value =''; 
    return;
}

function reiniciarSorteo() {
    amigos = [];            // Limpiar la lista de amigos
    listaSorteados = [];    // Limpiar la lista de sorteados

    // Habilitar amigos en el texto y botón añadir
    document.querySelector('input').removeAttribute('disabled');
    document.getElementById('boton-amigo').removeAttribute('disabled');

    // Limpia la interfaz para que quede vacía
    asignarTextoElemento('listaAmigos', '');
    asignarTextoElemento('resultado', '');
    return;
}


function asignarTextoElemento(elemento, texto) { 
    let elementoHTML = document.getElementById(elemento);
    elementoHTML.innerHTML = texto;
    return;
}