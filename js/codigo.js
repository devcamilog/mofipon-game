const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const botonSeleccionar = document.getElementById('boton-seleccionar')
const botonReiniciar = document.getElementById('boton-reiniciar')
sectionReiniciar.style.display = 'none'

const sectionSeleccionarPersonaje = document.getElementById('seleccion-personaje')
const spanPersonajeJugador = document.getElementById('personaje-jugador')

const spanPersonajeEnemigo = document.getElementById("personaje-enemigo")

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const sectionMensajes = document.getElementById('resultado')
const ataquesDelJugador = document.getElementById('ataques-del-jugador')
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')
const contenedorTarjetas = document.getElementById('contenedorTarjetas')
const contenedorAtaques = document.getElementById('contenedorAtaques')

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

let jugadorId = null
let enemigoId = null
let mofipones = []
let mofiponesEnemigos = []
let ataqueJugador = []
let ataqueEnemigo = []
let opcionDeMofipones 
let inputPoporret 
let inputAndroide6
let inputDarkwade 
let inputPepirron
let inputNorridi
let inputPitoneta
let personajeJugador 
let personajeJugadorObjeto
let ataquesMofipon
let ataquesMofifonEnemigo
let botonTierra
let botonFuego 
let botonAgua
let botones = [] 
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3
let lienzo = mapa.getContext('2d')
let intervalo 
let mapaBackground = new Image()
mapaBackground.src = "./assets/mofomap.png"
let alturaQueBuscamos 
let anchoDelMapa = window.innerWidth - 20 
const anchoMaximoDelMapa = 850

if (anchoDelMapa > anchoMaximoDelMapa) {
    anchoDelMapa = anchoMaximoDelMapa - 20}

alturaQueBuscamos = anchoDelMapa * 600 / 800

mapa.width = anchoDelMapa 
mapa.height = alturaQueBuscamos


