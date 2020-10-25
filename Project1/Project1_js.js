//Blackjack GTame

let blackjackGame={
	"you":{"spanscore":"#yourscore","div":"#your-box","score":0},
	"dealer":{"spanscore":"#Dealerscore","div":"#Dealer-box","score":0},
	"cards":["2","3","4","5","6","7","8","9","10","A","J","K","Q"],
	"cardsMap":{"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"K":10,"J":10,"Q":10,"A":[1,11]},
  "wins":0,
  "losses":0,
  "draws":0,
  "isStand":false,
  "turnsOver":false,
};
const You=blackjackGame["you"];
const Dealer=blackjackGame["dealer"];
const hitsound=new Audio("sounds/swish.m4a");
const wonsound=new Audio("sounds/cash.mp3");
const lastsound=new Audio("sounds/aww.mp3");
document.querySelector("#hit-button").addEventListener("click",blackjackHit);
document.querySelector("#deal-button").addEventListener("click",blackjackdeal);
document.querySelector("#stand-button").addEventListener("click",dealerLogic);
x=document.getElementById("ad");
x.volume=0.2;
function blackjackHit()
{ 
  x.pause();
   if(blackjackGame["isStand"]==false)
   {
   let card=randomcard();
   showcard(card,You);
    Updatescore(card,You);
	showScore(You);
	 }
}
//function for wait process
 function sleep(ms){
  return new Promise(resolve => setTimeout(resolve,ms));
 }
async function dealerLogic()
{
  blackjackGame["isStand"]=true;
  if(blackjackGame["turnsOver"]==false)
  {
  while(Dealer["score"]<16 && blackjackGame["isStand"]==true)
  {
	let card=randomcard();
	showcard(card,Dealer);
	Updatescore(card,Dealer);
	showScore(Dealer);
   await sleep(400);
  }
  if(Dealer["score"]>15)
   {
    blackjackGame["turnsOver"]=true;
   let winner=computewinner();
   showResult(winner);
   }
  }
}
function blackjackdeal()
{  
  if(blackjackGame["turnsOver"]==true)
  {  
	  x.play();
	 let yourimg=document.querySelector(You["div"]).querySelectorAll("img");
	   for(let i=0;i<yourimg.length;i++)
	   {
	   	  yourimg[i].remove();
	   }
   let dealerimg=document.querySelector(Dealer["div"]).querySelectorAll("img");
	   for(let i=0;i<dealerimg.length;i++)
	   {
	   	  dealerimg[i].remove();
	   }
	     You["score"]=0;
	     Dealer["score"]=0;
       document.querySelector("#yourscore").textContent=0;
        document.querySelector("#Dealerscore").textContent=0;
        document.querySelector("#yourscore").style.color="white";
        document.querySelector("#Dealerscore").style.color="white";
        document.querySelector("#blackjackresult").textContent="Let's play";
         document.querySelector("#blackjackresult").style.color="black";
         blackjackGame["isStand"]=false;
         blackjackGame["turnsOver"]=false;
       }
}
function showcard(card,Activeplayer)
{  
	if(Activeplayer["score"]<=21)
	{
    let cardimage=document.createElement("img");
	cardimage.src=`images/${card}.png`;
	document.querySelector(Activeplayer["div"]).appendChild(cardimage);
	hitsound.play();
  }
}
function randomcard()
{
    return blackjackGame["cards"][Math.floor(Math.random()*13)];
}
function Updatescore(card ,Activeplayer)
{  
  //if adding 11 keeps me below 21 add  11,otherwise add 1
    if(card=="A")
      {
         if(Activeplayer["score"] + blackjackGame["cardsMap"][card][1]<=21){ 
         Activeplayer["score"] += blackjackGame["cardsMap"][card][1];
             }
     else{
   	   Activeplayer["score"] += blackjackGame["cardsMap"][card][0];
       }
   }
    else{
     Activeplayer["score"] += blackjackGame["cardsMap"][card];
    }
}
function showScore(Activeplayer)
{  
	if(Activeplayer["score"]>21)
	{
		document.querySelector(Activeplayer["spanscore"]).textContent="BUST!";
		document.querySelector(Activeplayer["spanscore"]).style.color="red";
	}
	else
	{
	document.querySelector(Activeplayer["spanscore"]).textContent=Activeplayer["score"];
   }
}
// compute winner and return winer
function computewinner()
{
let winner;
if(You["score"]<=21) {
      if(You["score"] >Dealer["score"]||Dealer["score"] >21 ){
  	  blackjackGame["wins"]++;
      winner="You";
          }
     else if(You["score"] <Dealer["score"]){
       	blackjackGame["losses"]++;
       	winner="Dealer";
        }
     else if (You["score"]==Dealer["score"]){
     	    blackjackGame["draws"]++;
           }
}
else if (You["score"]>21 && Dealer["score"]>21){
	     blackjackGame["draws"]++;
     }
else if(You["score"]>21 && Dealer["score"]<=21)
  {
  blackjackGame["losses"]++;
  winner="Dealer";
  }
return winner;
}

function showResult(winner)
{
  if(blackjackGame["turnsOver"]==true)
  {
	let message,messacolor;
	if(winner=="You")
	{
    document.querySelector("#wins").textContent=blackjackGame["wins"];
		message="Yow won!"
		messacolor="green";
		wonsound.play();
	}
	else if(winner=="Dealer")
	{
    document.querySelector("#losses").textContent=blackjackGame["losses"];
		message="You Last!"
		messacolor="red";
		lastsound.play();
	}
	else
	{
    document.querySelector("#draws").textContent=blackjackGame["draws"];
      console.log("Draw", blackjackGame["draws"]);
	  message="You Draw!";
	  messacolor="black";
  }
  document.querySelector("#blackjackresult").textContent=message;
   document.querySelector("#blackjackresult").style.color=messacolor;
  }
}
