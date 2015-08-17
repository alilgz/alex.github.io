// todo
//1: global increase mobs power 
//2: classes and specific spawns : aoe, sneak, mini bosses, traps, mimics
// classes: rogue, warrior, mage
// rogue: better sneak, better crit, see traps, weak normal damage, can distance, good steal
// warrior: can aoe with spear weapon, good armor, bad sneak, good normal atk, better regen
// mage : have learnable skills for sneak, see traps, strong aoe, can summon pet 
// add 'skill' amulets
//3: different weapons-armor: for range/aoe 
// have bow: available ranged attack
// have polearm: can hit all mobs in range
// have cloak: can sneak better
//4: class skills
//specfic npc to learn skills
//skill books?
//5: better interface + icons
//6: rewrite with outer functions

 
(function(elid, wi, he, exp, pot, gld, hp, lvl, cur_e, e_sz){
    var AtkBonus=1;
    var DefBonus=1;
    var MaxHP=100;
    
    var IMHP=12;
    var IMAtk=13;
    var IMXP=14;
    var IMGold=15;
    
    //talents array: 3 active , 2 passive
    // can be learn by other class[?], better multipliers for specified class
    
    // mechanism to skill learn
    // 0. always available 
    // 1. by level
    // 2. buy for $$
    // 3. spell books (for unique skill or upgrades)
    // 4. Skill Points per level or Per Mob
    
    // need mechanism to avoid 'best skill' spam:
    // 0. why avoid? want me add random effects?
    // 1. mana
    // 2. reuse
    // 3. required items
    // 4. drop/xp penalty ?
    
    
    
    // knight 
    // passive: spikes - reflect % of received  damage 
    // passive: shield block - receive less damage, lesser crits from mob
    // make only one passive ? - reflect or decrease dmg
    // good hp regen? more hp from pots? potion mastery?
    // 1 knockdown - no damage from mob if success
    // 2 : ?
    // 3 : ?
    
    
    // rogue
    // passive: better avoid crits/ avoid normal damage
    // passive: sneak chance, steal chance++
    
    // acive : move behind and stab x2
    // active: decrease mob power/accuracy ?
        
    //mage
    // mana shield: ??
    // add mana ? can craft pots?
    // levitate: first attack from mob - 0 dmg, because mage levitate
    // charge : cast long skill - receive x2 damage, but make x4 
    // can run from mob easy
    // must be best with aoe
    // debuff mob?
    
    
    
    // mobs 
    // 0. add suffixes and multipliers
    // 1. add drop potions
    // 2. add groups (show as 3*50hp -> if has aoe can damage all )
    // and 3. add mini bosses 
    // 4. make their damage/level depends on player level (level 10 player must meet 'Epic Slime')
    // 5. mobs with  skills?
    // 6.  add ranged mobs, melee get extra damage when running to them
    
    // NPCs
    // 0. one for each class
    // 1. fake npc (humanoid monsters)
    // 2. lesser prices for some class?
    // 3. Gambling?
    
    // Items
    // 0. Alternate weapon [ ? ] bow/throwing knife/minion?
    // 1. repair after each fight? can't be repaired more than normal? 
    var PlayerClass=0;
    

    var Evasion=0;
    var CurrentMobMaxHP=200;    
   // todo
    var AOEMultiplier=0;    
    var CriticalMultiplier=2;    
    var SneakAddChance=0;    
    var StealAddChance=0;    
    var KnockDownChance=0;    
    var LevitationAvoidChance=0;    
    var ShieldBlockChance=0;    
    var SpikesDamage=0;    
    var Vampirism=0;    
    var Berserker=0;    
    
    var DrawPlayerInterface=function(){

        var i=0;
        
        var debug=true;



        ctx.strokeRect(150,40,300,10);
        ctx.fillStyle = "green";
        ctx.fillRect(151,41,  Math.min(300,  Math.floor(300*hp/MaxHP)),8);

        if (evs[cur_e].length>IMHP+1) {
        ctx.fillStyle = "red";
        ctx.fillText("vs", 455, 50);
        ctx.strokeRect(320+150,40,300,10);
        ctx.fillStyle = "gray";
        ctx.fillRect(320+151,41,  Math.min(100,  Math.floor(300*evs[cur_e][IMHP]/CurrentMobMaxHP)),8);
        }


        var iconWidth=35;
        var iconWidth=35;
        var iconSpaceX=10;
        var iconHeight=35;

        ctx.strokeRect(i*40+5,540,300,13);
        ctx.fillStyle = "red";
        ctx.fillText("Passive Skills", i*40+130, 540+10);

        ctx.strokeRect(8*40+5,540,300,13);
        ctx.fillStyle = "red";
        ctx.fillText("Active Skills", 8*40+130, 540+10);

       if (Vampirism>0 || debug)
        {
            ctx.strokeRect(i*(iconSpaceX + iconWidth)+5,560,iconWidth,iconHeight);
            ctx.fillStyle = "red";
            ctx.fillText("VR",i*(iconSpaceX + iconWidth)+7, 560+12);
            ctx.fillText(Vampirism + "%",i*(iconSpaceX + iconWidth)+7, 560+22);
            
        }

        i++
        if (SpikesDamage>0 || debug)
        {
             ctx.strokeRect(i*(iconSpaceX + iconWidth)+5,560,iconWidth,iconHeight);
            ctx.fillStyle = "red";
            ctx.fillText("Reflect", i*(iconSpaceX + iconWidth)+7, 560+12);
            ctx.fillText( SpikesDamage + "%", i*(iconSpaceX + iconWidth)+7, 560+22);
        }
        
        i++
        if (SneakAddChance>0 || debug)
        {
             ctx.strokeRect(i*(iconSpaceX + iconWidth)+5,560,iconWidth,iconHeight);
            ctx.fillStyle = "red";
            ctx.fillText("Sneak", i*(iconSpaceX + iconWidth)+7, 560+12);
            ctx.fillText(SneakChance()+"%",i*(iconSpaceX + iconWidth)+7, 560+22);
        }
        
        i++
        if (StealAddChance>0 || debug)
        {
             ctx.strokeRect(i*(iconSpaceX + iconWidth)+5,560,iconWidth,iconHeight);
            ctx.fillStyle = "red";
            ctx.fillText("Steal", i*(iconSpaceX + iconWidth)+7, 560+12);
            ctx.fillText(StealChance()+"%",i*(iconSpaceX + iconWidth)+7, 560+22);
        }

        i++
        if (LevitationAvoidChance>0 || debug)
        {
             ctx.strokeRect(i*(iconSpaceX + iconWidth)+5,560,iconWidth,iconHeight);
            ctx.fillStyle = "red";
            ctx.fillText("Fly", i*(iconSpaceX + iconWidth)+7, 560+12);
            ctx.fillText("+75%",i*(iconSpaceX + iconWidth)+7, 560+22);
        }


    }
    
    var R20 = function(){
        return Math.floor(Math.random()*20);
    }
    var Def = function()
    {
        return Math.min(200, Math.floor(lvl*2 + DefBonus));
    }
    var StealChance=function(){
            if (isRogue())
                return 5+ StealAddChance*2;
        return StealAddChance;
    }
    var SneakChance=function(){
            if (isRogue())
                return 5+ SneakAddChance*2;
        return SneakAddChance;
    }
    var isWarrior = function(){
        return PlayerClass==2;
    }
    var isMage = function(){
        return PlayerClass==3;
    }
    var isRogue = function(){
        return PlayerClass==1;
    }

    var ClassName=function(classId, level){
    var add="";
        if (level<=2){ add="Noob ";}
        if (level>4){ add="Trained ";}
        if (level>7){ add="Mighty ";}
        if (level>10){ add="Expert ";}
        
        if (classId==0){ return add;}
        if (classId==1){ return add+"Rogue";}
        if (classId==2){ return add+"Warrior";}
        if (classId==3){ return add+"Mage";}
        if (classId==4){ return add+"Monk";}
        if (classId==4){ return add+"Healer";}
        return add+"unknown";
    }    
    
    var Atk = function()
    {
        return  Math.floor(AtkBonus/lvl + lvl*3 + 6 + AtkBonus/3);
    }

    var calcDMGFromPlayer = function(atk, Tdef, Thp)
    {
        var criticalBonus=0;
        if (Math.random()>0.7){   
            criticalBonus=atk*CriticalMultiplier;    
        }
        var normalDamage=(atk*atk) / (Tdef*10);
        var minDamage=(0.5 + atk/10);
        
        if (criticalBonus>0)
        {
            return    Math.floor( minDamage + criticalBonus  );
        }
        return    Math.floor( minDamage +  normalDamage );
    }

    var calcDMGFromMob = function(atk, Tdef, Thp)
    {
        var criticalBonus=0;
        if (Math.random()>0.8){   
            criticalBonus=atk*2;    
        }
        var normalDamage=(atk*atk) / (Tdef*10);
        var minDamage=(0.5 + atk/10);
        
        if (criticalBonus>0)
        {
            return    Math.floor( minDamage + criticalBonus  );
        }
        return    Math.floor( minDamage +  normalDamage );
    }

 

var MobToElements = function(mob){
    var element = [ mob.name, "description here" ].concat(  battle, mob.hp, mob.atk, mob.xp, mob.gold);
    return element;
}




function monster(mname, hp, damage, defence, exp, gold){
 this.name=mname;
 this.hp=hp;
 this.atk=damage;
 this.def=defence;
 this.xp=exp;
 this.gold=gold;
}


    var hit = function(){
        var PlayerDidDamage = calcDMGFromPlayer(Atk(),evs[cur_e][IMAtk]/5, evs[cur_e][IMHP]); 
        var PlayerGotDamage = calcDMGFromMob(evs[cur_e][IMAtk],Def(),hp) ;
        //also monster got damage from spikes
        PlayerDidDamage += (PlayerGotDamage*SpikesDamage/100);
        
        evs[cur_e][IMHP] -=  PlayerDidDamage;
        hp -=  PlayerGotDamage;        
        
        //player won
       if (evs[cur_e][IMHP]<=0) {
            alert("Monster defeated and you got "+evs[cur_e][IMXP]+"EXP and $"+evs[cur_e][IMGold]);
            exp+=evs[cur_e][IMXP]; gld+=evs[cur_e][IMGold];
           // dont let hero die if he killed mob 
           hp = Math.max(1,hp);  
            while (exp>=lvl*lvl*5) { exp-=lvl*lvl*5; hp+=10; lvl++; alert("Level Up!") }
            cur_e++; if (cur_e==e_sz) alert("Victory!")
        } else {
        // mob won
            hp = Math.max(0,hp);
            if(hp<=0) alert("Game Over!");
        } 
        if (evs[cur_e][IMHP]>0 && hp>0)
        {
        // both alive - apply vampiric effects
           if ( hp <= MaxHP &&  Vampirism > 0 )
            { 
             hp += Math.floor(PlayerDidDamage * Vampirism / 100);
             hp = Math.min( MaxHP,  hp );
            }
        }
    }
    
    //drink potion
    var use = function(){ if (pot>0){pot--;hp+=10+2*lvl;if(hp>MaxHP)hp=MaxHP} }
    
    //move to next cell
    var nxt = function(){ cur_e++ }

//sneak  mob
var skp = function()
{ 
    if (SneakChance() < Math.floor(Math.random(100)))
    {
        //accident
        hp-=10;
        hp = Math.max(1,hp);
    }
    cur_e++; 
}
    
    //run from mob
var dns = function()
{  
        // 50% chance for -5 hp
    if (50 > Math.floor(Math.random(100)))
    {
        hp-=5;
        hp = Math.max(1,hp);
    }
        // 25% chance for -5 gold
    if (25 > Math.floor(Math.random(100)))
    {
        gld-=5;
    }
    cur_e++;
}
    
    //try to steal drop from alive mob
    var tlk = function(){ cur_e++ }
    
    //nothing u can do here
    var nop = function(){ ; }
 
  
    var ButtonAttack = function(){
        if (PlayerClass==1)
             return "Stab";
        if (PlayerClass==3)
             return "Nuke";
        return "Attack";
    }

    var ButtonSneak = function(){
        if (PlayerClass==1)
             return "Sneak 75%";
        if (PlayerClass==3)
             return "Sneak 5%";
        return "Sneak 40%";
    }
     
    var ButtonSteal = function(){
        if (isRogue)
             return "Steal 75%";
        if (isMage)
             return "Steal 5%";
        return "Steal 10%";
    }
    // general battle, must be modified for each class
    
    var battle = [ ButtonAttack , "Use Potion +10HP", ButtonSneak,"Run 50%", ButtonSteal,
                  hit, use, skp, dns, tlk ];
         
    
    var canvas=document.querySelector(elid), ctx=canvas.getContext("2d");
    canvas.width=wi; canvas.height=he;
    var evs=[], 
        
        
        e_tp=[
            ["Village", "Your adventure start here. Choose your class:", "Rogue", "Warrior", "Mage","Monk(test)","Healer(test)",
        function(){ PlayerClass=1; cur_e++ }, 
        function(){ PlayerClass=2; cur_e++ }, 
        function(){ PlayerClass=3; cur_e++ },nxt ,nxt ,nxt

    ],

            
    ["Shop", "Wizard provides his services", "Buy Potion $20", "Full Heal $100", "Leave","Enchant Weapon $50","Enchant Armor 50$",
        function(){ if(gld>=20 ) { gld-=20; pot++} },
        function(){ if(gld>=100) { gld-=100; hp=MaxHP} }, nxt ,
        function(){ if(gld>=50 ) { gld-=50; Vampirism+=1; MaxHP+=1; } },
        function(){ if(gld>=50 ) { gld-=50; DefBonus+=2; MaxHP+=5;} }, nxt,

    ],
        
    ["Ninja", "He can train rogue powers", "Rogue Practice $50", "Dagger Mastery 50$", "Leave","Learn 'How-to-Spoil'","Learn 'Hide'",
        function(){ if(gld>=50)  {gld-=50; AtkBonus+=2 ; DefBonus+=2; Evasion+=2;} },
        function(){ if(gld>=50 && isRogue() && CriticalMultiplier <= 5)  {gld-=50; CriticalMultiplier+=1/10; } },
        nxt,
        function(){ if(gld>=300 && StealChance() <90 && isRogue()) {gld-=300; StealAddChance+=5} },
        function(){ if(gld>=300 && SneakChance() <90 && isRogue()) {gld-=300; SneakAddChance+=5;} },
     ],
     
      ["Blacksmith", "Dude with hammer can make your gear better and train you as warrior.", "Basic Training $50", "5% Shield Rate $100", "Leave"," - ","5% Reflect $300",
        function(){ if(gld>=50)  {
            gld-=50;AtkBonus+=2 ; DefBonus+=2; MaxHP+=2;
            if (isWarrior())
                { DefBonus+=4; }
        } 
        },
        function(){ if(gld>=100 && ShieldBlockChance<50 && isWarrior()) { gld-=100; ShieldBlockChance+=5; } }, 
        nxt,
        nop,
        function(){ if(gld>=300 && SpikesDamage<50 && isWarrior()) { gld-=300; SpikesDamage+=5; }  },
     ],

    ["Dr. Future", "He can play with TIME", "Return to past $200", "Move To future $50", "Leave", "Free Lesson","-",
        function(){ if(gld>=200){gld-=200;  
     var prev_e= cur_e;
         cur_e=0;
                                 
       for (var i0=0;i0< prev_e;i0++)
        {
            if (!isNaN(evs[i0][IMHP])){
            if (evs[i0][IMHP]<=0) {
                //heal and make less reward
            //evs[i0][IMXP]   = Math.max(0,evs[i][IMXP]-10) ;
            //evs[i0][IMatk]  +=  Math.floor(1+Math.random()*15) ;
            //evs[i0][IMGold] = Math.max(0 , evs[i][IMGold] - 20) ;
            evs[i0][IMHP]   = 20 + Math.floor(Math.random()*100) ;
//            } else { 
                //stronger and better reward
  //          evs[i0][IMXP]   += Math.floor(5+Math.random()*25) ;
            //evs[i0][IMatk]  += Math.floor(5+Math.random()*15) ;
            //evs[i0][IMGold] += Math.floor(5+Math.random()*20) ;
    //        evs[i0][IMHP]   +=  Math.floor(5+Math.random()*20) ;
            }
        }

        }
        } },
        function(){ alert("He stole all your money and puff.. disappear"); gld=0; cur_e++;} , nxt ,
        function(){  DefBonus+=1; MaxHP-=5; },   ,],
        
    ["SawMan", "Huge man with a saw, it's really danger"].concat(battle,130,30,55,200),
    ["Skeleton", "A terrible skeleton on your way"].concat(battle,80,15,20,100),
    ["Goblin", "Green goblin wants to get your money"].concat(battle,65,10,15,70),
    ["Giant ant", "Damn! That insects...."].concat(battle,55,15,15,70+Math.floor(Math.random()*20)),
    ["Werewolf", "Dark werewolf trying to bite you"].concat(battle,50,15,15,50+Math.floor(Math.random()*40)),
    ["Slime", "What the strange jelly monster?"].concat(battle,20+R20(),3,7,30),
    MobToElements( new monster("Zombie", 50, 10, 33, 50, 1) ),
    ["Dragon", "Omg! It is evil Dragon!","Attack","Use Potion +10HP","-","-","-",hit,use,,,,800,130,100,1000 ] ];


// init cells 

    var q=e_tp.length-2;
// 1st is village         
     evs.push( e_tp[0].slice(0) );

    for (var i=0;i<e_sz-2;i++) 
             {    evs.push( e_tp[1+Math.floor(Math.random()*q)].slice(0) );}

//last is Dragon
    evs.push( e_tp[q+1].slice(0) );


            
    var game = setInterval(function(){
        ctx.clearRect(0,0,wi,he);
        ctx.fillText("NanoRPG in 30 lines of JavaScript by ripatti (modified by Yodzi)",10,15);
    ctx.fillText("LVL "+lvl+
         "  HP " + hp+"/"+MaxHP+
         "  EXP " + exp+"/"+lvl*10+
         "  ATK " +  Atk()+ //Math.floor(AtkBonus*lvl*4+6)+
         "  DEF "+ Def() + //Math.floor(lvl*2*DefBonus-1)+
         "  Gold $"+gld+"  Potions "+pot,10,30);
        
        ctx.fillText("Class: " + ClassName(PlayerClass,lvl),10,45);
        

        // draw map 
        for (var i=0;i<e_sz;i++)
        {
            //14 in row
            cX=i % 14;
            cY=Math.floor(i/14);
            ctx.fillText((i==e_sz-1||i<=cur_e)?evs[i][0]:"??",cX*50+20,50*cY+ 120);
        }

        // hp bar + skills bar
        DrawPlayerInterface();

        ctx.fillStyle = "black";
        ctx.fillText("@",(cur_e % 14)*50+25,50*Math.floor(cur_e/14) + 100);
        ctx.fillText(evs[cur_e][0]+ ': '+evs[cur_e][1],20,60);
        if (evs[cur_e].length>IMHP+1)  ctx.fillText("Enemy HP "+evs[cur_e][IMHP],20,80);
        

        // buttons     
        ctx.fillStyle = "red";
        for (var i=0;i<5;i++) 
        {
            ctx.strokeRect(i*120+5,460,110,20);
            if (typeof(evs[cur_e][i+2]) === 'function')
            {
              ctx.fillText(evs[cur_e][i+2](),i*120+10,473);
            } else {
              ctx.fillText(evs[cur_e][i+2],i*120+10,473);
            }
        }

        ctx.fillStyle = "black";
        
    }, 100);

    
    document.addEventListener('click', function(e){
        if (hp>0)
            for (var i=0;i<5;i++)
                if ( 
                     i*120+5 <= e.pageX-450 && 
                    e.pageX - 450 < i*120+115 
                    && 460 <= e.pageY-150 &&  e.pageY-150 <460+20)
                       { evs[cur_e][i+7](); }
                   else {
                        //console.log("click" + e.pageX +':'+e.pageY + ' vs '+ (i*120+5)+':'+460);

                   }
    }, false);
})("#canvas",800,600,0,3,3000,100,1,0,90);