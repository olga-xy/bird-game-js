let height = 500
let width = 800
let highScore = 0

function setup(){
  createCanvas(width,height);
  highScore = localStorage.getItem('birdScore')
}

let x = 0
let y = 100
let gravity = 0.4
let yV = 0

const massHeight = 200

let mass = [randomInteger(30, 500 - 70 - massHeight)]
let massX = [0]

let gameInProgess = 1
const massWidth = 10

function draw(){
  if (gameInProgess == 1)
  {
    checkScreen()
    checkBird()
    background(200,200,200)
    drawBird();
    if (x % 100 == 0)
    {
      massX.push(x - 100 * massX.length)
      mass.push(randomInteger(30, 500 - 70 - massHeight))
    }
    for (let i = 0; i < massX.length; i+=1)
    {
      drawRect(massX[i], mass[i]);
    }
    stroke(100, 100, 100);
    strokeWeight(0);
    fill(0, 0, 0);
    text(score, 10, 10);
    if (highScore |= null)
    {
    text(highScore, 10, 50);
    }
  }
  if (gameInProgess == 0)
  {
    stroke(100, 100, 100);
    strokeWeight(0);
    fill(0, 0, 0);
    textSize(32);
    textAlign(CENTER);
    text('Game end, press R', 400, height/2);

    if (highScore == null)
    {
      highScore = score
    }
    if (score > highScore)
    {
      highScore = score
    }
    localStorage.setItem('birdScore', highScore)
  }
}

function drawRect(xi, yi){
  rectMode(CORNERS);
  stroke(250, 100, 0);
  strokeWeight(3);
  fill(250, 100, 0);
  rect(800 - massWidth - xi, 0, 800 - xi, yi);
  rect(800 - massWidth - xi, yi+massHeight, 800 - xi, 500);
}

function drawBird(){

  stroke(0, 0, 250);
  strokeWeight(3);
  fill(100, 250, 0);
  ellipse(400, y, 10 * 2);

  x += 1;
  for (let i = 0; i < massX.length; i += 1)
  {
    massX[i] += 1;
  }
  yV += gravity
  y += yV
}

function checkScreen()
{
  if (y >= 500)
  {
    gameInProgess = 0;
  }

  if (y < 0)
  {
    gameInProgess = 0;
  }
}

function checkBird()
{
  let maxNumber = 0
  for (let i = 0; i < massX.length; i += 1)
  {
    if (massX[i] >= 410)
    {
      maxNumber = i + 1;
    }
    if (massX[i] <= 410 && massX[i] >= 380)
    {
      if (y - 17 < mass[i])
      {
        gameInProgess = 0;
      }
      if (y + 17 > mass[i] + massHeight)
      {
        gameInProgess = 0;
      }
    }
  }
  score = maxNumber;
}

function randomInteger(min, max){
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

function keyPressed(){
  if (keyCode == 32)
  {
    yV = -10
  }
  if (keyCode == 82)
  {
    window.location.reload()
  }
}
