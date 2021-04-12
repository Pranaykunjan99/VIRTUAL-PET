var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feedFood;

//create feed and lastFed variable here
var feed;
var lastFed;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("AddFood");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  feedFood=createButton("FeedDog");
  feedFood.position(710,95);
  feedFood.mousePressed(feedDog);


  

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  var feedTime=database.ref('FeedTime').on("value",function(data){
    lastFed=data.val()
    console.log(lastFed);
  })
      
 
  //write code to display text lastFed time here
  fill("white")
  //text("lastFedTime",300,40)
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
  if(lastFed>=12){
    fill("red")
    text("Last Feed : 12PM",350,30);
  }
  else if(lastFed===0){
    text("Last Feed : 12AM",350,30);
  }else{ 
     text("Last Feed: 12AM",350,30)
  }


  //write code here to update food stock and last fed time
var food_stock_val=foodObj.getFoodstock();
if(food_stock_val<=0){
  foodObj.updateFoodStock(food_stock_val *0);
}else{
  foodObj.updateFoodStock(food_stock_val -1);
}
}


//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
  