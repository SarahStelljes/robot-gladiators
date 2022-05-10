var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

console.log(playerName, playerAttack, playerHealth);

var enemyName = "Roborto";
var enemyHealth = 50;
var enemyAttack = 12;

var fight = function () {
    window.alert("Welcome to Robot Gladiators!");
    // Do you wanna fight~? Do you wanna catch these hands~?
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

    if (promptFight === "fight" || promptFight === "FIGHT") {
        
        //Player attack
        enemyHealth = enemyHealth - playerAttack;

        console.log(playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining.");

        if (enemyHealth <= 0) {
            window.alert(playerName + " attacked " + enemyName + ". " + enemyName + " has died!");
        }
        else {
            window.alert(playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining.");
        }

        //Enemy attack
        playerHealth = playerHealth - enemyAttack;

        console.log(enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining.");

        if (playerHealth <= 0) {
            window.alert(enemyName + " attacked " + playerName + ". " + playerName + " has died!");
        }
        else {
            window.alert(enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining.");
        }
    }
    else if (promptFight === "skip" || promptFight === "SKIP") {
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");

        if (confirmSkip) {
            window.alert(playerName + " has chosen to skip the fight!");
        }
        else {
            fight();
        }

    }
    else {
        window.alert("You need to choose a valid option. Try again!");
    }
}

fight();