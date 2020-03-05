


var game ; 
var myUI ; 

var generator;
var taskGiver ;
var rewardGiver ;
var lootDropper ;


 


function UI(){
// name, race
   this.character = $("#Character");
 this.charName = $("#Name");
 this.charRace = $("#Race");
 this.charClass = $("#Class");
 this.Level = $("#Level");
 this.Exp = $("#Exp");

 // stats 
 this.charSTR = $("#STR");
 this.charDEX = $("#DEX");
 this.charCON = $("#CON");
 this.charINT = $("#INT");
 // todo: Atk, Def, HP, Max HP
 

 //progress
 this.taskProgress = $("#taskProgress");
 this.taskName = $("#taskName");

 // later
 this.inventory = $("#Inventory");
 this.equip = $("#Equip");
 this.quests = $("#QuestLog");
 // todo: log 
 
 
}


UI.prototype = {
   constructor: UI,
   Refresh:function (gamer)  {
        this.charName.text('Name:' + gamer.Name);
   this.charRace.text('Race:' + gamer.Race);
   this.charClass.text('Class:' + gamer.Class);
   this.Level.text('Level:' + gamer.Level);
   this.Exp.text('Exp:' + gamer.Exp + ' of ' + generator.ToNewLevel(gamer.Level) );
   
   this.charSTR.text("STR " + gamer.STR);
   this.charDEX.text("DEX " + gamer.DEX);
   this.charCON.text("CON " + gamer.CON);
   this.charINT.text("INT " + gamer.INT);
       
   // initiate with gold amount
   this.inventory.html( "<span> Gold: "+gamer.Gold +"</span>")  ;
   var dict = {};

   gamer.Loot.forEach(el=>{
   
  // console.log(el);
    if (dict[el]==undefined){
    dict[el]=1;
    } else{
    dict[el]++;
    }});
    //GOLD!
    
     
     
    gamer.Loot.forEach(el=>{
    if (dict[el]!=undefined){
     this.inventory.html( 
     this.inventory.html()+
             "<span>"+el +":"+dict[el]+"</span>")  ;
       dict[el]=undefined;
       }
       }) ;


       var questStr="";

 if (gamer.quest!=undefined && gamer.quest.length>0){
    gamer.quest.forEach(el=>{
      questStr+="<span>"+el.Name+"</span>"  ;
        });
    }
     this.quests.html(questStr)
       



// equiment

this.equip.html(""
   + "<span> Head: "+( typeof gamer.Equip['head'] ==='object' ?  (gamer.Equip['head'].GetName()) : gamer.Equip['head']) +"</span>"
   + "<span> Weapon: "+( typeof gamer.Equip['weapon'] ==='object' ?  gamer.Equip['weapon'].GetName() : gamer.Equip['weapon']) +"</span>"
   + "<span> Gloves: "+( typeof gamer.Equip['hand'] ==='object' ?  gamer.Equip['hand'].GetName() : gamer.Equip['hand']) +"</span>"
   + "<span> Body: "+ ( typeof gamer.Equip['body'] ==='object' ?  gamer.Equip['body'].GetName() : gamer.Equip['body']) +"</span>"
   + "<span> Foots: "+ ( typeof gamer.Equip['foot'] ==='object' ?  gamer.Equip['foot'].GetName() : gamer.Equip['foot'])  +"</span>"
 )  ;

   
   // current task
   
     if (gamer.HasTask)
     {
      this.taskName.text( gamer.currentTask !=undefined ?   gamer.currentTask.Name: "");
        this.taskProgress.text(  gamer.TaskProgress + ' of '+ gamer.TaskMax );

     } else {
           this.taskName.text( ( gamer.currentTask !=undefined ?   gamer.currentTask.Name: "" ) + ': Done!');
           this.taskProgress.text('');
    }

}
};



function Game() 
{
   this.Name='Kek';
   this.Race='half-kek';

   this.Level=1;
   this.Exp=0;

   this.STR=11;
   this.CON=21;
   this.DEX=10;
   this.INT=1;
  
  this.HasTask=false;
  this.TaskProgress=0;
  this.TaskMax=0;
  this.Loot=[];
  this.Gold=0;
  this.quests=[];
  
  this.Equip={};
  this.Equip.hand= new Loot('-','',0,0,0);
  this.Equip.foot= new Loot('-','',0,0,0);
  this.Equip.head= new Loot('-','',0,0,0);
  this.Equip.body= new Loot('-','',0,0,0);
  this.Equip.weapon= new Loot('stick','weapon',3,0,0);
  
}

