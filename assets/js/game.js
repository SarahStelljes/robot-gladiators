//Game States
//"WIN" - Player Robot has defeated all enemy-robots
//  * Fight all enemy-robots
//  * Defeat each enemy robot
//"LOSE" - Player robot's health is zero or less

var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

console.log(playerName, playerAttack, playerHealth);

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

var fight = function (enemyName) {

    //repeat and execute as long as the enemy-robot is alive

    while(playerHealth > 0 && enemyHealth > 0) {
        // Do you wanna fight~? Do you wanna catch these hands~?
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

        if (promptFight === "skip" || promptFight === "SKIP") {
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");

            if (confirmSkip) {
                window.alert(playerName + " has chosen to skip the fight!");
                playerMoney = playerMoney -10;
                console.log("playerMoney", playerMoney);
                break;
            }
            else {
                fight();
            }

        }
        
            
            //Player attack
            enemyHealth = enemyHealth - playerAttack;

            console.log(playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining.");

            if (enemyHealth <= 0) {
                window.alert(playerName + " attacked " + enemyName + ". " + enemyName + " has died!");
                //award player money for winning
                playerMoney = playerMoney + 20;
                //leave while since enemy is dead.
                break;
            }
            else {
                window.alert(playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining.");
            }

            //Enemy attack
            playerHealth = playerHealth - enemyAttack;

            console.log(enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining.");

            if (playerHealth <= 0) {
                window.alert(enemyName + " attacked " + playerName + ". " + playerName + " has died!");
                break;
            }
            else {
                window.alert(enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining.");
            }
    }
}

for(var i = 0; i < enemyNames.length; i++){
    // let player know what round they are in
    if (playerHealth > 0) {
        window.alert("Welcome to Robot Gladiators! Round " + (i + 1) + " starts now!");
    }
    //pick new enemy to fight based on the index of the enemyNames array
    var pickedEnemyName = enemyNames[i];

    //Reset enemy health before starting a new fight
    enemyHealth = 50;

    fight(pickedEnemyName);
}