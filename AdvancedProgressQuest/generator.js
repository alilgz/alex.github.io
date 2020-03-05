
/* TEXT DATA  */

var wordsData1="umbrella;carrot;toy;map;bullet;tea;razor;journal;table;stomach;paw;leg;dice";
var wordsData2="finger;bag;avocado;powder;moss;chair;slug;lever;jigsaw;oar;pretzel";
var wordDetails1="chocolate;leather;folding;iron;wooden;dirty;broken;fine;big;strong;balanced;breathing;thin";

var monsterNames="ant;rat;spider;wolf;bear;zombie;dragon";
var monsterDetails="old;weak;young;;big;scary";

var equipmentData={};

    equipmentData["hands"]="straps;gloves;gauntlets";
    equipmentData["head"]="hat;circlet;helmet;crown;bascinet";
    equipmentData["foot"]="sandals;boots";
    equipmentData["body"]="armor;jacket;plate armor";
    equipmentData["weapon"]="dagger;sword;bow;spear;pistol";
    equipmentData["armor_grades"]="cloth;leather;rusty;iron;bronse;silver;steel;mithril";
    equipmentData["weapon_grades"]="iron;gold;silver;steel;crystal;magic";


function myRandom(){

}
myRandom.getRND=function(max){
   return Math.floor(Math.random() * Math.floor(max));
}


function GameGenerator(){

}


GameGenerator.prototype={
    constructor:GameGenerator,

    MaxLevel:function(){ return 20; },
    ToNewLevel(level){ 
        return 200*(level+1);
    },
    
    /* TASKS  */
    getTaskHunt:function(monster)
    {
        return new Task("Hunting " + monster.Name, 20, monster,"hunt" );
    },

    getTaskSell:function(luck, level){
        return new Task("Selling loot", 5, 22*level , "sell" );
    },

    getTaskBuy:function(luck, level){
        return new Task("Buying new gear", 5, this.giveRandomEquip(100, level) , "buy" );
    },
    

    /* monsters */

    getMonster:function(level)
        {
            if (level<1) level=1;
            return new Monster(this.RandomMonsterName(level), 5*level, 1.3*level, 2.3*level, this.GetItems(level), 25*level);
        },


    /* NAMES  */

    
    RandomName: function(level, list1,list2)
        {
            if (level<1) level=1;
        var count1 = (list1.match(/;/g) || []).length;
        var count2 = (list2.match(/;/g) || []).length;
        // except max level 20
        var maxLevel = this.MaxLevel();
        var random_index1 = Math.floor(        (count1  / maxLevel) *  Math.random() * level);
        var random_index2 = Math.floor(        (count2  / maxLevel) *  Math.random() * level);
        var lootName= list1.split(';')[random_index1]  + " "  +  list2.split(';')[random_index2];
        
        return lootName ;
        },

    RandomMonsterName:function(level)
        {
            return this.RandomName(level,monsterDetails, monsterNames  );
        },



    /* LOOT */

    RandomItem: function(level, list1,list2, lootType){
        var count1 = (list1.match(/;/g) || []).length;
        var count2 = (list2.match(/;/g) || []).length;
        
        var lootName= list1.split(';')[Math.floor(Math.random()*count1)] 
                + " "
           +  list2.split(';')[Math.floor(Math.random()*count2)];
        
           var attackValue = lootType=="weapon" ? 2*level :  0;
            var defValue = lootType=="head" ||  lootType=="foot" ? 2*level :  (lootType=="body" ||  lootType=="hand"  ? 3*level:0);
        return new Loot(lootName , lootType,  attackValue , 5,100) ;
        },

    /* SPECIFIC EQUIP */    

        RandomGlove: function(level)
        {
           return this.RandomItem(level,equipmentData["armor_grades"],equipmentData["hands"],"hand");
        },
         RandomBoots: function(level)
        {
           return this.RandomItem(level,equipmentData["armor_grades"],equipmentData["foot"],"foot");
        },
         RandomArmor: function(level)
         {
           return this.RandomItem(level,equipmentData["armor_grades"],equipmentData["body"], "body");
        },
         RandomHat: function(level)
         {
           return this.RandomItem(level,equipmentData["armor_grades"],equipmentData["head"], "head");
        },
         RandomWeapon: function(level)
         {
           return this.RandomItem(level,equipmentData["weapon_grades"],equipmentData["weapon"],'weapon');
        },

        giveRandomEquip:function(cost,level)
        {
            var i =myRandom.getRND(6);
            switch(i){
            
              case 0:
               return this.RandomBoots(level);
              case 1:
               return this.RandomGlove(level);
              case 2:
               return this.RandomBoots(level);
              case 3:
               return this.RandomArmor(level);
              case 4:
               return this.RandomWeapon(level);
              case 5:
               return this.RandomHat(level);
               default:
               return this.RandomHat(level);
            
               
            }
        },

        GetItems:function(level){
                return this.giveRandomEquip(100, level);
        }






}