Game.prototype = {
   constructor: Game,
       start: function() 
   {
   
       this.Name=$('#char_Name').val();
     this.Race=$('#char_Race').val();
     this.Class=$('#char_Class').val();
   


   myUI.Refresh(this);
   var gamer = this;
          window.setInterval(function(){
          gamer.MakeTurn();
         myUI.Refresh( gamer);
       }, 200);
   
       },
   MakeTurn: function(){
   
   
       if (this.HasTask)
     {
     
         this.TaskProgress++;
       if (this.TaskProgress == this.TaskMax)
       {
       
           //stop task
         this.HasTask=false;
         this.TaskProgress=0;
           // give reward 
           console.log("ApplyReward for :");
           console.log(this.currentTask);

           if (this.currentTask.TaskType=="hunt"){
               //add exp
               game.AddExp(this.currentTask.Reward.Exp);
               this.ApplyReward(this.ExpectedReward);
           }

           if (this.currentTask.TaskType=="sell"){
                //add exp
                console.log(this.currentTask);
                console.log(this.currentTask.Reward);
              game.ApplyReward(this.currentTask.Reward);
            }

            if (this.currentTask.TaskType=="buy"){
                //add gear
                game.ApplyReward(this.currentTask.Reward);
            }
    
       
       myUI.Refresh(this);
       }
     } else {
     //console.log(this.Loot.length);
     
     if (!this.HasTask && this.Gold > 20){
         console.log(this);
         this.HasTask=true;
      this.currentTask =  new Task( "Buying new gear", 5, rewardGiver.giveRandomEquip(), "buy");
      this.TaskProgress = 0;
      this.TaskMax = 10;
      var goldAmount = this.Gold;
             this.Gold=0;
        this.ExpectedReward = generator.giveRandomEquip(game.level, 100);
      console.log("Expected equip  Reward");
      console.log(this.ExpectedReward);
     }
     
     if (!this.HasTask && this.Loot.length>5){
      this.HasTask=true;
      this.currentTask = new Task( "Selling all drop", 5, rewardGiver.giveGold( 111 ), "sell");
      this.TaskProgress = 0;
      this.TaskMax = 20;
      var goldreward = this.Loot.length * 2  
                              + myRandom.getRND(100) 
                             + myRandom.getRND(25)  ;
      this.Loot=[];
              this.ExpectedReward=rewardGiver.giveGold( goldreward );
                   //console.log("Reward:" , this.ExpectedReward);
     } else{
      // give new random task
      this.HasTask=true;
      var RandomTask = taskGiver.getRandomTask();
      console.log("new task:");
      console.log( RandomTask );
      this.currentTask = RandomTask;
      this.TaskProgress = 0;
      this.TaskMax = RandomTask.Max;
      // depends of type TBH
      if (RandomTask.TaskType=="hunt")
      {
      this.ExpectedReward=RandomTask.Reward.Drop;
      }
     }
     }
     
   },
   /* ADD REWARD TO USER */
   ApplyReward: function(someReward){
   console.log("ApplyReward inside");
   console.log(someReward);
   
    switch(someReward.Type){
     case 'stat': 
         this.AddStat(someReward.Name, someReward.Amount);
         break;
     case 'drop': 
     this.AddLoot(someReward.Name);
         break;
    case "equip": 
    case "hand": 
    case "head": 
    case "weapon": 
    case "foot": 
    case "body": 
    console.log("equip");
    console.log(someReward);
          this.AddGear(someReward);
         break;
    case 'gold': 
       
         break;

    }
   },
   AddGold:function(amount)
   {
    this.Gold+=amount;
   },
   AddLoot: function(item)    {
       this.Loot.push(item.Name);
   },
   AddStat: function(statName, statValue){
   // le debug 
   //this.Loot.push(statName);
   //console.log(statName);
   //console.log(this.Loot);
       switch(statName){
     case 'STR':
         this.STR+=statValue;
         break;
     case 'DEX':
         this.DEX+=statValue;
         break;
     case 'CON':
         this.CON+=statValue;
         break;
     case 'INT':
         this.INT+=statValue;
         break;
     }
   },
   AddExp(exp){

    game.Exp+=exp;
    console.log("exp added: "+ exp );
    if (game.Exp > generator.ToNewLevel(game.Level))
    {
        game.Exp =  game.Exp - generator.ToNewLevel(game.Level)  ;
        game.Level++;
        console.log("Level increased!");
    }
    
   },
   AddQuest:function(quest){
       this.quests.push(quest);
   },
   ImproveQuest:function(num){
       this.quests[num].AddProgress();
   },
   AddGear: function(item)  {
   // move old to loot
   console.log('AddGear:');
   console.log(item);


   
   if (this.Equip[item.Type]!='-' && this.Equip[item.Type].Name!='-')
     {
         this.Loot.push(this.Equip[item.Type].Name); // later push real item 
     }
       this.Equip[item.Type] = item;
   },

   
}



