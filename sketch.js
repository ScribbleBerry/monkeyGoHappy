var monkeyRunImg, monkeyPauseImg, stoneImg, bananaImg, jungleImg;
var jungle, monkey, stoneGroup, bananaGroup, invisibleGround, score;
var gameOver, gameOver_img, restart, restart_img;
var PLAY = 1, END = 0;
var gameState = PLAY;
var life;


function preload(){
  jungleImg = loadImage("images/jungle.jpg");
  bananaImg = loadImage("images/banana.png");
  stoneImg = loadImage("images/stone.png");
  monkeyRunImg = loadAnimation(
    "images/Monkey_01.png", 
    "images/Monkey_02.png", 
    "images/Monkey_03.png", 
    "images/Monkey_04.png",
    "images/Monkey_05.png",
    "images/Monkey_06.png",
    "images/Monkey_07.png",
    "images/Monkey_08.png",
    "images/Monkey_09.png",
    "images/Monkey_10.png"
  )
  monkeyPauseImg = loadImage("images/Monkey_01.png")

  gameOver_img = loadImage("images/gameOver.png");
  restart_img = loadImage("images/restart.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  jungle = createSprite(0, 0, windowWidth, windowHeight);
  jungle.addImage(jungleImg);
  jungle.scale = 2.5;
  jungle.x = jungle.width/2

  invisibleGround = createSprite(windowWidth/ 2, windowHeight-150, windowWidth, 30);
  invisibleGround.visible = false;

  bananaGroup = new Group()
  stoneGroup = new Group()

  monkey = createSprite(windowWidth/8, windowHeight/2, 50, 50);
  monkey.addAnimation("running", monkeyRunImg);
  monkey.addImage("pause", monkeyPauseImg);
  monkey.scale = 0.2

  score = 0

  gameOver = createSprite(displayWidth / 2, displayHeight / 4 - 100, 10, 10);
  gameOver.addImage("gameOver", gameOver_img);
  gameOver.scale = 0.5;

  restart = createSprite(displayWidth / 2, displayHeight / 2 - 70, 0, 0);
  restart.addImage("reset", restart_img);
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;

  life = 3
}

function draw() {

  background(255,255,255);  

  if (gameState == PLAY) {

    jungle.velocityX = -1;

    if(jungle.x < 300){
      jungle.x = jungle.width/2
    }

    if(keyDown("space") && monkey.y > windowHeight/2 - 100){
      monkey.velocityY = -13
    }

    monkey.velocityY = monkey.velocityY + 0.8
    monkey.collide(invisibleGround)

    spawnBanana()
    spawnStone()

    if(monkey.isTouching(stoneGroup)){
      monkey.scale = 0.2
      life = life - 1
      stoneGroup.destroyEach()
    }

    if (monkey.isTouching(bananaGroup)){
      score +=1
      bananaGroup.destroyEach()
    }

    if (life == 0){
      gameState = END;
    }

    switch(score){
      case 10: monkey.scale = 0.22
      break;
      case 20: monkey.scale = 0.24
      break;
      case 30: monkey.scale = 0.26
      break;
      case 40: monkey.scale = 0.28
      break;
      default: break;
    }
    jungle.velocityX = -(6 + score / 10);
  }
  else if(gameState == END) {
    gameOver.visible = true;
    restart.visible = true;

    jungle.velocityX = 0;
    monkey.velocityY = 0;
    stoneGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);

    stoneGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);

    monkey.changeAnimation("pause",monkeyPauseImg);

    if (mousePressedOver(restart)) {
      reset();
    }
  }

  drawSprites();

  fill("white")
  textSize(30)
  text("Score: " + score, windowWidth/10 , windowHeight/7)
  text("Life: " + life, windowWidth/10, windowHeight/6 + 20)
}

function spawnBanana(){
  if(frameCount % 600 == 0){
    var banana = createSprite(windowWidth, windowHeight/2, 20, 20);
    banana.addImage(bananaImg);
    banana.velocityX = -7
    banana.y = Math.round(random(windowHeight/2, windowHeight/6))
    banana.scale = 0.1
    banana.lifetime = windowWidth
    bananaGroup.add(banana);
  }
}

function spawnStone(){
  if(frameCount % 250 == 0){
    var stone = createSprite(windowWidth, windowHeight/2 + 150, 30, 30);
    stone.addImage(stoneImg)
    stone.velocityX = -4
    stone.scale = 0.5
    stone.lifetime = windowWidth
    stoneGroup.add(stone)
  }
}
function reset(){
  gameState = PLAY
  restart.visible = false;
  gameOver.visible = false;
  life = 3
  score = 0
  monkey.changeAnimation("running", monkeyRunImg)
}