// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = - ( Math.random() * 400 + 100 );
    this.y = Math.floor ( Math.random() * 2 ) * 80 + 60;
    this.speed = Math.floor(Math.random() * 4) * 10 + 90;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > 505) {
      this.x = - ( Math.random() * 300 + 100 );
      this.y = Math.floor(Math.random() * 3) * 80 + 60;
    }
    this.x = this.x + (this.speed * dt);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Initiate player location
var Player = function(char) {
    switch(char) {
      case 1:
          this.sprite = 'images/char-boy.png';
          break;
      case 2:
          this.sprite = 'images/char-cat-girl.png';
          break;
      case 3:
          this.sprite = 'images/char-pink-girl.png';
          break;
      case 4:
          this.sprite = 'images/char-princess-girl.png';
          break;
      default:
          break;
    }
    this.x = 200;
    this.y = 300;
    this.score = 0;
};

// Reset player's location if player reaches the water
Player.prototype.update = function() {
  this.x=this.x;
  this.y=this.y;
};

// Draw player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Respond to user's input
Player.prototype.handleInput = function(keyCode) {
  switch(keyCode) {
    case "left": //left
        if(this.x > 0) this.x = this.x - 100;
        break;
    case "up": //up
        if(this.y > -20) this.y = this.y - 80;
        break;
    case "right": //right
        if(this.x < 400) this.x = this.x + 100;
        break;
    case "down": //down
        if(this.y < 380) this.y = this.y + 80;
        break;
    default:
        break;
      }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy1 = new Enemy();
var enemy2 = new Enemy();
var enemy3 = new Enemy();
var enemy4 = new Enemy();
var allEnemies = [enemy1, enemy2, enemy3, enemy4];

var player;

var makePlayer = function(char) {
  player = new Player(char);
}

var score = 0;

var drawScore = function() {
  ctx.fillText(score, 450, 110);
  ctx.strokeText(score, 450, 110);
}

// Check collision between player and enemies
var checkCollisions = function(allEnemies, player) {
  allEnemies.forEach(function(enemy) {
      if (enemy.y === player.y) {
        if (Math.abs(enemy.x - player.x) < 80) {
          player.x = 200;
          player.y = 300;
        }
      }
  });
  if(player.y === -20) {
    player.x = 200;
    player.y = 300;
    score++;
  }
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