function Task(taskName,taskComplexity,taskReward,taskType)
{
    this.Name=taskName;
    this.Progress=0;
    this.Max=taskComplexity;
    this.Reward=taskReward;
    this.TaskType=taskType;
};


// task types 

// 1. hunt monster  -> fight procedure , reward = exp, next task  = get loot
// 2. get loot from monster , reward = monster inventory, quest items, next task = decide by logic
// 3. selling crap items, reward = gold , next task = by logic  
// 4. buying new equipment, reward = equip upgrade/replace,   next task = by logic  
// 5. learning new skill, reward = new skill or existing level up,   next task = by logic    
// 


Task.prototype = {
   constructor: Task,

      
       getRandomTask: function() {

   var i =myRandom.getRND(4);
       switch(i){
      case 0:
       return generator.getTaskHunt(generator.getMonster(game.Level))
      case 1:
        return generator.getTaskHunt(generator.getMonster(game.Level+1))
      case 2:
        return generator.getTaskHunt(generator.getMonster(game.Level+2))
      case 3:
        return generator.getTaskHunt(generator.getMonster(game.Level-1))
 
       
       default:
           return new Task("Farming some vegetables",10, 
                 rewardGiver.giveStat('CON',1));
     }
   }
};

function Reward(type, name,  amount)
{
 this.Type=type;
 this.Name=name;
 this.Amount=amount;
}


Reward.prototype = {
   constructor: Reward,
       giveStat: function(stat,amount) {
       return new Reward('stat', stat,amount );
   },
       giveDrop: function(name, amount) {
       return new Reward('drop', name,amount );
   },
     giveGear: function(itemtype, name) {
       return new Reward('equip', name , itemtype);
   },
   giveGold: function(amount) {
       return new Reward('gold', amount , amount);
   }, 
   giveRandomEquip:function(gear){
   
   //console.log('giveRandomEquip:function(gear){');
   //console.log(gear);
   return new Reward('equip', gear.Name, gear.Type ) ;
   }
   };


function Loot(name, type='drop', atk=0, def=0, cost=0)
{
this.Name=name;
this.Type=type;
this.Atk=atk;
this.Def=def;
this.Cost=cost;
}

Loot.prototype={
constructor:Loot, 
GetName:function(){
    
    var stat="Def: "+this.Def;

    if (this.Type=="weapon"){
         stat = "Atk: "+this.Atk;
    }
 return this.Name + "["+stat+"]";
},
 RandomItem1: function(){
var count = (wordsData1.match(/;/g) || []).length;
return new Loot(wordsData1.split(';')[Math.floor(Math.random()*count)]);
},
 RandomItem2: function(){
var count = (wordsData2.match(/;/g) || []).length;
return new Loot(wordsData2.split(';')[Math.floor(Math.random()*count)]);
},
 RandomItem3: function(){
var count1 = (wordsData1.match(/;/g) || []).length;
var count2 = (wordDetails1.match(/;/g) || []).length;
return new Loot(
  wordDetails1.split(';')[Math.floor(Math.random()*count2)]
    +" " +
   wordsData1.split(';')[Math.floor(Math.random()*count1)]
 
);
},
 RandomItem4: function(){
var count1 = (wordsData2.match(/;/g) || []).length;
var count2 = (wordDetails1.match(/;/g) || []).length;
return new Loot(
wordDetails1.split(';')[Math.floor(Math.random()*count2)]
    +" " +
 wordsData2.split(';')[Math.floor(Math.random()*count1)]
 
);
},
 
 

}




function Monster(name, hp, atk, def, itemz,exp ){
    this.Name=name;
    this.MaxHP=hp;
    this.HP=hp;
    this.Atk=atk;
    this.Def=def;
    this.Drop=itemz;
    this.Exp=exp;

}

Monster.prototype={
    constructor:Monster,
    atackPlayer:function(){
        return this.atk;
    },
    atackedByPlayer:function(dmg){
        this.HP-=dmg;
    },
    isDead:function()
    {
        return this.HP<=0;
    }

}




function Quest(name, size){
 this.Name=name;
 this.Size=size;
 this.progress=0;
}

Quest.prototype={
constructor:Quest, 
Generate:function(str){
 return new Quest(str,5);
},
AddProgress:function(){
   this.progress++;
},
isDone:function(){
return this.progress>=this.Size;
}

}



$(document).ready(function(){

 game = new Game(); 
 myUI = new UI(); 
 taskGiver = new Task('my task giver',2);
 rewardGiver = new Reward('my reward giver',2);
 lootDropper = new Loot('invisible mob');
 generator = new GameGenerator();
$('.column').hide();

$('#start_game').click(function(){
   $('.column').show();
   $('.popup').hide();
   game.start();
});

});
