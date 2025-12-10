// Character stats
var charHealth = 20;
var charMaxHealth = 20;
var charAttack = 5;
var charDefense = 2;

// Character's level variables
var charLevel = 1;
var charExpOverflow = 0;
var expGained = 0;
var expToNextLevel = 50;
var expRequiredToLevelUp = 50;

// Enemy constructor
function Enemy(maxHealth, health, attack, defense) {
    this.maxHealth = maxHealth;
    this.health = health;
    this.attack = attack;
    this.defense = defense;
}

var enemy1 = new Enemy(10, 10, 2, 1);
var enemy2 = new Enemy(20, 20, 4, 2);
var enemy3 = new Enemy(25, 25, 5, 4);
var enemy4 = new Enemy(35, 35, 8, 5);
var enemy5 = new Enemy(45, 45, 10, 8);
var enemy6 = new Enemy(40, 40, 8, 10);
var enemy7 = new Enemy(50, 50, 10, 10);
var enemy8 = new Enemy(65, 65, 12, 12);
var enemy9 = new Enemy(80, 80, 15, 12);
var enemy10 = new Enemy(100, 100, 20, 15);

var enemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6, enemy7, enemy8, enemy9, enemy10];

document.getElementById("basicAttackBtn").addEventListener("click", function() {
    document.getElementById("battleLog").innerHTML = "";
    basicAttack();
});

document.getElementById("skill1Btn").addEventListener("click", function() {
    document.getElementById("battleLog").innerHTML = "";
    fullForce();
});

document.getElementById("skill2Btn").addEventListener("click", function() {
    document.getElementById("battleLog").innerHTML = "";
    lifeLeech();
});

// Resets the game when you die or win
document.getElementById("restartBtn").addEventListener("click", function() {
    location.reload();
});

// Basic Attack Function
function basicAttack() {
    // Sets damage dealt to 1 if enemy defense is higher than character attack
    if ((charAttack - enemy1.defense) > 0) {
        enemy1.health = enemy1.health - (charAttack - enemy1.defense);
    } else {
        enemy1.health = enemy1.health - 1;
    };
    document.getElementById("enemy1CurrentHP").innerText = "Enemy HP: " + enemy1.health;
    document.getElementById("battleLog").innerHTML += "<p>PLAYER dealt " + Math.max((charAttack - enemy1.defense), 1) + " damage to ENEMY</p>";
    enemyTurn();
};

function fullForce() {
    if (((charAttack - enemy1.defense) * 1.5) > 0) {
        enemy1.health = enemy1.health - Math.floor((charAttack - enemy1.defense) * 1.5);
    } else {
        enemy1.health = enemy1.health - 1;
    };
    if (((charAttack - enemy1.defense) * 0.75) > 0) {
        charHealth = charHealth - Math.floor((charAttack - enemy1.defense) * 0.75);
    } else {
        charHealth = charHealth - 1;
    };
    if (charHealth <= 0) {
        playerDeath();
    };
    document.getElementById("playerCurrentHP").innerText = "HP: " + charHealth;
    document.getElementById("enemy1CurrentHP").innerText = "Enemy HP: " + enemy1.health;
    document.getElementById("battleLog").innerHTML += "<p>PLAYER used Full Force and dealt " + Math.floor(Math.max(((charAttack - enemy1.defense) * 1.5), 1)) + " damage to ENEMY</p>";
    document.getElementById("battleLog").innerHTML += "<p>PLAYER took " + Math.floor(Math.max(((charAttack - enemy1.defense) * 0.75), 1)) + " damage from recoil</p>";
    enemyTurn();
};

function lifeLeech() {
    if (((charAttack - enemy1.defense) * 0.5) > 0) {
        enemy1.health = enemy1.health - Math.floor((charAttack - enemy1.defense) * 0.5);
    } else {
        enemy1.health = enemy1.health - 1;
    };
    if (((charAttack - enemy1.defense) * 0.25) > 0) {
        charHealth = charHealth + Math.floor((charAttack - enemy1.defense) * 0.25);
    } else {
        charHealth = charHealth + 1;
    };
    document.getElementById("playerCurrentHP").innerText = "HP: " + charHealth;
    document.getElementById("enemy1CurrentHP").innerText = "Enemy HP: " + enemy1.health;
    document.getElementById("battleLog").innerHTML += "<p>PLAYER used Life Leech and dealt " + Math.floor(Math.max((charAttack - enemy1.defense) * 0.5), 1) + " damage to ENEMY</p>";
    document.getElementById("battleLog").innerHTML += "<p>PLAYER restored " + Math.floor(Math.max((charAttack - enemy1.defense) * 0.25), 1) + " health</p>";
    enemyTurn();
};

