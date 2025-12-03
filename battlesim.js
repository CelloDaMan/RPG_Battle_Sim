// Character stats
var charHealth = 20;
var charMaxHealth = 20;
var charAttack = 5;
var charDefense = 2;

// Character's level variables
var charLevel = 1;
var charExp = 0;
var expToNextLevel = 50;

// Enemy 1 stats
var enemy1Health = 10;
var enemy1Attack = 2;
var enemy1Defense = 1;

document.getElementById("basicAttackBtn").addEventListener("click", function() {
    basicAttack();
});

// Basic Attack Function
function basicAttack() {
    var damageToEnemy = Math.max(0, charAttack - enemy1Defense);
    enemy1Health -= damageToEnemy;
    document.getElementById("battleScene").getElementsByTagName("h4")[1].innerText = "Enemy HP: " + enemy1Health;
};