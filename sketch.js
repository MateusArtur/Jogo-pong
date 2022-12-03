//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 18;
let raio = diametro / 2 ;

//velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//Variaveis da raquete
let xRaquete = 5
let yRaquete = 150
let larguraRaquete =10
let alturaRaquete = 90

//colide2D
let colidiu = false


//Variaveis oponente
let xRaqueteOponente = 585
let yRaqueteOponente = 150
let velocidadeYOponente;
let chanceDeErrar = 0;

//Placar do jogo
let meusPontos = 0
let pontosdoOponente = 0

//Variaveis sons do jogo
let raquetada
let ponto
let trilha

function preload(){
  trilha = loadSound("trilha.mp3")
  ponto = loadSound("ponto.mp3")
  raquetada = loadSound("raquetada.mp3")
}

//-------------------------------------------//
//Inicio funções

function setup() {
  createCanvas(600, 400);
  trilha.loop()
}

//Function principal
function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete)
  mostraRaquete(xRaqueteOponente, yRaqueteOponente)
  movimentaRaquete()
  movimentaRaqueteOponente()
  //verificaColisãoRaquete()
  colisaoRaquete(xRaquete, yRaquete)
  colisaoRaquete(xRaqueteOponente, yRaqueteOponente)
  incluiPlacar()
  contaPonto()
}

//Bolinha - functions

function mostraBolinha(){
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}


// Functions Raquetes
function mostraRaquete(x, y) {
  rect(x, y, larguraRaquete, alturaRaquete)
}

function movimentaRaquete() {
  if(keyIsDown(UP_ARROW)){
    yRaquete -= 10
  }
  
  if(keyIsDown(DOWN_ARROW)){
    yRaquete += 10
  }
}

/*function movimentaRaqueteOponente(){
  if(keyIsDown(87)){
    yRaqueteOponente -= 10
  }
  
  if(keyIsDown(83)){
    yRaqueteOponente += 10
  }
}*/

function calculaChanceDeErrar() {
  if (pontosdoOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}

function movimentaRaqueteOponente(){
  volociadeYOponente = yBolinha - yRaqueteOponente - larguraRaquete / 2 - 30
  yRaqueteOponente += volociadeYOponente + chanceDeErrar
  calculaChanceDeErrar()
}
  
  
  
//Verifica colisão

function verificaColisaoBorda(){
  if (xBolinha + raio> width ||
     xBolinha - raio< 0){
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio> height ||
     yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
}

function verificaColisãoRaquete() {
  if(xBolinha-raio < xRaquete + larguraRaquete 
     && yBolinha-raio < yRaquete+alturaRaquete 
     && yBolinha+raio > yRaquete){
      velocidadeXBolinha*= -1
  }
  
}

function colisaoRaquete(x, y){
  colidiu = collideRectCircle(x, y, larguraRaquete, alturaRaquete, xBolinha, yBolinha, raio);
  
  if(colidiu){
    velocidadeXBolinha*= -1
    raquetada.play()
  }
}


function incluiPlacar(){
  stroke(255)
  textAlign(CENTER)
  textSize(16)
  fill(color(255,140,0))
  rect(150, 10, 40, 20)
  fill(255)
  text(meusPontos, 170,26)
  fill(color(255,140,0))
  rect(450,10,40,20)
  fill(255)
  text(pontosdoOponente, 470,26)
}

function contaPonto(){
  if(xBolinha < 10){
    pontosdoOponente += 1
    ponto.play()
  }
  
  if(xBolinha > 590){
    meusPontos += 1
    ponto.play()
  }
}