class Mofipon {
    constructor(nombre, foto, vida ,fotoMapa, id = null) {
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida 
        this.ataques = []
        this.ancho = 80
        this.alto = 80
        this.x = aleatorio(0,mapa.width - this.ancho)
        this.y = aleatorio(0,mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }
    pintarMofipon() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}
let poporret = new Mofipon('Poporret',' ./assets/poporret.png', 5, './assets/poporret-face.png')
let androide6 = new Mofipon('Androide6' ,"./assets/androide6.png", 5,'./assets/androide6-face.png')
let darkwade = new Mofipon('Darkwade' ,"./assets/Darkwade.png" , 5,'./assets/darkwade-face.png')
let norridi = new Mofipon ('Norridi','./assets/norridi.png',5,'./assets/norridio-face.png')
let pepirron = new Mofipon('Pepirron','./assets/pepirron.png', 5,'./assets/pepirron-face.png')
let pitoneta = new Mofipon('Pitoneta','./assets/pitoneta.png',5,'./assets/pitoneta-face.png')


const POPORRET_ATAQUES = [
    {nombre : '🌊', id: 'boton-agua'},
    {nombre : '🌊', id: 'boton-agua'},
    {nombre : '🌊', id: 'boton-agua'},
    {nombre : '🔥', id: 'boton-fuego'},
    {nombre : '🪴', id: 'boton-tierra'},
]

poporret.ataques.push(...POPORRET_ATAQUES)

const ANDROIDE6_ATAQUES = [
    {nombre : '🔥', id: 'boton-fuego'},
    {nombre : '🔥', id: 'boton-fuego'},
    {nombre : '🔥', id: 'boton-fuego'},
    {nombre : '🌊', id: 'boton-agua'},
    {nombre : '🪴', id: 'boton-tierra'},
]

androide6.ataques.push(...ANDROIDE6_ATAQUES)

const DARKWADE_ATAQUES = [
    {nombre : '🪴', id: 'boton-tierra'},
    {nombre : '🪴', id: 'boton-tierra'},
    {nombre : '🪴', id: 'boton-tierra'},
    {nombre : '🌊', id: 'boton-agua'},
    {nombre : '🔥', id: 'boton-fuego'},
]

darkwade.ataques.push(...DARKWADE_ATAQUES)

const NORRIDI_ATAQUES = [
    {nombre : '🌊', id: 'boton-agua'},
    {nombre : '🌊', id: 'boton-agua'},
    {nombre : '🌊', id: 'boton-agua'},
    {nombre : '🔥', id: 'boton-fuego'},
    {nombre : '🪴', id: 'boton-tierra'},
]

norridi.ataques.push(...NORRIDI_ATAQUES)

const PEPIRRON_ATAQUES = [
    {nombre : '🔥', id: 'boton-fuego'},
    {nombre : '🔥', id: 'boton-fuego'},
    {nombre : '🔥', id: 'boton-fuego'},
    {nombre : '🌊', id: 'boton-agua'},
    {nombre : '🪴', id: 'boton-tierra'},
]
pepirron.ataques.push(...PEPIRRON_ATAQUES)

const PITONETA_ATAQUES = [
    {nombre : '🪴', id: 'boton-tierra'},
    {nombre : '🪴', id: 'boton-tierra'},
    {nombre : '🪴', id: 'boton-tierra'},
    {nombre : '🌊', id: 'boton-agua'},
    {nombre : '🔥', id: 'boton-fuego'},
]

pitoneta.ataques.push(...PITONETA_ATAQUES)

mofipones.push(poporret,androide6,darkwade,norridi,pepirron,pitoneta)

function iniciarJuego() {
    sectionSeleccionarAtaque.style.display = 'none'
    sectionVerMapa.style.display = 'none'

    mofipones.forEach((mofipon) => {
        opcionDeMofipones = `
        <input type="radio" name ="personaje" id=${mofipon.nombre}>       
        <label class="tarjeta-mofipon" for=${mofipon.nombre}>
            <p>${mofipon.nombre}</p>
            <img src=${mofipon.foto} alt=${mofipon.nombre}>
        </label>
        `
    contenedorTarjetas.innerHTML += opcionDeMofipones
        // se le pone el + para que me imprima todos los objetos

    inputPoporret = document.getElementById('Poporret')
    inputAndroide6 = document.getElementById('Androide6')
    inputDarkwade = document.getElementById('Darkwade')
    inputPepirron = document.getElementById('Pepirron')
    inputNorridi = document.getElementById('Norridi')
    inputPitoneta = document.getElementById('Pitoneta')

    })
    botonSeleccionar.addEventListener('click', seleccionarPersonajeJugador) 

    botonReiniciar.addEventListener('click', reiniciarJuego)

    unirseAlJuego()
}

function unirseAlJuego() {
    fetch("http://192.168.20.27:8080/unirse")
        .then(function(res) {
            if (res.ok) {
                res.text()
                    .then(function (respuesta) {
                        console.log(respuesta)
                        jugadorId = respuesta
                })
        }
    })
}

function seleccionarPersonajeJugador() {
    if (inputPoporret.checked) {
        spanPersonajeJugador.innerHTML = inputPoporret.id
        personajeJugador = inputPoporret.id 
    } else if (inputAndroide6.checked) {
        spanPersonajeJugador.innerHTML = inputAndroide6.id
        personajeJugador = inputAndroide6.id
    } else if (inputDarkwade.checked) {
        spanPersonajeJugador.innerHTML = inputDarkwade.id
        personajeJugador = inputDarkwade.id
    } else if (inputPepirron.checked) {
        spanPersonajeJugador.innerHTML = inputPepirron.id
        personajeJugador = inputPepirron.id
    } else if (inputNorridi.checked) {
        spanPersonajeJugador.innerHTML = inputNorridi.id
        personajeJugador = inputNorridi.id
    } else if (inputPitoneta.checked) {
        spanPersonajeJugador.innerHTML = inputPitoneta.id
        personajeJugador = inputPitoneta.id
    } else {
        alert("Primero selecciona algun personaje")
        return
    }

    sectionSeleccionarPersonaje.style.display = 'none'
    seleccionarMofipon(personajeJugador)

    extraerAtaques(personajeJugador)
    sectionVerMapa.style.display = 'flex'
    iniciarMapa()
}

function seleccionarMofipon(personajeJugador) {
    fetch(`http://192.168.20.27:8080/mofipon/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mofipon: personajeJugador
        })
    })
}

function extraerAtaques(personajeJugador) {
    let ataques 
    for (let i = 0; i < mofipones.length; i++) {
        if (personajeJugador === mofipones[i].nombre) {
            ataques = mofipones[i].ataques
        }
    }
    mostrarAtaques(ataques)

}

function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        ataquesMofipon = `
        <button id=${ataque.id} class="boton-ataque BAtaque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesMofipon
    }) 

