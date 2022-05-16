//Game States
//"WIN" - Player Robot has defeated all enemy-robots
//  * Fight all enemy-robots
//  * Defeat each enemy robot
//"LOSE" - Player robot's health is zero or less
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
}

var getPlayerName = function(){
    var name = "";

    while(name === "" || name === null) {
        name = prompt("What is your robot's name?");
    }

    return name;
}

var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function() {
        if (this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.")
            this.health += 20;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function() {
        if(this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack += 6;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    }
};

console.log(playerInfo.name, playerInfo.attack, playerInfo.health);

var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14)
    }
];

var fightOrSkip = function(){
    //ask player if they'd like to fight or skip using fightOrSkip function
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
    promptFight = promptFight.toLowerCase();

    if(promptFight === "" || promptFight === null){
        window.alert("You need to provide a valid answer! Please try again.");
        return fightOrSkip();
    }

    if (promptFight === "skip") {
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");
        if (confirmSkip) {
            window.alert(playerInfo.name + " has chosen to skip the fight!");
            playerInfo.money = Math.max(0, playerInfo.money -10);
            shop();
            return true;
        }
        return false;
    }
}

var fight = function (enemy) {
    //Keep track of who goes first
    var isPlayerTurn = true;
    if(Math.random() > 0.5) {
        isPlayerTurn = false;
    }
    //repeat and execute as long as the enemy-robot is alive
    //If it is the player-robot's turn:
    // * prompt the fight or skip request
    // * Remove damage from enemy-robot's health
    // * check if the enemy-robot has enough health to continue fighting
    //If it is not the player-robot's turn:
    // * remove damage from the player-robot's health
    // * check if the player-robot has enough health to continue fighting
    //After the turn is done, switch turns for the next bout of fighting:
    // * If the player-robot went first, run the logic for the enemy-robot attacking the player-robot
    // * If the enemy-robot went first, run the logic for the player-robot attacking the enemy-robot

    while(playerInfo.health > 0 && enemy.health > 0) {
        if(isPlayerTurn){
            // Do you wanna fight~? Do you wanna catch these hands~?

            if(fightOrSkip()){
                break;
            }

            //Player attack
            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
            enemy.health = Math.max(0, enemy.health - damage);
            console.log(playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining.");
            if (enemy.health <= 0) {
                window.alert(playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " has died!");
                //award player money for winning
                playerInfo.money = playerInfo.money + 20;
                //leave while since enemy is dead.
                break;
            }
            else {
                window.alert(playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining.");
            }
        }
        else {
            //Enemy attack
            var damage = randomNumber(enemy.attack - 3, enemy.attack);
            playerInfo.health = Math.max(0, playerInfo.health - damage);
            console.log(enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining.");
            if (playerInfo.health <= 0) {
                window.alert(enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " has died!");
                break;
            }
            else {
                window.alert(enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining.");
            }
        }
        isPlayerTurn = !isPlayerTurn;
    }
}
var startGame = function() {
    //reset player stats
    playerInfo.reset();

    for(var i = 0; i < enemyInfo.length; i++){
        // let player know what round they are in
        if (playerInfo.health > 0) {
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));

            //pick new enemy to fight based on the index of the enemy.names array
            var pickedEnemyObj = enemyInfo[i];
            
            //Reset enemy health before starting a new fight
            pickedEnemyObj.health = randomNumber(40, 60);
            
            fight(pickedEnemyObj);

            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

                if (storeConfirm) {
                    shop();
                }
            }
        }
        else {
            window.alert("You have lost your robot in battle! Game over!");
            break;
        }
    }
    //Play again
    endGame();
};

var endGame = function() {
    //if player is alive, player wins
    if (playerInfo.health > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
    }
    else {
        window.alert("You've lost your robot in battle.");

        var playAgainConfirm = window.confirm("Would you like to play again?");

        if (playAgainConfirm) {
            //restart the game
            startGame();
        }
        else {
            window.alert("Thank you for playing Robot Gladiators! Come back soon!")
        }
    }
};

var shop = function() {
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: '1' to REFILL, '2' to UPGRADE, or '3' to LEAVE."
    );

    switch (shopOptionPrompt) {
        case 1:
            playerInfo.refillHealth();
            break;
        case 2:
            playerInfo.upgradeAttack();
            break;
        case 3:
            window.alert("Leaving the store.");
            break;
        default:
            window.alert("You did not pick a valid option. Try again.");
            shop();
            break;
    }
};

startGame();