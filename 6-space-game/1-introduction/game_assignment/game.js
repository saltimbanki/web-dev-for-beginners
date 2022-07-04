//uso de composicion
const gameObject = { x: 0, y: 0, type: "" };
const movable = {
  moveTo(x, y) {
    this.x = x;
    this.y = y;
  },
};

const movableObject = { ...gameObject, ...movable };
console.log(movableObject);

function createHero(x, y) {
    const elementoNuevo = document.createElement('div');
    document.body.appendChild(elementoNuevo);
  return {
    ...movableObject,
    x,
    y,
    type: "Hero",
  };
}

function createStatic(x, y, type) {
  return {
    ...gameObject,
    x,
    y,
    type,
  };
}

function init(){
    createHero(0,0);
}

init();