class EventEmitter {
  constructor() {
    this.listeners = {};
  }

  on(message, listener) {
    if (!this.listeners[message]) {
      this.listeners[message] = [];
    }
    this.listeners[message].push(listener);
  }

  emit(message, payload = null) {
    if (this.listeners[message]) {
      this.listeners[message].forEach((l) => l(message, payload));
    }
  }
}

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
    this.speed = { x: 0, y: 0 };
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
//declaracion de mensages
const Messages = {
  KEY_EVENT_UP: "KEY_EVENT_UP",
  KEY_EVENT_DOWN: "KEY_EVENT_DOWN",
  KEY_EVENT_LEFT: "KEY_EVENT_LEFT",
  KEY_EVENT_RIGHT: "KEY_EVENT_RIGHT",
  COLLISION_ENEMY_MAIN: "COLLISION_ENEMY_MAIN",
};

//declaracion de variables y constantes
let canvas,
  ctx,
  gameObjects = [],
  mainCharacter,
  mainCharacterColor,
  mainCharacterImpactColor,
  enemyColor,
  spawnPoints = [],
  timeSpawn,
  eventEmitter = new EventEmitter();

//eventos
let onKeyDown = function (e) {
  console.log(e);
  switch (e.keyCode) {
    case 37:
    case 39:
    case 38:
    case 40:
    case 32:
      e.preventDefault();
      break;
    default:
      break;
  }
};

window.addEventListener("keydown", onKeyDown);

window.addEventListener("keydown", (evt) => {
  if (evt.key === "ArrowUp") {
    eventEmitter.emit(Messages.KEY_EVENT_UP);
  } else if (evt.key === "ArrowDown") {
    eventEmitter.emit(Messages.KEY_EVENT_DOWN);
  } else if (evt.key === "ArrowLeft") {
    eventEmitter.emit(Messages.KEY_EVENT_LEFT);
  } else if (evt.key === "ArrowRight") {
    eventEmitter.emit(Messages.KEY_EVENT_RIGHT);
  }
});

function initGame() {
  gameObjects = [];
  spawnEnemies();
  createMainCharacter();
  //   drawGameObjects(ctx);

  eventEmitter.on(Messages.COLLISION_ENEMY_MAIN, () => {
    mainCharacter.color = "blue";
  });

  eventEmitter.on(Messages.KEY_EVENT_LEFT, () => {
    mainCharacter.x -= 5;
  });

  eventEmitter.on(Messages.KEY_EVENT_RIGHT, () => {
    mainCharacter.x += 5;
  });
}

function spawnEnemies() {
  timeSpawn = 1000;
  let centro = canvas.width / 2 - 25;
  let separacion = 75;
  spawnPoints = [
    centro - 2 * separacion,
    centro - separacion,
    centro,
    centro + separacion,
    centro + 2 * separacion,

    // 0,
    // canvas.width/2 - 50,
    // canvas.width/2 + canvas.width/4 - 50,
  ];
  let y = 0;
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

function intersectRect(r1, r2) {
  //funcion para comprobar si dos objetos estan colisionando
  return !(
    r2.left > r1.right ||
    r2.right < r1.left ||
    r2.top > r1.bottom ||
    r2.bottom < r1.top
  );
}

function updateGameObjects() {
  //comprobar si hay colisiones
  const enemies = gameObjects.filter((go) => go.type === "Enemy");
  const mainCharacter = gameObjects.filter((go) => go.type === "MainCharacter");
  mainCharacter.forEach((main) => {
    enemies.forEach((enemy) => {
      //detectar colisiones
      if (
        intersectRect(main.rectFromGameObject(), enemy.rectFromGameObject())
      ) {
        eventEmitter.emit(Messages.COLLISION_ENEMY_MAIN, {
          first: main,
          second: enemy,
        });
      }
    });
  });

  //borrar enemigos muertos
  gameObjects = gameObjects.filter((go) => !go.dead);
}

window.onload = () => {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  
  initGame();
  let gameLoopId = setInterval(() => {
    //borrar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    //actualizar objetos del juego
    updateGameObjects();
    //dibujar objetos del juego
    drawGameObjects(ctx);
  }, 100);
};
