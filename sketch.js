var dog, happyDog, database, foodS, foosStack;

function preload()
{
  dog1i = loadImage("images/dogImg.png");
  dog2i = loadImage("images/dogImg1.png");
}
function setup() {
  database=firebase.database();
  createCanvas(500,500);

  dog=createSprite(250,300,150,150);
  dog.addImage(dog1i);
  dog.scale=0.15;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  textSize(20); 
}


function draw() {  
  background("yellow");


  if(foodS!=undefined){
    if(keyDown(UP_ARROW)){
      dog.addImage(dog2i);
      writeStock();
    }

    textSize(20);
    fill("red");
    text("Dog food left: "+ foodS,150,200);
    text("Note: Press UP_ARROW Key To Feed Drago Milk!",20,50);
  }
  drawSprites();
}


function writeStock(){
  if(foodS <= 0){
  database.ref('/').update({
    Food:0
  }) }
  else {
    database.ref('/').update({
      Food:foodS-1
  })}
}

function readStock(data){
  foodS=data.val();
}