    botonTierra= document.getElementById('boton-tierra')
    botonFuego = document.getElementById('boton-fuego')
    botonAgua = document.getElementById('boton-agua')
    botones = document.querySelectorAll('.BAtaque')
  
}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener('click',(e) =>{
            if (e.target.textContent === '🔥') {
                ataqueJugador.push('FUEGO')
                console.log(ataqueJugador)
                boton.style.background = '#F58112' 
                boton.disabled = true          
            } else if (e.target.textContent === '🌊'){
                ataqueJugador.push('AGUA')
                console.log(ataqueJugador)
                boton.style.background = '#00F5FF'
                boton.disabled = true
            } else {
                ataqueJugador.push('TIERRA')
                console.log(ataqueJugador)
                boton.style.background = '#594545'
                boton.disabled = true
            }
            if(ataqueJugador.length === 5){
                enviarAtaques()
            }
        })
    })
    
}

function enviarAtaques() {
    fetch(`http://192.168.20.27:8080/mofipon/${jugadorId}/ataques`,{
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    })

    intervalo = setInterval(obtenerAtaques, 50)
}

function obtenerAtaques() {
    fetch(`http://192.168.20.27:8080/mofipon/${enemigoId}/ataques`)
        .then(function (res) {
            if(res.ok) {
                res.json()
                    .then(function ({ ataques }){
                        if (ataques.length === 5) {
                            ataqueEnemigo = ataques
                            combate()
                        }
                    })
            }
        })
}

function seleccionarPersonajeEnemigo(enemigo) { 
    spanPersonajeEnemigo.innerHTML = enemigo.nombre
    ataquesMofifonEnemigo = enemigo.ataques
    secuenciaAtaque()
}


function ataqueAleatorioEnemigo() {
    console.log('ataques enemigo');
    let ataqueAleatorio = aleatorio(0,ataquesMofifonEnemigo.length -1) 

    if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
        ataqueEnemigo.push('FUEGO')
    } else if (ataqueAleatorio == 3 || ataqueAleatorio ==4) {
        ataqueEnemigo.push('AGUA')
    } else {
        ataqueEnemigo.push('TIERRA')
    }
    console.log(ataqueEnemigo)
    iniciarPelea()
}

function iniciarPelea() {
    if (ataqueJugador.length === 5) {
        combate()
    }
}

function indexAmbosOponentes(jugador,enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
} 

