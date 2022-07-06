function loadTexture(path) {
  return new Promise((resolve) => {
    const img = new Image()
    img.src = path
    img.onload = () => {
      resolve(img)
    }
  })
}

function createEnemies(ctx, canvas, enemyImg) {
  // TODO draw enemies
  const MONSTER_TOTAL = 5;
  const MONSTER_WIDTH = MONSTER_TOTAL *98;
  const START_X = (canvas.width - MONSTER_WIDTH) /2;
  const STOP_X = START_X + MONSTER_WIDTH;

  for (let x = START_X; x < STOP_X; x += 98) {
    for (let y = 0; y < 50 * 5; y += 50) {
      ctx.drawImage(enemyImg, x, y);
    }
  }

}

function createBackgroundStars(ctx, canvas){
  const NUMSTARS = 100;
  const radius = 1;
  const startAngle = 0;
  const endAngle = 360;
  let rand_x, rand_y = 0;
  let opacity = 1;

  ctx.fillStyle = `rgba(255,255,255,${opacity})`;
  for(let i = 0; i< NUMSTARS; i++){
    rand_x = Math.random()*canvas.width;
    rand_y = Math.random()*canvas.height;
    opacity = Math.random();
    ctx.moveTo(rand_x, rand_y);

    ctx.arc(rand_x, rand_y, radius, startAngle, endAngle, false);
    ctx.fill();
  }
}

window.onload = async () => {
  canvas = document.getElementById('canvas')
  ctx = canvas.getContext('2d')
  // TODO load textures
  const enemyImg = await loadTexture('assets/enemyShip.png');
  const playerImg = await loadTexture('assets/player.png');

  // TODO draw black background
  ctx.fillStyle = 'black';
  ctx.fillRect(0,0,canvas.width, canvas.height);

  //crear fondo de estrellas
  createBackgroundStars(ctx, canvas);
  // TODO draw hero
  ctx.drawImage(playerImg, canvas.width /2 - 45, canvas.height - canvas.height /4);
  // TODO uncomment the next line when you add enemies to screen
  createEnemies(ctx, canvas, enemyImg);
}
