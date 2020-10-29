//To create the game objects
var monkey , monkey_running,ground;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var Play=1;
var End=0;
var gameState=Play;
var SurvivalTime


function preload(){
  //To load the images and the animations in our game
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  
  obstacleImage = loadImage("obstacle.png");
}

function setup() {
  //To create the play area
  createCanvas(700,300);
  
  //TGo create the monkey with its image
  monkey=createSprite(60,246,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.1
  ground=createSprite(200,280,700,10);

  //making new group
  FoodGroup=createGroup();
  obstaclesGroup=createGroup();
  
  //colliding radius of the monkey
  monkey.setCollider("rectangle",60,0,10,monkey.height);
  
  //Initial score value 0
  score=0;
  
  //initial survival time 0
  SurvivalTime=0;     
}

function draw() {
  //To clear the play area or background colour
  background("skyblue");
  
  //To display the scoring and the survival timing sustem in our game
  textSize(20); 
  fill("black");
  text("Survival Time: "+SurvivalTime,100,50)
  
  text("Score: "+score,500,50);
  
   //When the ground will be less than 350 then it shold repeat
   if(ground.x<350){
    ground.x=ground.width/2;
   } 
   
   //The monkey will collide the ground
   monkey.collide(ground);
  
  //gravity of the monkey
   monkey.velocityY=monkey.velocityY+0.9;
  
  
  if(gameState===Play){ 
      
    //The surviving time of the monkey using frame rate
    SurvivalTime =  Math.ceil(frameCount/frameRate());
      
      
    obstacles(); 
    bananass();
    
    //When space will be pressed our monkey will jump
    if(keyDown("space")&&monkey.y>=240){
      monkey.velocityY=-17;   
    }
    
    //When the monkey will touch the fruit it will be destroyed and       the monkey will get a score
    if(FoodGroup.isTouching(monkey)){
      FoodGroup.destroyEach();
      score=score+1;
    }
    
    //when monkey will touch the obstacles group then the state will       be end state
    if(obstaclesGroup.isTouching(monkey)){
      gameState=End;  
    }    
  }
  else if(gameState===End){
    
     ground.velocityX=0;
      
     obstaclesGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0);
    
     text("Press R to restart",250,150);
     
     //When our monkey will touch one obstacles then the rest of the        bananas and obstacles will not disappear
     obstaclesGroup.setLifetimeEach(-1);
     FoodGroup.setLifetimeEach(-1);
      
     //When r will be pressed then our game should again come to play      state
    if(keyDown("r")&&gameState===End){
      reset();
    }  
 } 
  
  drawSprites();    
}

//Function for creating the bananas
function bananass(){
  if(frameCount%80===0){
    banana=createSprite(700,100,30,30);
    
    banana.addImage(bananaImage);
    banana.scale=0.1;
    
    banana.velocityX=-11;
    banana.y=Math.round(random(80,250));
    
    banana.lifetime=200;
    
    FoodGroup.add(banana);
  }
}

//function for creating the obstacles
function obstacles(){
  if(frameCount%300===0){
    obstacle=createSprite(700,245,30,30);
    
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.2;
    
    obstacle.velocityX=-9;
    
    obstacle.lifetime=200;
    
    obstaclesGroup.add(obstacle);   
  }    
}
 
//function for reset
function reset(){
   gameState=Play;
   
   obstaclesGroup.destroyEach();
   FoodGroup.destroyEach();
  
   SurvivalTime=0; 
  
   score=0;
}