function combate() {
    clearInterval(intervalo)

    for (let index = 0; index < ataqueJugador.length; index++) {
        if(ataqueJugador[index] === ataqueEnemigo[index]) {
            indexAmbosOponentes(index,index)
            crearMensaje("EMPATE")
        } else if (ataqueJugador [index] === 'FUEGO' && ataqueEnemigo[index] === 'TIERRA') {
            indexAmbosOponentes(index,index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if(ataqueJugador[index] === 'AGUA' && ataqueEnemigo[index] == 'FUEGO') {
            indexAmbosOponentes(index,index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if(ataqueJugador[index] === 'TIERRA' && ataqueEnemigo[index] === 'AGUA') {
            indexAmbosOponentes(index,index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else {
            indexAmbosOponentes(index,index)
            crearMensaje("PERDISTE") 
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }
    } 
    revisarVidas()
}

function revisarVidas() {
    if (victoriasJugador === victoriasEnemigo){
        crearMensajefinal(' ESTO FUE UN EMPATE ')

    } else if (victoriasJugador > victoriasEnemigo){
        crearMensajefinal(' FELICITACIONES GANASTE :) ')
    } else {
        crearMensajefinal(' LO SENTIMOS, PERDISTE')
    }
}

function crearMensaje(resultado) {
    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')
   
    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo
 
    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}


function crearMensajefinal(resultadoFinal) {
    sectionMensajes.innerHTML = resultadoFinal
    sectionReiniciar.style.display = 'block'
}

function reiniciarJuego () {
    location.reload()
}

function aleatorio(min , max){
    return Math.floor(Math.random() * (max - min + 1)+ min) 
}

function pintarCanvas() {

    personajeJugadorObjeto.x = personajeJugadorObjeto.x + personajeJugadorObjeto.velocidadX
    personajeJugadorObjeto.y = personajeJugadorObjeto.y + personajeJugadorObjeto.velocidadY

    lienzo.clearRect(0,0,mapa.width,mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )

    personajeJugadorObjeto.pintarMofipon()

    enviarPosicion(personajeJugadorObjeto.x, personajeJugadorObjeto.y)

    mofiponesEnemigos.forEach(function(mofipon) {
        mofipon.pintarMofipon()
        revisarColision(mofipon)
    })
}

function enviarPosicion(x,y) {
    fetch(`http://192.168.20.27:8080/mofipon/${jugadorId}/posicion`,{
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
    .then(function (res) {
        if (res.ok) {
            res.json()
                .then(function({enemigos}) {
                    console.log(enemigos)
                    mofiponesEnemigos = enemigos.map(function(enemigo){
                        let mofiponEnemigo = null 
                        const mofiponNombre = enemigo.mofipon.nombre || ""
                        if (mofiponNombre === "Poporret") {
                            mofiponEnemigo  = new Mofipon('Poporret','./assets/poporret.png', 5, './assets/poporret-face.png',enemigo.id)
                        } else if (mofiponNombre === "Androide6") {
                            mofiponEnemigo = new Mofipon('Androide6' ,"./assets/androide6.png", 5,'./assets/androide6-face.png',enemigo.id)
                        } else if (mofiponNombre === "Darkwade") {
                            mofiponEnemigo  = new Mofipon('Darkwade' ,"./assets/Darkwade.png" , 5,'./assets/darkwade-face.png',enemigo.id)
                        } else if (mofiponNombre === "Norridi") {
                            mofiponEnemigo   = new Mofipon ('Norridi',"./assets/norridi.png', 5 ,./assets/norridio-face.png",enemigo.id)
                        } else if (mofiponNombre === "Pepirron") {
                            mofiponEnemigo  = new Mofipon('Pepirron','./assets/pepirron.png', 5,'./assets/pepirron-face.png',enemigo.id)
                        } else if (mofiponNombre === "Pitoneta") {
                            mofiponEnemigo  = new Mofipon('Pitoneta','./assets/pitoneta.png',5,'./assets/pitoneta-face.png',enemigo.id)
                        }

                        mofiponEnemigo.x = enemigo.x
                        mofiponEnemigo.y = enemigo.y

                        return mofiponEnemigo
                   })
                   
                })
        }
    })
}

function moverArriba() {
    personajeJugadorObjeto.velocidadY = - 5
}
function moverAbajo() {
    personajeJugadorObjeto.velocidadY =  5
}
function moverIzquierda() {
    personajeJugadorObjeto.velocidadX = - 5
}

function moverDerecha(){
    const miMofipon = obtenerObjetoMofipon()
    personajeJugadorObjeto.velocidadX =  5
}


function detenerMovimiento() {
    personajeJugadorObjeto.velocidadX = 0
    personajeJugadorObjeto.velocidadY = 0
}

function teclaPresionada(event) {
    switch (event.key) {
        case 'ArrowUp':
            moverArriba()
            break    
        case 'ArrowDown':
            moverAbajo()
            break
        case 'ArrowLeft':
            moverIzquierda()
            break
        case 'ArrowRight':
            moverDerecha()
            break
        default:
            break
    }
}

function iniciarMapa(){

    personajeJugadorObjeto = obtenerObjetoMofipon(personajeJugador)
    console.log(personajeJugadorObjeto,obtenerObjetoMofipon)
    intervalo = setInterval(pintarCanvas, 50)

    window.addEventListener('keydown', teclaPresionada)
    window.addEventListener('keyup', detenerMovimiento)

}

function obtenerObjetoMofipon() {
    for (let i = 0; i < mofipones.length; i++) {
        if (personajeJugador === mofipones[i].nombre) {
            return mofipones[i]
        }
    }
}
// el js no funciona pero una segunda solucion seria esta
// agregarle este add

function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaPersonaje = personajeJugadorObjeto.y
    const abajoPersonaje = personajeJugadorObjeto.y + personajeJugadorObjeto.alto
    const derechaPersonaje = personajeJugadorObjeto.x + personajeJugadorObjeto.ancho
    const izquierdaPersonaje = personajeJugadorObjeto.x


    if(
        abajoPersonaje < arribaEnemigo ||
        arribaPersonaje > abajoEnemigo ||
        derechaPersonaje < izquierdaEnemigo ||
        izquierdaPersonaje > derechaEnemigo
    ) {
        return
    }
    detenerMovimiento()
    clearInterval(intervalo)
    console.log("Se detecto una coalision")

    enemigoId = enemigo.id
    sectionSeleccionarAtaque.style.display = 'flex'
    sectionVerMapa.style.display = 'none'
    seleccionarPersonajeEnemigo(enemigo)
}

window.addEventListener('load', iniciarJuego) 