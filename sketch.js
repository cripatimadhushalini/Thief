var database;
var superhero, superheroImg;
var ground,groundImg;
var thief,thiefImg;
var sword,swordImg;
var coin,coinImg;
var building,building_Img;
var gun,gun_Img;
var diamond,diamond_Img;
var score = 0;
var cGroup,sGroup;
var bullet,bulletImg,bulletG;
var gameState = PLAY;
var PLAY = 0;
var END = 1;
var form,player,game;

function preload(){
superheroImg = loadAnimation("Images/SuperheroGirl1.png","Images/SuperheroGirl2.png");
groundImg = loadImage("Images/Garden4.jpg");
thiefImg = loadAnimation("Images/Thief3.png","Images/Thief4.png");
swordImg = loadImage("Images/Sword.png");
coinImg = loadImage("Images/Coin1.png");
building_Img = loadImage("Images/Building.png");
gun_Img = loadImage("Images/Gun.png");
diamond_Img = loadImage("Images/DiamondImg.png");
bulletImg = loadImage("Images/Bullet.png");
}

function setup(){
 createCanvas(displayWidth,displayHeight);
 database = firebase.database();

 gameState = PLAY;

//  game = new Game();
//  game.getState();
//  game.start();

 ground = createSprite(displayWidth/2,displayHeight/2,displayWidth,displayHeight);
 ground.addImage("gr",groundImg);
 ground.scale = 2;

 superhero = createSprite(250,200,10,10);
 superhero.addAnimation("superhero",superheroImg);
 superhero.scale = 0.4;

 thief = createSprite(displayWidth-190,300,20,20);
 thief.addAnimation("thief",thiefImg);
 thief.scale = 0.3;
 thief.mirrorX(thief.mirrorX()*-1);


 edges = createEdgeSprites();

 sGroup = new Group();
 cGroup = new Group();
 bulletG = new Group();

 gun = createSprite(displayWidth-240,290,20,20);
 gun.addImage("gun",gun_Img);
 gun.scale = 0.2;

 diamond = createSprite(displayWidth-150,290,200,20);
 diamond.addImage("diamond",diamond_Img);
 diamond.scale = 0.04;
}

function draw(){
  background("white");
  gun.y = thief.y-15;
  diamond.y = thief.y-15;
  // bullet.y = thief.y-15;

  if(gameState===PLAY){
     superhero.y = mouseY;
     thief.velocityY = +2;

  if(superhero.isTouching(cGroup)){
    cGroup.destroyEach();
    score = score+2;
  }

  if(cGroup.isTouching(superhero)){
    superhero.x = x+30;
  }
  thief.bounceOff(edges[0]);
  thief.bounceOff(edges[1]);
  thief.bounceOff(edges[2]);
  thief.bounceOff(edges[3]);
  superhero.bounceOff(edges[2]);
  superhero.bounceOff(edges[3]);

  spawnSwords();
  spawnCoins();
  Bullets();
  if(superhero.isTouching(sGroup)){
    gameState=END;
  }
  }else if(gameState===END){
    superhero.destroy();
    sword.velocityX = 0;
    cGroup.destroyEach();
    bulletG.destroyEach();
    text("Game Over",300,300);
  }

 drawSprites();
 textSize(20);
 fill("black");
 stroke("Black");
 text("Score : " +score,displayWidth-240,30);
}

function spawnSwords(){
  if(frameCount%100===0){
    sword = createSprite(displayWidth-200,displayHeight,20,20);
    sword.addImage("Sword",swordImg);
    sword.scale = 0.2;
    sword.y = Math.round(random(50,700));
    sword.velocityX = -4;
    sword.lifetime = 230;
    sGroup.add(sword);
   }
}

function spawnCoins(){
  if(frameCount%100===0){
    coin = createSprite(displayWidth-50,displayHeight,20,20);
    coin.addImage("coin",coinImg);
    coin.scale = 0.3;
    coin.y = Math.round(random(50,700));
    coin.velocityX = -4;
    coin.lifetime = 230;
    cGroup.add(coin);
  }
}

// function SpawnBuilding(){
//   if(frameCount%100===0){

//   }
// }

function Bullets(){
  if(frameCount%100===0){
    bullet = createSprite(displayWidth-50,displayHeight,20,20);
    bullet.addImage("bullet",bulletImg);
    bullet.scale = 0.3;
    bullet.y = Math.round(random(50,700));
    bullet.velocityX = -4;
    bullet.lifetime = 230;
    bulletG.add(bullet);
  }
}

// make both class project and the Pro project as muliplayer game and as realtime database
// make buildings and bullets randomly appear at the screen
// Gamestate creation explanation;
// 