// Enemy Attack Function
function enemyAttack() {
    if ((enemy1.attack - charDefense) > 0) {
    charHealth = charHealth - (enemy1.attack - charDefense);
    } else {
    charHealth = charHealth - 1;
    };
    document.getElementById("playerCurrentHP").innerText = "HP: " + charHealth;
    document.getElementById("battleLog").innerHTML += "<p>ENEMY dealt " + Math.max((enemy1.attack - charDefense), 1) + " damage to PLAYER</p>";
    if (charHealth <= 0) {
        playerDeath();
    };
};

//Function for gaining EXP from defeating enemy
function expGain() {
    expGained = enemy1.maxHealth * enemy1.attack * enemy1.defense;
    expToNextLevel -= expGained;
    document.getElementById("battleLog").innerHTML += "<p>PLAYER gained " + expGained + " EXP</p>";
    // Check for if you have enough EXP to level up
    while (expToNextLevel <= 0) {
        charLevel += 1;
        charExpOverflow = Math.abs(expToNextLevel);
        expRequiredToLevelUp = expRequiredToLevelUp * 1.3;
        expToNextLevel = Math.floor(expRequiredToLevelUp - charExpOverflow);
        charExpOverflow = 0;
        // Stat increases on level up
        document.getElementById("playerLevel").innerText = "Player Level: " + charLevel;
        // Random max health increase between 1-3
        charMaxHealth = charMaxHealth + Math.floor(Math.random() * 3) + 1;
        document.getElementById("playerMaxHP").innerText = "Max Health: " + charMaxHealth;
        charHealth = charMaxHealth;
        document.getElementById("playerCurrentHP").innerText = "HP: " + charHealth;
        // Random attack increase between 0-2
        charAttack = charAttack + Math.floor(Math.random() * 3);
        document.getElementById("playerAttackStat").innerText = "Attack: " + charAttack;
        // Random defense increase between 0-1
        charDefense = charDefense + Math.floor(Math.random() * 2);
        document.getElementById("playerDefenseStat").innerText = "Defense: " + charDefense;
        document.getElementById("battleLog").innerHTML += "<p>PLAYER leveled up to Level " + charLevel + "!</p>";
    };
    if (charLevel >= 3) {
    document.getElementById("skill1Btn").style.display = "inline-block";
    };
    if (charLevel >= 10) {
    document.getElementById("skill2Btn").style.display = "inline-block";
    };
    document.getElementById("expToNextLevelText").innerText = "EXP to Next Level: " + expToNextLevel;
};

// Function for switching to the next enemy
function switchEnemy() {
    var currentIndex = enemies.indexOf(enemy1);
    // Sets the next enemy in the array as the current enemy
    enemy1 = enemies[(currentIndex + 1) % enemies.length];
    document.getElementById("enemy1CurrentHP").innerText = "Enemy HP: " + enemy1.health;
    document.getElementById("enemyMaxHP").innerText = "Max Health: " + enemy1.maxHealth;
    document.getElementById("enemyAttackStat").innerText = "Attack: " + enemy1.attack;
    document.getElementById("enemyDefenseStat").innerText = "Defense: " + enemy1.defense;
    if (currentIndex == 9) {
        gameWin();
    };
};

// Function for enemy's turn
function enemyTurn() {
    if (enemy1.health <= 0) {
        enemy1.health = 0;
        document.getElementById("battleLog").innerHTML += "<p>ENEMY has been defeated, beginning next battle</p>";
        expGain();
        switchEnemy();
    } else {
        // Adds delay between player and enemy attacks and disables attacking during enemy turn
        document.getElementById("basicAttackBtn").disabled = true;
        document.getElementById("skill1Btn").disabled = true;
        document.getElementById("skill2Btn").disabled = true;
        setTimeout(function() {
            document.getElementById("basicAttackBtn").disabled = false;
            document.getElementById("skill1Btn").disabled = false;
            document.getElementById("skill2Btn").disabled = false;
            enemyAttack();
        }, 1000);
    }
};

function playerDeath() {
    charHealth = 0;
    document.getElementById("playerCurrentHP").innerText = "HP: " + charHealth;
    document.getElementById("battleLog").innerHTML += "<p>PLAYER has been defeated!</p>";
    document.getElementById("basicAttackBtn").disabled = true;
    document.getElementById("skill1Btn").disabled = true;
    document.getElementById("skill2Btn").disabled = true;
    document.getElementById("endMessage").innerText = "YOU DIED";
    document.getElementById("endScreen").style.display = "block";
};

function gameWin() {
    document.getElementById("basicAttackBtn").disabled = true;
    document.getElementById("skill1Btn").disabled = true;
    document.getElementById("skill2Btn").disabled = true;
    document.getElementById("endMessage").innerText = "YOU WIN!";
    document.getElementById("endScreen").style.display = "block";
}
