  //to keep a memory for the game objects
  var PLAY = 1;
  var END = 0;
  var gameState = PLAY;

  var pathImage;
  var path;
  var jake,jake_running,jake_collidedImg;
  var boundary1,boundary2;
  var coinImg,energyDrinkImg,powerImg;
  var bombImg;
  var power;
var coin_collectingSound;
var gameSound;

  var gameOver,gameOverSound,energySound;
  var restart,restartImg;

  var score;

function preload(){
    //pre-load images
    pathImage = loadImage("path.png");
    jake_running = loadAnimation("Jake1.png","Jake2.png","jake3.png","jake5.png");
    coinImg = loadImage("coin.png");
    energyDrinkImg = loadImage("energyDrink.png");
    powerImg = loadImage("power.png");
    bombImg = loadImage("bomb.png");
    gameOver = loadAnimation("gameover2.png"); 
    restartImg = loadImage("re.png");
  
  coin_collectingSound = loadSound("coincollectingSound.mp3");
  gameSound = loadSound("subway surfers.mp3");
  gameOverSound = loadSound("gameOverSound.wav");
  energySound = loadSound("energySound.mp3");
  
    
}

function setup(){
  createCanvas(400,400);
  //create sprites here
  path = createSprite(200,200);
  path.addImage("path",pathImage);
  path.velocityY = 5;
  
  jake = createSprite(200,200);
  jake.addAnimation("jake",jake_running);
  jake.scale = 0.5;
  
  power = createSprite(0,200);
  power.addImage(powerImg);
  power.scale = 0.09;
  

  score = 0;
  
  restart = createSprite(200,270);
  restart.addImage(restartImg);
  restart.scale = 0.7;
  
  
  //to make the player not see the boundary
  invisibleBoundary1 = createSprite(0,0,100,800);
  invisibleBoundary1.visible = false;
  
  invisibleBoundary2 = createSprite(400,400,100,800);
  invisibleBoundary2.visible = false;
  
  coinG = new Group();
  energyDrinkG = new Group();
  bombG = new Group();
  
  
  gameSound.play();
  
  
}

function draw() {
  background(0);
  

  
  
  if(gameState === PLAY){
    
    //to reset the path and make it move infinitely
  if(path.y>400){
    
    path.y = 26;
  }
    
    //to make the player move according to the mouse movement
  jake.x = mouseX;
    
      power.x = jake.x;
    
    restart.visible = false;
    
    spawnCoins();
    spawnEnergyDrink();
    spawnBomb();
    
    power.lifetime = -1;
    power.visible = false;
    
    if(jake.isTouching(coinG)){
      
      coinG.destroyEach();
      score = score+1;
      coin_collectingSound.play();
    
    }
    
    if(jake.isTouching(energyDrinkG)){
      
      power.visible = true;
      power.lifetime = 10;
      score = score+1;
      energySound.play();
    }
    
    if(jake.isTouching(bombG)){
      
     gameState = END; 
     gameOverSound.play(); 
      
    }
    
    if(score % 20 === 0){
      
      path.velocityY = 5+score/20;
      
    }
    
  }else if(gameState === END){
    
    path.velocityY = 0;
    jake.addAnimation("jake",gameOver);
    jake.x = 200;
    jake.y = 200;
    coinG.destroyEach();
    energyDrinkG.destroyEach();
    bombG.destroyEach();
    restart.visible = true;
    gameSound.stop();
    
    
    
    if(mousePressedOver(restart)){
      
      reset()
    }
    
  }
  
  
  
  
  
  //to make the player to collide with the invisible boundary
  jake.collide(invisibleBoundary1);
  jake.collide(invisibleBoundary2);
  
  //to draw the game objects
  drawSprites();
  
    textSize(25);
    fill(255) ;
    text("score: " +score,150,30);
}

function spawnCoins(){

  if(frameCount % 20 === 0){
 var coin = createSprite(Math.round(random(100,300)),0);
coin.addImage(coinImg);
coin.scale = 0.3;
coin.velocityY = path.velocityY; 
coin.lifetime = 50;  
    
coinG.add(coin);    
}
}

function spawnEnergyDrink(){
 
  if(frameCount % 70 === 5){
var energyDrink = createSprite(Math.round(random(100,300)),0);
energyDrink.addImage(energyDrinkImg);
energyDrink.scale = 0.09;
energyDrink.velocityY = path.velocityY;
energyDrink.lifetime = 50;
    
energyDrinkG.add(energyDrink);
    
    
  }
}

function spawnBomb(){

  if(frameCount % 80 === 0){
bomb = createSprite(Math.round(random(100,300)),0);
bomb.addImage(bombImg);
bomb.scale = 0.08;
bomb.velocityY = path.velocityY;
bomb.lifetime = 50; 
    
    bombG.add(bomb);
  }
}

function reset(){
  
  gameState = PLAY;
  jake.addAnimation("jake",jake_running);
  restart.visible = false;
  path.velocityY = 5;
  score = 0;
  gameSound.play();
  power.x = jake.x;
  gameOverSound.stop();
  
}