class GameObject {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dead = false;
    this.type = "";
    this.width = 0;
    this.height = 0;
    this.color = undefined;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    // ctx.fillStyle = 'black';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  //obtener el collider
  rectFromGameObject() {
    return {
      top: this.y,
      left: this.x,
      bottom: this.y + this.height,
      right: this.x + this.width,
    };
  }
}

class MainCharacter extends GameObject {
  constructor(x, y) {
    super(x, y);
    this.width = 50;
    this.height = 100;
    this.type = "MainCharacter";
    this.color = "green";
  }
}

class Enemy extends GameObject {
  constructor(x, y) {
    super(x, y);
    this.width = 50;
    this.height = 25;
    this.type = "Enemy";
    this.color = "yellow";
    let id = setInterval(() => {
      if (this.y < canvas.height - this.height) {
        this.y += 5;
      } else {
        //eliminar el objeto al llegar al fondo
        this.dead = true;
        clearInterval(id);
      }
    }, 100);
  }
}

//declaracion de variables y constantes
let canvas,
  ctx,
  gameObjects = [],
  mainCharacter,
  mainCharacterColor,
  mainCharacterImpactColor,
  enemyColor,
  spawnPoints = [],
  timeSpawn;
  //   eventEmitter = new EventEmitter();

function initGame() {
  gameObjects = [];
  spawnEnemies();
  createMainCharacter();
  drawGameObjects(ctx);
}

function spawnEnemies() {
  timeSpawn = 1000;
  spawnPoints = [
    canvas.width/2 - canvas.width/4 - 50,
    canvas.width/2 - 50,
    canvas.width/2 + canvas.width/4 - 50, 
    ];
  let y = 50;
  let x = spawnPoints[Math.floor(Math.random() * spawnPoints.length)];
  let id = setInterval(() => {
    // const enemy = new Enemy(POS_X_1, POS_Y);
    x = spawnPoints[Math.floor(Math.random() * spawnPoints.length)];
    const enemy = new Enemy(x, y);
    gameObjects.push(enemy);
  }, timeSpawn);
}

function createMainCharacter() {
  mainCharacter = new MainCharacter(
    canvas.width / 2 - 45,
    canvas.height - canvas.height / 4
  );
  gameObjects.push(mainCharacter);
}

function drawGameObjects(ctx) {
  gameObjects.forEach((go) => go.draw(ctx));
}

function updateGameObjects() {}

window.onload = () => {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  console.log(canvas, ctx);
  (mainCharacterColor = "green"),
    (mainCharacterImpactColor = "yellow"),
    initGame();
  let gameLoopId = setInterval(() => {
    //borrar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    //actualizar objetos del juego
    //dibujar objetos del juego
    drawGameObjects(ctx);
  }, 100);
};
