var database ,dog,dog1,dog2,position
var feed,add
var foodobject
var Feedtime
var Lastfeed

function preload(){
  dogimg1 = loadImage("images/dogImg.png")
  dogimg2 = loadImage("images/dogImg1.png")
}

function setup() {
	createCanvas(900, 500);
  database = firebase.database();
 
  foodobject=new Foods()
  dog = createSprite(550,250,10,10);
  dog.addImage(dogimg1)
  dog.scale=0.2

  var doggy = database.ref('Food');
  doggy.on("value", readPosition);
  feed = createButton("FEED SHEFFY")
  feed.position(840,80)
  feed.mousePressed(FeedDog)
  add = createButton("ADD FOOD")
  add.position(750,80)
  add.mousePressed(AddFood)
} 

function draw(){
  background(46,139,87);
 foodobject.display()

fill(255,255,254);
textSize(15);

drawSprites();
}
function readPosition(data){
  position = data.val();
  foodobject.updateFoodStock(position)  
}

function writePosition(ace){
  if(ace>0){
    ace=ace-1
  }
  else{
    ace=0
  }
  database.ref('/').set({
    'Food': ace
  })

}
function AddFood(){

position++
database.ref('/').update({
  Food:position
})

}
function FeedDog(){

dog.addImage(dogimg2)
foodobject.updateFoodStock(foodobject.getFoodStock()-1)
 database.ref('/').update({
   Food:foodobject.getFoodStock(),
   FeedTime:hour ()
 })
}