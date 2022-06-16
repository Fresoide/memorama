const soundError = new Audio("sounds/error.wav");
const soundGameOver = new Audio("sounds/gameover.wav");
const soundAcierto = new Audio("sounds/acierto.wav");
const soundWinner = new Audio("sounds/winner.wav");
const soundSeconds = new Audio("sounds/second.wav");
const soundHardTime = new Audio("sounds/hardtime.wav");
const soundMidTime = new Audio("sounds/midtime.wav");
// inicialización de variables
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 60;
let timerInicial = timer;
let tiempoRegresivoId = null;



// Apuntando a documento HTML
const mostrarMovimientos = document.getElementById('movimientos');
const mostrarAciertos = document.getElementById('aciertos');
const mostrarTiempo = document.getElementById('t-restante');


// generacion de numeros aleatoriosx
const botones = document.querySelector('.botones');
const numeros = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 7];
numeros.sort(() => Math.random() - 0.5);
console.table(numeros)

// funciones
const contarTiempo = () => {
    tiempoRegresivoId = setInterval(() => {
        if (timer > 15 && timer <= 60) {
            soundSeconds.play()

        }
        if (timer <= 16 && timer > 10) {
            soundMidTime.play()
        }
        if (timer <= 10) {
            soundHardTime.play()
        }
        timer--;
        mostrarTiempo.innerHTML = "Tiempo restante: " + timer + "segundos";
        if (timer == 0) {
            clearInterval(tiempoRegresivoId);
            mostrarTiempo.innerHTML = "¡Se acabo el tiempo!";
            soundGameOver.play();
            bloquearTarjetas();
            setInterval(() => {
                confirm("¡Se acabo el tiempo! :( ¿Quieres intentar de nuevo?");
                if (confirm) {
                    window.location.reload();
                }

            }, 1000);
        }
    }, 1000);
}

const bloquearTarjetas = () => {
    for (let i = 1; i <= 16; i++) {

        document.getElementById(i).disabled = true;
        document.getElementById(i).innerHTML = numeros[i];

    }
}



// funcion principal, juego en si
const destapar = (id) => {
    if (temporizador == false) {
        soundSeconds.play()
        contarTiempo();
        temporizador = true;
    }

    tarjetasDestapadas++;
    console.log(tarjetasDestapadas)

    if (tarjetasDestapadas == 1) {
        // Mostrar el primer numero
        tarjeta1 = document.getElementById(id);
        primerResultado = numeros[id];
        tarjeta1.innerHTML = numeros[id];
        // Deshabilitar primer boton
        tarjeta1.disabled = true;
    }

    if (tarjetasDestapadas == 2) {
        // Mostrar el segundo numero
        tarjeta2 = document.getElementById(id);
        segundoResultado = numeros[id];
        tarjeta2.innerHTML = numeros[id];
        // Deshabilitar segundo boton
        tarjeta2.disabled = true;
        soundError.play();
        // incrementar movimientos
        movimientos++;
        mostrarMovimientos.innerHTML = " Movimientos: " + movimientos;


        // Comparar resultados
        if (primerResultado == segundoResultado) {
            // encerar contador tarjetas destapadas
            tarjetasDestapadas = 0;

            // aumentar aciertos
            soundAcierto.play();
            aciertos++
            mostrarAciertos.innerHTML = " Aciertos: " + aciertos;

            if (aciertos == 8) {
                clearInterval(tiempoRegresivoId);
                soundWinner.play();
                mostrarAciertos.innerHTML = "Aciertos: " + aciertos + "😱";
                mostrarTiempo.innerHTML = "terminaste en " + (timerInicial - timer) + "segundos";
                mostrarMovimientos.innerHTML = " Movimientos: " + movimientos + "🤟😎";
                setInterval(() => {
                    confirm("¡Felicidades!🎉 terminaste en " + (timerInicial - timer) + " segundos! ¿Quieres jugar de nuevo?");
                    if (confirm) {
                        window.location.reload();
                    }

                }, 7000);
            }
        }

        else {
            // mostrar momentaneamente valores y volver a tapar
            setTimeout(() => {
                tarjeta1.innerHTML = " ";
                tarjeta2.innerHTML = " ";
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasDestapadas = 0;
            }, 800);

        }

    }
}
