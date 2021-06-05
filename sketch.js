var helicopterIMG, helicopterSprite, packageSprite,packageIMG;
var packageBody,ground
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{
	helicopterIMG=loadImage("helicopter.png")
	packageIMG=loadImage("package.png")
}

function setup() {
	createCanvas(800, 700);
	rectMode(CENTER);

	//creating the package sprite
	packageSprite=createSprite(width/2, 80, 10,10);
	packageSprite.addImage(packageIMG)
	packageSprite.scale=0.2

	//creating the helicopter sprite
	helicopterSprite=createSprite(width/2, 200, 10,10);
	helicopterSprite.addImage(helicopterIMG)
	helicopterSprite.scale=0.6

	//creating the ground sprite
	groundSprite=createSprite(width/2, height-35, width,10);
	groundSprite.shapeColor=color(255)

	//creating the engine and the world
	engine = Engine.create();
	world = engine.world;

	//creating the package body and adding it to the world
	packageBody = Bodies.circle(width/2 , 200 , 5 , {restitution:0.4, isStatic:true});
	World.add(world, packageBody);
	
	//creating the ground body and adding it to the world
	ground = Bodies.rectangle(width/2, 650, width, 10 , {isStatic:true} );
 	World.add(world, ground);

	//giving the position for the box
 	boxPosition=width/2-100
 	boxY=610;
	
	//creating the sprite for the left wall of the box
 	boxLeftSprite=createSprite(boxPosition, boxY, 20,100);
 	boxLeftSprite.shapeColor=color(255,0,0);

	//creating the body for the left wall of the box
 	boxLeftBody = Bodies.rectangle(boxPosition+20, boxY, 20,100 , {isStatic:true} );
 	World.add(world, boxLeftBody);

	//creating the sprite for the base of the box
 	boxBase=createSprite(boxPosition+100, boxY+40, 200,20);
 	boxBase.shapeColor=color(255,0,0);
	
	//creating the body for the base of the box
 	boxBottomBody = Bodies.rectangle(boxPosition+100, boxY+45-20, 200,20 , {isStatic:true} );
 	World.add(world, boxBottomBody);

	//creating the sprite for the right wall of the box
 	boxRightSprite=createSprite(boxPosition+200 , boxY, 20,100);
 	boxRightSprite.shapeColor=color(255,0,0);
	
	//creating the body for the right wall of the box
 	boxRightBody = Bodies.rectangle(boxPosition+200-20 , boxY, 20,100 , {isStatic:true} );
 	World.add(world, boxRightBody);
	
	//telling the engine to run
	Engine.run(engine);
}


function draw() {
  rectMode(CENTER);
  background(0);

  //making the package sprite and the package body have the same position
  packageSprite.x = packageBody.position.x
  packageSprite.y = packageBody.position.y

  //making it so that when the left arrow is pressed, the helicopterSprite should move to the left and the package body should move with it
  if(keyCode === LEFT_ARROW){
	  helicopterSprite.x = helicopterSprite.x - 10;
	  Matter.Body.translate(packageBody, {x: -10, y: 0});
  }

  //making it so that when the left arrow is pressed, the helicopterSprite should move to the right and the package body should move with it
  if(keyCode === RIGHT_ARROW){
	  helicopterSprite.x = helicopterSprite.x + 10;
	  Matter.Body.translate(packageBody, {x: +10, y: 0})
  }

  //making it so that when the down arrow is pressed, the package will fall off the helicopter
  if(keyCode === DOWN_ARROW){
	  Matter.Body.setStatic(packageBody,false);
  }

  drawSprites();
}
