// story: the bird has left it's home to learn to live an independednt life. It's mother said that 
// resisting is the first step toward living independently so the bird mustn't stop at any land it comes accross 
// or it will lose sight of it's goal.


var bird, birdAni, bird_collide, bird_collideImg
var obstacleGroup, obstacleImg
var restart, gameOver, restartImg, gameOverImg
var life1, lifeImg, life_lost1, life_lostImg
var life2, life_lost2
var life3, life_lost3
var grassland, grasslandImg
var arrowKeys, arrowKeysImg
var coins, coinsAni
var coinScore = 0
var invisible
var gameOver, gameOverImg, restart, resetImg
var coinsGroup
var sky
var score = 0
var PLAY = 0
var END = 1
var gameState = PLAY


function preload() {
  sky = loadImage("sky.png")
  grasslandImg = loadImage("grassland.png")
  birdAni = loadAnimation("bird1.png", "bird2.png", "bird3.png", "bird4.png", "bird5.png", "bird6.png", "bird7.png", "bird8.png")
  arrowKeysImg = loadImage("arrows.png")
  obstacleImg = loadImage("obstacle.png")
  bird_collideImg = loadImage("bird_collide.png")
  gameOverImg = loadImage("gameOver.png")
  resetImg = loadImage("restart.png")
  coinsAni = loadAnimation("coin1.png", "coin2.png", "coin3.png", "coin4.png", "coin5.png");
  lifeImg = loadImage("life full.png")
  life_lostImg = loadImage("life lost.png")

}

function setup() {
  createCanvas(windowWidth,windowHeight);

  grassland = createSprite(width/2, (windowHeight/2) +25, windowWidth, 190 )
  grassland.addImage(grasslandImg)
  grassland.scale = 9

  invisible = createSprite(width/2, (windowHeight/2) +350, windowWidth, 400 )
  invisible.visible = false


  bird = createSprite(width/2 -500, windowHeight/2 , 20,20)
  bird.addAnimation("fly", birdAni)


  restart = createSprite(width/2, windowHeight/2 + 50, 20, 20)
  restart.addImage(resetImg)
  restart.scale = 0.7

  gameOver = createSprite(width/2, windowHeight/2 - 50, 20,20)
  gameOver.addImage(gameOverImg)
  gameOver.scale = 1

  coins = createSprite(width/2 - 627, windowHeight/2 - 300)
  coins.addAnimation("coin", coinsAni)
  coins.scale = 0.2

  

  

  obstacleGroup = createGroup();
  coinsGroup = createGroup();

}

function draw() {
  background(sky);  


  console.log(frameCount)



  fill("black")
  textSize(20)
  text("Use your space bar to rise up and release it to fall down", width/2 - 640, windowHeight/2 - 330)

  text(": " + coinScore, windowHeight/2 - 312, width/2 - 592);
  text("Score: "+score, width/2 + 530, windowHeight/2 - 330)

  

  if (gameState === PLAY) {
    
    if (grassland.x < 0) {
      grassland.x = grassland.width/2;
    }
    grassland.velocityX = -7
  
    gameOver.visible = false
    restart.visible = false
    
    if(keyDown("space")) {
      bird.velocityY = -10
    }

    if(frameCount%20 === 0) {
       score = score+1
    }

  spawnObstacles();
  spawnCoins();
  bird.collide(invisible)

  if (coinsGroup.isTouching(bird)) {
    coinScore = coinScore+1
    coinsGroup.destroyEach();
  }
  
    if (obstacleGroup.isTouching(bird)) {
      gameState = END
    }

  }


  else if (gameState === END) {

    bird.velocityY = +10

    grassland.velocityX = 0

    gameOver.visible = true
    restart.visible = true
  
    obstacleGroup.setVelocityXEach(0)
    coinsGroup.setVelocityXEach(0)
    obstacleGroup.setLifetimeEach(-1)
    coinsGroup.setLifetimeEach(-1)

    if(mousePressedOver(restart)) {
      reset();
    }
  }

  bird.velocityY = bird.velocityY + 0.8
  


  
  drawSprites();

}


function spawnObstacles() {
  if (frameCount % 100 === 0) {
    var obstacle = createSprite(width/2 +650, windowHeight/2, 20, 20)
    obstacle.y = Math.round(random(120,500))
    obstacle.addImage(obstacleImg)
    obstacle.scale=0.1
    obstacle.velocityX = -6
    obstacle.lifetime = 400
    obstacle.depth = gameOver.depth-1
    bird.depth = obstacle.depth +1
    bird.depth = gameOver.depth +1
    bird.depth = restart.depth +1
    restart.depth = obstacle.depth +1
    obstacleGroup.add(obstacle);
  }
}


function reset() {
  obstacleGroup.destroyEach();
  coinsGroup.destroyEach();
  bird.x = width/2 - 400
  bird.y = windowHeight/2
  gameOver.visible = false
  restart.visible = false
  coinScore = 0
  score = 0
  gameState = PLAY
}

function spawnCoins() {
  if (frameCount%400 === 0) {
    var coin = createSprite(width/2 +650, windowHeight/2)
    coin.addAnimation("coin", coinsAni)
    coin.scale = 0.2
    coin.y = Math.round(random(120,500)) 
    coin.velocityX = -7
    coin.lifetime = 400
    bird.depth = coin.depth +1
    coinsGroup.add(coin)

  }
}